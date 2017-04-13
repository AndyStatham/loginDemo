$(function() {
	$('.del').click(function(e) {
		var target = $(e.target);
		var id =target.data('id');
		var tr = target.parent().parent();
		console.log(target);
		console.log(target.parent());
		console.log(tr);
		// console.log(tr);

		$.ajax({
			type:'POST',
			url:'/accountDel',
			data:{
				id:id
			}
		})
		tr.remove();
		console.log(id);
	})
})