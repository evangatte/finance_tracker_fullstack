$( document ).ready(function() {
	$editBtn = $('#editBtn');
	$individualCB = $('.individualCheckboxes');




	$individualCB.click(function() {
		if (this.checked) {
			console.log($(this).val())
		}

		$editBtn.removeClass('disabled')
	})


});
