$( document ).ready(function() {
	const $calendar = $(".calendar");
	let $monthName = $('#monthName');

	let currentYear = new Date().getFullYear();
	let currentMonth = new Date().getMonth() + 1;
	let currentDayNum = new Date().getDay()
	let numberOfDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
	let currentDay;
	
	
	const date = new Date();
	console.log(date.getUTCDate());
	$monthName.text(date.toLocaleString("default", { month: "long" }))
	
	
	function findCurrentDay() {
		switch (currentDayNum) {
			case 0:
				currentDay = "Sunday";
				break;
			case 1:
				currentDay = "Monday";
				break;
			case 2:
				currentDay = "Tuesday";
				break;
			case 3:
				currentDay = "Wednesday";
				break;
			case 4:
				currentDay = "Thursday";
				break;
			case 5:
				currentDay = "Friday";
				break;
			case 6:
				currentDay = "Saturday";
		}
		return currentDay;
	}
	
	findCurrentDay();


	//find what day of the week the first day of the month is	
	function getFirstDay() {
		const date = new Date(currentYear, currentMonth - 1, 1);
		return date.getDay();
	}
	
	let firstDayOfMonth = getFirstDay();

	

	///create the calendar rows that will be used in createCalendar()
	let $numberRowOne = $('<div></div>').addClass('row');
	let $numberRowTwo = $('<div></div>').addClass('row ');
	let $numberRowThree = $('<div></div>').addClass('row');
	let $numberRowFour = $('<div></div>').addClass('row numRow');
	let $numberRowFive = $('<div></div>').addClass('row numRow');
	let $numberRowSix = $('<div></div>').addClass('row numRow');
	
	
	
	
	//create array that holds that holds a number for every day of the month for example 1-31
	function createDaysArray(days) {
		let i = 1;
		const daysArr = [];
		for (i; i <= days; i++) {
			daysArr.push(i);
		}
	
		return daysArr;
	}

	let numOfDaysArr = createDaysArray(numberOfDaysInMonth);
	





	// figure out how many blank spaces will go before the first day of the month, for example if the first day of the month isnt monday there will be blank spaces before it	
	function createBlankSpaces() {
		let dayArr = [];
		for (let i = 0; i < firstDayOfMonth; i++) {
			dayArr.push(i);
		}

		for (let i = 0; i < dayArr.length; i++) {
			let $newCol = $('<div></div>').addClass('col border')
			$numberRowOne.append($newCol)
			numberRowCounter++
		}
	} 
		
	
	
	
	let numberRowCounter = 0
	
	function createCalendar() {
		const dayOfWeekArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

		//Days of the week row (top row)
		const $daysOfWeekRow = $("<div></div>").addClass("row");

		
		//create and append days of the week cols to days of week row (top row)
		let dayOfWeekCounter = 0;
		dayOfWeekArray.forEach(function(day) {
			let $newCol = $("<div></div>").addClass(`col border numCol ${dayOfWeekCounter}`);
			$newCol.text(day);
			$daysOfWeekRow.append($newCol);
			dayOfWeekCounter++;
		});
		$calendar.append($daysOfWeekRow);
	
		
		
		
		createBlankSpaces(numberRowCounter);

		numOfDaysArr.forEach(function(num) {
			if (numberRowCounter < 7) {
				let $newCol = $("<div></div>").addClass(`col border numCol ${numberRowCounter}`);
				$newCol.text(num);
				$numberRowOne.append($newCol);
				$calendar.append($numberRowOne);
				numberRowCounter++
			} else if (numberRowCounter < 14) {
				let $newCol = $("<div></div>").addClass(`col border numCol ${numberRowCounter}`);
				$newCol.text(num);
				$numberRowTwo.append($newCol);
				$calendar.append($numberRowTwo);
				numberRowCounter++	
			} else if (numberRowCounter < 21) {
				let $newCol = $("<div></div>").addClass(`col border numCol ${numberRowCounter}`);
				$newCol.text(num);
				$numberRowThree.append($newCol);
				$calendar.append($numberRowThree);
				numberRowCounter++	
			} else if (numberRowCounter < 28) {
				let $newCol = $("<div></div>").addClass(`col border numCol ${numberRowCounter}`);
				$newCol.text(num);
				$numberRowFour.append($newCol);
				$calendar.append($numberRowFour);
				numberRowCounter++	
			} else if (numberRowCounter < 35) {
				let $newCol = $("<div></div>").addClass(`col border numCol ${numberRowCounter}`);
				$newCol.text(num);
				$numberRowFive.append($newCol);
				$calendar.append($numberRowFive);
				numberRowCounter++	
			} else {
				let $newCol = $("<div></div>").addClass(`col border numCol ${numberRowCounter}`);
				$newCol.text(num);
				$numberRowSix.append($newCol);
				$calendar.append($numberRowSix);
				numberRowCounter++		
			}
		});
	
		

		/// add blank spaces to the last row of calendar
		let lastRow = $calendar.children().last();
		let lastRowLength =	$calendar.children().last().children().length; 
		if ($calendar.children().last().children().length < 7) {
			for (let i = 0; i < 7 - lastRowLength; i++) {
				let emptyCol = $('<div></div>').addClass('col border')
				lastRow.append(emptyCol)
			}
		}
	}
	
	
	createCalendar();




	function highlightCurrentDay() {
		let date = new Date().getDate();

		$('.numCol').each(function() {
			if ($(this).text() == date.toString()) {
				$(this).css('background-color', 'aqua');
			}
		});
	}
	highlightCurrentDay();


});
