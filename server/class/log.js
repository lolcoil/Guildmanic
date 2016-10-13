var o = function () {
	var d = new Date();
	var now = function () {
		var d = new Date();
		return d.toLocaleTimeString();		
	}
	this.debugMode = false;
	this.info = function (str){
		console.log('\x1b[35m[' + now() + ']\x1b[32m [Info]\x1b[37m',str);
	}
	this.err = function (str){
		console.log('\x1b[35m[' + now() + ']\x1b[31m [Error]\x1b[37m',str);
	}
	this.debug = function (str) {
		if (this.debugMode)	{
			console.log('\x1b[35m[' + now() + ']\x1b[36m [Debug]\x1b[37m',str);
		}
	}
}

module.exports = new o();