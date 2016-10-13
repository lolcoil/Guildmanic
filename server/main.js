var express	= require('express');
var app		= express();
var http	= require('http').Server(app);
var io		= require('socket.io')(http);
var hash	= require('js-sha3').sha3_512;
var mysql	= require('mysql');
//var users	= require(__dirname + '\\class\\user.js');
var log	= require(__dirname + '\\class\\log.js');
log.debugMode = true;


var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'GuildManic'
});
var http_port = 3000;

app.use(express.static(__dirname.substring(0,__dirname.lastIndexOf(String.fromCharCode(92))+1) + 'client'));
http.listen(http_port, function () {
  log.info('Webdemon initialized on port ' + http_port);
});

db.connect(function(err) {
  if (err) {
    log.err('Error cannot connect to SQL host: ' + err.stack);
    return;
  }
  log.info('Connetion to SQL host established');
});



io.on('connection', function (socket){
	log.info('New client connected with id: ' + socket.id + ' IP: ' + socket.request.connection.remoteAddress);
	socket.customData = {};
	var cd = socket.customData;
	cd.authToken = false;
// authentication stuff
	socket.on('auth', function (data) {
		log.debug('client with id ' + socket.id + ' made a request:' + data);
		var l = data.length;
		if(data[0] == 0){ //login procedure
			if (data[1] == 0 && l == 2){ // random login hash request
				log.debug('Client asks for random login hash, his id is ' + socket.id);
				cd.login_hash = hash(String(Math.random()));
				socket.emit('auth',[0,0,cd.login_hash]);
				return;
			}
			if (data[1] == 1 && l == 5){ // login request
				log.debug('Client asks for getting log in, his id is ' + socket.id);
				if(	String(data[2]).match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != null &&
					String(data[3]).match(/^[0-9abcdef]{128}$/i) != null &&
					String(data[4]).match(/^[0-9abcdef]{128}$/i) != null)
				{
					log.debug('Recived a valid login request ' + data);
					db.query('select id, username, password from users where email = ' + mysql.escape(data[2]), function(err, rows) {if(err){log.err(err)}else{
						if (rows.length < 1) { // unknonw user
							log.debug('Unkown user ' + mysql.escape(data[2]));
							socket.emit('auth',[0,3]);
						}
						else{
							if(String(data[4]) == hash(rows[0].password.toString()+cd.login_hash+String(data[3]))){
								var notInUse = true;
								for (var socketId in io.sockets.sockets) {
									if(io.sockets.sockets[socketId].customData.authToken){
										log.debug(io.sockets.sockets[socketId].customData.email + ' == ' + data[2]);
										if (io.sockets.sockets[socketId].customData.email == data[2]){
											notInUse = false;
											break;
										}
									}
								}
								if(notInUse){ // all good, log the user in
									cd.email = data[2];
									cd.username = rows[0].username;
									cd.id = rows[0].id;
									cd.authToken = hash(String(Math.random()));
									socket.emit('auth',[0,1,cd.username,cd.authToken]);
									log.info('User "' + cd.username + '" has logged on');
								}
								else{ //user allready logged in
									log.debug('user allready logged in');
									socket.emit('auth',[0,2]);
								}
							}
							else{ //wrong password
								log.debug('wrong password');
								socket.emit('auth',[0,3]);
							}
						}
					}});
					return;	
				}
			}
		}
		if(data[0] == 1){ //registration procedure
			if (data[1] == 0 && l == 6){ // sign up request
				log.debug('Client asks for getting sign up, his id is ' + socket.id);
				if(	String(data[2]).match(/^[a-z]{4,20}$/ig) != null && 
					String(data[3]).match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != null &&
					String(data[4]).match(/^[a-z]{4,20}$/ig) != null || data[4] == '' &&
					String(data[5]).match(/^[0-9abcdef]{128}$/i) != null)
				{
					db.query('select id from users where username = ' + mysql.escape(data[2]), function(err, rows) {if(err){log.err(err)}else{
						if(rows.length < 1){
							db.query('select id from users where email = ' + mysql.escape(data[3]), function(err, rows) {if(err){log.err(err)}else{
								if(rows.length < 1){
									db.query('select id from users where username = ' + mysql.escape(data[4]), function(err, rows) {if(err){log.err(err)}else{
										if(data[4] != '' && rows.length > 0 || data[4] == ''){
											var ref_id;
											if (rows.length > 0){
												ref_id = rows[0].id;
											}
											else{
												ref_id = 0;
											}
											db.query('INSERT INTO users(username, email, refferal_id, password) VALUES ('+mysql.escape(data[2])+','+mysql.escape(data[3])+','+ref_id+','+mysql.escape(data[5])+')', function(err, rows) {if(err){log.err(err)}else{
												log.info('User ' + data[2] + ' has been registered.');
												socket.emit('auth',[1,0]);
											}});
										}
										else{socket.emit('err',1);log.err(socket.request.connection.remoteAddress + ': SocketID ' + socket.id + ' made a invalid request with data: ' + data);}
									}});
								}
								else{socket.emit('err',1);log.err(socket.request.connection.remoteAddress + ': SocketID ' + socket.id + ' made a invalid request with data: ' + data);}
							}});
						}
						else{socket.emit('err',1);log.err(socket.request.connection.remoteAddress + ': SocketID ' + socket.id + ' made a invalid request with data: ' + data);}
					}});
					return;
				}				
			}
			if (data[1] == 1 && l == 3){ // check username request
				log.debug('Client asks for username is free , his id is ' + socket.id);
				if (data[2].match(/^[a-z]{4,20}$/ig) != null) {
					//console.log(mysql.escape(data[2]));
					db.query('select id from users where username = ' + mysql.escape(data[2]), function(err, rows) {if(err){log.err(err)}else{
						if(rows.length < 1){
							socket.emit('auth',[1,1,true])
						}
						else{
							socket.emit('auth',[1,1,false])
						}
					}});
					return;
				}
			}
			if (data[1] == 2 && l == 3){ // check email request
				log.debug('Client asks for email is free , his id is ' + socket.id);
				if (data[2].match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != null) {
					//console.log(mysql.escape(data[2]));
					db.query('select id from users where email = ' + mysql.escape(data[2]), function(err, rows) {if(err){log.err(err)}else{
						if(rows.length < 1){
							socket.emit('auth',[1,2,true])
						}
						else{
							socket.emit('auth',[1,2,false])
						}
					}});
					return;
				}
			}
			if (data[1] == 3 && l == 3){ // check referral request
				log.debug('Client asks for referral is exsiting , his id is ' + socket.id);
				if (data[2].match(/^[a-z]{4,20}$/ig) != null) {
					//console.log(mysql.escape(data[2]));
					db.query('select id from users where username = ' + mysql.escape(data[2]), function(err, rows) {if(err){log.err(err)}else{
						if(rows.length < 1){
							socket.emit('auth',[1,3,false])
						}
						else{
							socket.emit('auth',[1,3,true])
						}
					}});
					return;
				}
			}
		}
		log.err(socket.request.connection.remoteAddress + ': SocketID ' + socket.id + ' made a invalid request with data: ' + data);
		socket.emit('err',1);
	});
	
// client disconnected
	socket.on('disconnect', function (){
		log.info('Client with ID ' + socket.id + ' is a goner');
	});
});


/*
console.log(users.static_prop);
users.static_prop += 'chanched';
console.log(users.static_prop);
var leo = new users.user();
console.log(leo.public_prop);
leo.public_prop += 'chanched';
console.log(leo.public_prop);
console.log(leo.private_prop);
console.log(leo.get());
leo.private_prop = 'hacked';
console.log(leo.private_prop);
console.log(leo.get());
*/
/*
db.query(, function(err, rows) {if(err){log.err(err)}else{
	
}});
*/

/* to do
- command input



*/