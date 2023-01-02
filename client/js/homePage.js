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
		$('.draftTypeEditDisplay').text(currentExpense.draftType);
		$('#draftTypeEditInput').val(currentExpense.draftType);
		$('#expenseEditIndexInput').val(index);

		if (currentExpense.draftType == 'Manual-draft') {
			$('.paidStatusContainer').removeClass('d-none');
			$('.paidStatusContainer').addClass('d-flex');
			$('.paidStatusEditDisplay').text(currentExpense.status);
			$('#paidStatusEditInput').val(currentExpense.status);
		}
	});


	$('.paidStatusEditDropDown').click(function() {
		$('.paidStatusEditDisplay').text('Paid');
		$('#paidStatusEditInput').val('Paid');
	});



	$('.notPaidStatusEditDropDown').click(function() {
		$('.paidStatusEditDisplay').text('Not paid');
		$('#paidStatusEditInput').val('Not paid');
	});


	$('.autoDraftEditDropDown').click(function() {
		$('.draftTypeEditDisplay').text('Auto-draft');
		$('#draftTypeEditInput').val('Auto-draft');
	});


	$('.manualDraftEditDropDown').click(function() {
		$('.draftTypeEditDisplay').text('Manual-draft');
		$('#draftTypeEditInput').val('Manual-draft');
	});


	$deleteBillBtn.click(async function() {
		const index = $(this).attr('data-index');
		$('#expenseDeleteIndexInput').val(index);
		const data = await fetchInfo()
		const currentExpense = data[index];

		$('#approveDeleteBillName').text(currentExpense.expenseName);
	});


	$('.autoDraftDropDown').click(function() {
		$('.draftTypeDisplay').text('Auto-draft');
		$('#draftTypeInput').val('Auto-draft');
	});

	$('.manualDraftDropDown').click(function() {
		$('.draftTypeDisplay').text('Manual-draft');
		$('#draftTypeInput').val('Manual-draft');
	});
});
