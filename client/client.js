//--- Global Variables


var user = {}

	
//--- Function Definitions



//--- Eventhandlers




//--- Eventhandler mapping

var mapEventHandlers = function () {
	
	// authentication
	$('#button_login').click(login_request);
	$('#button_signup').click(signup_request);
	$('#authentication_forms [data-toggle="tab"]').on('shown.bs.tab', toggle_auth_forms);
	$('#authentication_forms input').change(check_input).keyup(check_input);
	$('#authentication_forms [class="glyphicon glyphicon-lock"]').mouseover(toggleShowPassword).mouseleave(toggleShowPassword);
	$('#regiser_retype_email_input').add('#register_retype_password_input').on('paste',denyPasteIn);
	
	
	// UI events
	$('#msgBox').on('hidden.bs.modal',UI.MsgBox.onMsgBoxClose);
	$('#main_nav [tar],#social_box_nav [tar]').click(UI.onClickNavbarIcon);
	$('[collapse]').click(UI.onClickCollapseButton);
	
	
	// Chat events
	$('[aria-labelledby=channel_selector] a').click(Chat.onChannelSelect);	
	$('.sendChatMsg').click(Chat.onSubmitChatMessage).keyup(Chat.onSubmitChatMessage);
	$('#chat_msg_filter button').click(Chat.onToggleFilter);
	$('.chat_msg_sender').click(Chat.onClickWhisperable);
	

	
	
	// socket data
	socket.on('auth',onAuthResponse);
	socket.on('err',UI.onErrorResponse);
	socket.on('chat',Chat.onChatResponse);
}

//--- Initialization
$(document).ready(function() {
	console.log('client.js init...');
	
	mapEventHandlers();
	$(function () {$('[data-toggle="tooltip"]').tooltip()});
	UI.setView('authentication_forms');
	$('#email_input').focus();
	
	
	// cheat
	//UI.setView('main_screen');
	//$('#main_nav [tar]:first').click();
	
	
	
	// test stuff
	//UI.MsgBox.create('j','jjjj',0,function(){alert()});
	//console.log($('#social_box_chat_output').children().not('#chat_msg_template'));
	
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