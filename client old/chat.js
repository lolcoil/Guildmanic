var Chat = {
	
	msgPrefix : '@a ',
	
	
	//--- Eventhandlers
	
	onChatResponse : function (data) {
		
	},
	
	onSubmitChatMessage : function (e) {
		//console.log(e);
		var input = $(e.currentTarget);
		if(input.prop('tagName') != 'INPUT'){
			input = input.parent().siblings('input');
		}
		
		if (e.type == 'keyup' && e.originalEvent.keyCode != 13 || e.type == 'click' && e.currentTarget.tagName == 'INPUT' || input.val().length < 1) {
			return;
		}

		

		console.log('submit chatmsg : ' + Chat.msgPrefix + input.val());
		
		// channel  0=all 1=trade 2=empire 3=whisper 4=Reply
		//socket.emit('chat',[channel,msg,target]);
	},
	
}