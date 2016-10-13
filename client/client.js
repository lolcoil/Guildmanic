//--- Global Variables


var auth_token = false;
var username;

	
//--- Function Definitions



//--- Eventhandlers

var onErrorResponse = function (data){
	// fatal/critical error
	if (data == 0){console.log('Recived fatal/critical ERROR!');}
	// invalid request
	if (data == 1){console.log('Client sent a invalid Request');}
	// not loged in
	if (data == 2){console.log('Access denied');}
}


//--- Eventhandler mapping

var mapEventHandlers = function () {
	
	// authentication
	$('#button_login').click(login_request);
	$('#button_signup').click(signup_request);
	$('#authentication_forms [data-toggle="tab"]').on('shown.bs.tab', toggle_auth_forms);
	$('#authentication_forms input').change(check_input).keyup(check_input);
	$('#authentication_forms [class="glyphicon glyphicon-lock"]').mouseover(toggleShowPassword).mouseleave(toggleShowPassword);
	$('#regiser_retype_email_input').add('#register_retype_password_input').on('paste',denyPasteIn);
	
	// msgBox
	$('#msgBox').on('hidden.bs.modal',MsgBox.onMsgBoxClose);
	
	// UI events
	$('#social_box_nav a').click(UI.onChangeSocialBoxContent);
	
	// socket data
	socket.on('auth',onAuthResponse);
	socket.on('err',onErrorResponse);
	socket.on('chat',chat.onChatResponse);
}

//--- Initialization
$(document).ready(function() {
	console.log('client.js init...');
	
	mapEventHandlers();
	
	
	$(function () {$('[data-toggle="tooltip"]').tooltip()});
	UI.setView('authentication_forms');
	$('#email_input').focus();
	
	
	// test stuff
	//console.log($('#msgBox > div'));
	//console.log(sha3_512('test'));
	//console.log($('#registration_form input ~ span > span').not(':last'));
	/*MsgBox.create('1','msg',0);
	MsgBox.create('2','msg',1);
	MsgBox.create('3','msg',2);
	MsgBox.create('4','msg',3);
	MsgBox.create('5','msg',4,function(){console.log('hoi')});*/
	
});

/*   to do
- prevent user from reloading or leaving page



*/