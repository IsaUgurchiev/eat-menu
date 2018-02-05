(function () {
	var menuItems = document.querySelectorAll('.js__menu__item'),
		plusBtns = document.querySelectorAll('.js__plus'),
		minusBtns = document.querySelectorAll('.js__minus');

	menuItems.forEach(function (item) {
		item.onclick = function (e) {
			setActiveClass(menuItems, item)
		};
	});

	plusBtns.forEach(function (item) {
		item.onclick = function (e) {
			e.stopPropagation();
			
			var target = e.target,
				counter = target.parentNode.querySelectorAll('.js__number')[0],
				val = parseInt(counter.innerHTML) || 0;

			if (!counter.classList.contains('active')) {
				counter.classList.add('active');
			}

			val = val + 1;
			counter.innerHTML = val;

			countTotal();
			
			return false;
		};
	});

	minusBtns.forEach(function (item) {
		item.onclick = function (e) {
			e.stopPropagation();
			
			var target = e.target,
				counter = target.parentNode.querySelectorAll('.js__number')[0],
				val = parseInt(counter.innerHTML) || 0;
			
			if (val == 0) {
				return false;
			}
			
			val = val - 1;
			counter.innerHTML = val;

			if (counter.classList.contains('active') && val == 0) {
				counter.classList.remove('active');
			}

			countTotal();

			return false;
		};
	});
	
	function setActiveClass(elements, target) {
		var hasClass = target.classList.contains('active');
		
		elements.forEach(function (el) {
			el.classList.remove('active');
		});

		// Если класс уже есть нам необходимо его убрать
		if (hasClass) {
			target.classList.remove('active');
		} else {
			target.classList.add('active');
		}
	}

	function countTotal() {
		var totalHtml = document.querySelectorAll('.js__total')[0].getElementsByTagName('span').item(0),
			counters = document.querySelectorAll('.js__number'),
			total = 0;

		counters.forEach(function (val) {
			if (parseInt(val.innerHTML)) {
				total += parseInt(val.innerHTML);
			}
		});
		


		totalHtml.innerHTML = total;
	}
})();