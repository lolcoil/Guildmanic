module.exports = {
	static_prop : 'im static prop',
	user : function () {
		this.public_prop = 'im public prop';
		var private_prop = 'im private prop';
		this.get = function (){
			return private_prop;
		}
	}
}