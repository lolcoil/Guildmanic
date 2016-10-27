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
	
	onClickMainNavbar : function (e) {
		$('.content').hide();
		$('#' + $(e.currentTarget).attr('tar')).show();
	},
	
	onClickSocialBoxNavbar : function (e) {
		var tar = $($(e.currentTarget).attr('tar'));
		var chSel = tar.find('.channelSelector');
		$('#social_box_nav li').attr('class','');
		$(e.currentTarget).parent().attr('class','active');
		$('.social_box_tab').hide();
		tar.show();
		
		if (tar.prop('id') == 'social_box_friends'){
			Chat.msgPrefix = '@f ';
			chSel.addClass('active');
		}
		else{
			if (tar.prop('id') == 'social_box_empire'){
				Chat.msgPrefix = '@e ';
				chSel.addClass('active');
			}
			else{
				Chat.msgPrefix = '@a ';
				chSel.html('@A <span class="caret"></span>');
			}
		}
		console.log(chSel.get(0));
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
	
	onChannelSelect : function (e){
		var ch = $(e.currentTarget).html().slice(0,2);
		$('#channel_selector').html(ch + ' <span class="caret"></span>');
		Chat.msgPrefix = ch.toLowerCase() + ' ';
	},

	
	
	
	
}