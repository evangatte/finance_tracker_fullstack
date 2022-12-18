$( document ).ready(function() {
	$editBtn = $('#editBtn');
	$individualCB = $('.individualCheckboxes');
	$editBillBtn = $('.editBillBtn');
	$deleteBillBtn = $('.deleteBillBtn');

	$editBtn.prop('disabled', true);


	async function fetchInfo() {
		const response = await fetch('http://localhost:3000/fetch-info')
		const data = await response.json();
		return data.expenses;
	}

	
	$individualCB.click(function() {
		$editBtn.prop('disabled', false);
		if ($individualCB.checked) {
			$editBtn.prop('disabled', false)
		}
	});


	$editBillBtn.click(async function() {
		const index = $(this).attr('data-index');

		const data = await fetchInfo()
		const currentExpense = data[index];

		$('#expenseNameEditInput').val(currentExpense.expenseName);
		$('#expenseAmountEditInput').val(currentExpense.expenseAmount);
		$('#expenseDueDateEditInput').val(currentExpense.dueDate);
		$('#expenseEditIndexInput').val(index)
	})


	$deleteBillBtn.click(async function() {
		const index = $(this).attr('data-index');
		$('#expenseDeleteIndexInput').val(index);
		const data = await fetchInfo()
		const currentExpense = data[index];

		$('#approveDeleteBillName').text(currentExpense.expenseName);
		
	});
});
