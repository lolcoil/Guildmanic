var MsgBox = { 
	queue : [],
	isMsgBoxShown : false,
	create : function (title,msg,size,callback) {
		if (callback == 'undefined' || callback == null ) {
			callback = '';
		}
		MsgBox.queue.push([title,msg,size,callback]);
		MsgBox.show();
	},
	show : function (){
		if(!MsgBox.isMsgBoxShown){
			MsgBox.isMsgBoxShown = true;
			var s = '';
			if (MsgBox.queue[0][2] == 0) {
				s = 'modal-dialog modal-sm';
			}
			else{
				if (MsgBox.queue[0][2] == 2){
					s = 'modal-dialog modal-lg';
				}
				else {
					s = 'modal-dialog modal-md';
				}
			}
			$('#msgBox > div').attr('class',s);
			$('#msgBox [class=modal-header] h4').html(MsgBox.queue[0][0]);
			$('#msgBox [class=modal-body] p').html(MsgBox.queue[0][1]);
			$('#msgBox').modal('show');
		}
	},
	onMsgBoxClose : function () {
		if (jQuery.isFunction(MsgBox.queue[0][3])){
			MsgBox.queue[0][3]();
		}
		MsgBox.queue.shift();
		MsgBox.isMsgBoxShown = false;
		if (MsgBox.queue.length > 0){
			MsgBox.show();
		}
	}
}