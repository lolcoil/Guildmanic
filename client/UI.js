var UI = {
	
	
	
	//--- Functions
	
	setView : function (view){
		$('.view').hide();
		$('#' + view).show();
	},

	
	MsgBox : { 
		queue : [],
		isMsgBoxShown : false,
		create : function (title,msg,size,callback) {
			if (callback == 'undefined' || callback == null ) {
				callback = '';
			}
			UI.MsgBox.queue.push([title,msg,size,callback]);
			UI.MsgBox.show();
		},
		show : function (){
			if(!UI.MsgBox.isMsgBoxShown){
				UI.MsgBox.isMsgBoxShown = true;
				var s = '';
				if (UI.MsgBox.queue[0][2] == 0) {
					s = 'modal-dialog modal-sm';
				}
				else{
					if (UI.MsgBox.queue[0][2] == 2){
						s = 'modal-dialog modal-lg';
					}
					else {
						s = 'modal-dialog modal-md';
					}
				}
				$('#msgBox > div').attr('class',s);
				$('#msgBox [class=modal-header] h4').html(UI.MsgBox.queue[0][0]);
				$('#msgBox [class=modal-body] p').html(UI.MsgBox.queue[0][1]);
				$('#msgBox').modal('show');
			}
		},
		onMsgBoxClose : function () {
			if (jQuery.isFunction(UI.MsgBox.queue[0][3])){
				UI.MsgBox.queue[0][3]();
			}
			UI.MsgBox.queue.shift();
			UI.MsgBox.isMsgBoxShown = false;
			if (UI.MsgBox.queue.length > 0){
				UI.MsgBox.show();
			}
		}
	},
		
		
	//--- Eventhandlers
		
	onErrorResponse : function (data){
		// fatal/critical error
		if (data == 0){console.log('Recived fatal/critical ERROR!');}
		// invalid request
		if (data == 1){console.log('Client sent a invalid Request');}
		// not loged in
		if (data == 2){
			UI.MsgBox.create('Access Denied','You are not authorized yet! Please log in first.',0,function(){
				UI.setView('authentication_forms');
				$('#email_input').focus();
			});
		}
	},
	
	onClickNavbarIcon : function (e) {
		var b = $(e.currentTarget);
		$(b.attr('group')).hide();
		$(b.attr('tar')).show();
		$('[group="' + b.attr('group') + '"]').parent().removeClass('active');
		b.parent().addClass('active');
	},
	
	onClickCollapseButton : function (e) {
		$($(e.currentTarget).attr('collapse')).slideToggle();
		var s = $(e.currentTarget).children('span').first();
		if (s.attr('class') == 'glyphicon glyphicon-menu-up'){
			s.attr('class','glyphicon glyphicon-menu-down');
		}
		else{
			s.attr('class','glyphicon glyphicon-menu-up');
		}
	},
	

	
	
	
}