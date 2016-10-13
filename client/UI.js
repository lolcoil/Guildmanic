var UI = {
	
	//--- Functions
	
	setView : function (view){
		$('.view').hide();
		$('#' + view).show();
	},

	setContent : function (content){
		$('.content').hide();
		$('#' + content).show();
	},
		
		
	//--- Eventhandlers
	
	onChangeSocialBoxContent : function (e) {
		
		console.log(e);
	}
	
}