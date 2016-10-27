var Chat = {
	
	chat_msg_type :	[	'chat_msg_type_error',
						'chat_msg_type_all',
						'chat_msg_type_trade',
						'chat_msg_type_empire',
						'chat_msg_type_whisper'],
	max_chat_msg : 1000,
	
	
	//--- Eventhandlers
	
	onChatResponse : function (cha,sender,msg) {
		var chat_output = $('#social_box_chat_output');
		var data = ['[' + new Date().toLocaleTimeString() + ']','[' + sender + ']: ',msg];
		var newMsg = $('#chat_msg_template').clone(true,true).addClass('chat_msg').addClass(Chat.chat_msg_type[cha]).removeAttr('id').insertBefore($('#chat_msg_template')).show();
		newMsg.children().each(function (i) {
			$(this).html(data[i]);
			if(cha != 0 && i == 1 && sender != 'You'){
				if (cha == 4){
					sender = sender.slice(sender.lastIndexOf(String.fromCharCode(32))+1);
					console.log(sender);
				}
				$(this).attr('tar',sender);
			}
			else{
				$(this).unbind('click');
			}
		});
		chat_output.animate({ scrollTop: chat_output.prop("scrollHeight")}, 600);
		var allMsg = chat_output.children().not('#chat_msg_template');
		if (allMsg.length > Chat.max_chat_msg){
			allMsg.first().remove();
		}
	},
	
	onChannelSelect : function (e){
		var ch = $(e.currentTarget).html().slice(0,2);
		$('#channel_selector').html(ch + ' <span class="caret"></span>');
		if(ch == '@A') {
			ch = ''
		}
		else {
			ch = ch + ' ';
		}
		var input = $('#input_chat_msg');
		if(input.val().match(/^@[terw]\s/i)){
			input.val(input.val().slice(3));
		}
		input.focus();
		input.val(ch + input.val());
	},

	onSubmitChatMessage : function (e) {
		var input = $('#input_chat_msg');
		if (e.type == 'keyup' && e.originalEvent.keyCode != 13 || e.type == 'click' && e.currentTarget.tagName == 'INPUT' || input.val().length < 1) {
			return;
		}
		socket.emit('chat',input.val());
		var ch = input.val().match(/^@[terw]\s/i);
		if(ch){
			$('#channel_selector').html(ch + '<span class="caret"></span>');
			var n = input.val().match(/^@w\s[a-z]{4,30}\s/i);
			if (n){
				ch = n;
			}
		}
		else{
			$('#channel_selector').html('@A <span class="caret"></span>');
			ch = ''
		}
		input.focus();
		input.val(ch);
	},
	
	onToggleFilter : function (e){
		var tar;
		if ($(this).html() == '@ A'){tar = 'chat_msg_type_all'}
		if ($(this).html() == '@ E'){tar = 'chat_msg_type_empire'}
		if ($(this).html() == '@ T'){tar = 'chat_msg_type_trade'}
		if ($(this).html() == '@ W'){tar = 'chat_msg_type_whisper'}
		if ($(this).html() == 'Err'){tar = 'chat_msg_type_error'}
		
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.' + tar).hide();
		}
		else{
			$(this).addClass('active');
			$('.' + tar).show();
		}
		$('#social_box_chat_output').scrollTop($('#social_box_chat_output').prop("scrollHeight"));
	},
	
	onClickWhisperable : function (e) {
		$('#social_box_nav a:first').click();
		$('#input_chat_msg').focus().val('@w ' + $(this).attr('tar') + ' ');
	},
	
}