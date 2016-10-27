//--- Function Definitions

var change_feedback_of_register_input = function (input,show,success,txt) {
	var feedback = $(input).next();
	if (show){
		if(success){
			feedback.children().attr({'class': 'glyphicon glyphicon-ok','data-original-title': 'This seems to be ok.','style': 'color:lime'});
		}
		else{
			feedback.children().attr({'class': 'glyphicon glyphicon-remove','data-original-title': txt,'style': 'color:red'});
		}
		feedback.show();
	}
	else {
		feedback.children().attr({'class': 'glyphicon glyphicon-remove'});
		feedback.hide();
	}
}

	
//--- Eventhandlers

var onAuthResponse = function (data){
	console.log('recived some data from server. ' + data);
	if (data[0] == 0){
		if(data[1] == 0){ //recived login token
			console.log('got login token from server');
			var token =	sha3_512(String(Math.random()));
			socket.emit('auth',[0,1,$('#email_input').val(),token,sha3_512(sha3_512(String($('#password_input').val())) + data[2] + token)]);
		}
		else{
			if(data[1] == 1){ //login succssesful
				username = data[3];
				auth_token = data[4];
				UI.setView('main_screen');
				UI.setContent('content_overview');
			}
			else{
				if(data[1] == 2){//user allready online
					UI.MsgBox.create('Username in use','Apperantly this account is logged in from somewhere eles allready. Did you share your Account? Did you got hacked?',0,function (){
						$('#password_input').val('').change().focus();
					});
				}
				else{//wrong credentials
					UI.MsgBox.create('Access denied','Unknown E-Mail or wrong password. Hover over the lock symbole to reveal your password',0,function (){
						$('#password_input').val('').change().focus();
					});
				}
			}
		}
	}
	if (data[0] == 1){
		if (data[1] == 0){
			UI.MsgBox.create('Registration Complete','You have been succssesfuly register with the E-Mail ' + $('#register_email_input').val() + ' as user named ' + $('#register_username_input').val(),0,function (){
				$('#authentication_forms a[href="#login_form"]').click();
				$('#button_signup').prop('disabled',false).html('Sign me up');
			});
		}
		else{
			var a = [['register_username_input','Username is not available. Choose an other one.'],
					['register_email_input','E-Mail allready in use. Choose an other one.'],
					['register_referral_username_input','Either this user does not exist or he/she is not allowed as a referral.']];
			if (data[2]){
				change_feedback_of_register_input($('#' + a[data[1]-1][0]),true,true);
			}
			else{
				change_feedback_of_register_input($('#' + a[data[1]-1][0]),true,false,a[data[1]-1][1]);
			}
		}
	}
}

var denyPasteIn = function (e){
	console.log(e);
	e.preventDefault();
	$(e.target).val('');
	change_feedback_of_register_input(e.target,true,false,'Sorry your not suspossed to copy/paste.You are such a lazy fool.');
}

var toggleShowPassword = function (e) {
	if (e.type == 'mouseover'){
		$(e.target.offsetParent).find('input').attr('type','text');
	}
	else
	{
		$(e.target.offsetParent).find('input').attr('type','password');
	}
}

var toggle_auth_forms = function (e) {
	$($(e.target).attr('href') + ' input').first().focus();
	$('#authentication_forms input:not([type="submit"])').val('').not('#login_form').each( function () {change_feedback_of_register_input(this,false)});
}

var login_request = function () {
	console.log('sending login_request');
	socket.emit('auth',[0,0]);
}

var signup_request = function () {
	console.log('signup_request');
	var ready = true;
	$('#registration_form input ~ span > span').not(':last').each(function (){
		if ($(this).attr('class') != 'glyphicon glyphicon-ok'){
			ready = false;
			return false;
		}
	});
	if (ready){
		$('#button_signup').prop('disabled',true).html('<span class="glyphicon glyphicon-hourglass"></span>');
		console.log('sending signup_request');
		socket.emit('auth',[1,0,$('#register_username_input').val(),$('#register_email_input').val(),$('#register_referral_username_input').val(),sha3_512($('#register_password_input').val())]);
	}
}

var check_input = function (e) {
	console.log('validating data in ' + this.id);
	if (this.id == 'register_username_input') {
		if (this.value.match(/^[a-z]{4,20}$/ig) == null) {
			if (this.value.length > 0) {
				console.log('fail username. not matching regex');
				change_feedback_of_register_input(this,true,false,'Username can only contain letters and has to be 4 to 20 long.');
			}
			else {
				console.log('fail username. field is empty');
				change_feedback_of_register_input(this,false);
			}
		}
		else{
			console.log('ok username ' + this.value);
			socket.emit('auth',[1,1,this.value]);
		}
	}
	if (this.id == 'register_email_input') {
		if (this.value.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) == null) {
			if (this.value.length > 0){
				console.log('fail email. not matching regex');
				change_feedback_of_register_input(this,true,false,'The E-Mail address you are trying to use appears to violate international internet standarts. It means your E-Mail address is invalid.');
			}
			else{
				console.log('fail email. field is empty');
				change_feedback_of_register_input(this,false);
			}
		}
		else{
			console.log('ok email ' + this.value);
			socket.emit('auth',[1,2,this.value]);
		}
		if (!e.hasOwnProperty('isTrigger')){$('#regiser_retype_email_input').change()}
	}
	if (this.id == 'regiser_retype_email_input') {
		if ($(this).val() != $('#register_email_input').val() || this.value.length < 1) {
			if (this.value.length > 0){
				console.log('fail retype email. not matching email');
				change_feedback_of_register_input(this,true,false,'Does not match with the E-Mail above.');
			}
			else{
				console.log('fail retype email. field is empty');
				change_feedback_of_register_input(this,false);
			}
		}
		else{
			console.log('ok retype email ' + this.value);
			change_feedback_of_register_input(this,true,true);
		}
		if (!e.hasOwnProperty('isTrigger')){$('#register_email_input').change()}
	}
	if (this.id == 'register_password_input') {
		if (this.value.match(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/)) {
			if (this.value.length > 0){
				console.log('fail password. not matching regex');
				change_feedback_of_register_input(this,true,false,'Password has to contain at least one lowercase, uppercase, number and special character and need to be at least 8 long. Hover over the lock icon to reveal the typed password');
			}
			else{
				console.log('fail password. field is empty');
				change_feedback_of_register_input(this,false);
			}
		}
		else{
			console.log('ok password ' + this.value);
			change_feedback_of_register_input(this,true,true);
		}
		if (!e.hasOwnProperty('isTrigger')){$('#register_retype_password_input').change()}
	}
	if (this.id == 'register_retype_password_input') {
		if ($(this).val() != $('#register_password_input').val() || this.value.length < 1) {
			if (this.value.length > 0){
				console.log('fail retype password. not matching password');
				change_feedback_of_register_input(this,true,false,'Does not match with the password above. Hover over the lock icon to reveal the typed password');
			}
			else{
				console.log('fail retype password. field is empty');
				change_feedback_of_register_input(this,false);
			}
		}
		else{
			console.log('ok retype password ' + this.value);
			change_feedback_of_register_input(this,true,true);
		}
		if (!e.hasOwnProperty('isTrigger')){$('#register_password_input').change()}
	}
	if (this.id == 'register_referral_username_input') {
		if (this.value.match(/^[a-z]{4,16}$/ig) == null) {
			if (this.value.length > 0) {
				console.log('fail referal username. not matching regex');
				change_feedback_of_register_input(this,true,false,'Referal username can only contain letters and has to be 4 to 16 long.');
			}
			else {
				console.log('fail referal username. field is empty');
				change_feedback_of_register_input(this,false);
			}
		}
		else{
			console.log('ok referal username ' + this.value);
			socket.emit('auth',[1,3,this.value]);
		}
	}
	if(this.id == 'email_input' || this.id == 'password_input'){
		if($('#email_input').val().match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != null && $('#password_input').val().match(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/) == null){
			$('#button_login').prop('disabled',false);
		}
		else{
			$('#button_login').prop('disabled',true);
		}
	}
}
