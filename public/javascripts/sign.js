$(function() {
	var password = $("#password");
	var password_again = $("#password_again");
	if (password.val() != password_again.val()) {
		$("#messageCheck").text("密码输入不一致，请重新输入！");
	}else{
		$("#messageCheck").text("");
	}
})





// $("#register").validate({
// 	rule:{
// 		password:"required",
// 		password_again:{
// 			equalTo:"#password"
// 		}
// 	}
// });