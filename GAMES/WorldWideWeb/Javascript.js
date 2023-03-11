window.onload = function () {
	const log = console.log;

	// https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	let slides0 = document.getElementById('slides0');
	let slides = slides0.children[0]; //gets the "slides-container"

	let amount = slides.children.length;
	let half = amount * 0.5;

	let pressed = 'next';
	let viewing = 0;
	let prevViewing = amount - 1;

	let autoPlay = true;

	let autoPlayFinished = false;

	async function startSlides() {
		await delay(2000);
		startAutoPlay();
	}

	startSlides();

	async function removeVideo() {
		await delay(9000);
		document.getElementById('confetti').remove();
	}

	removeVideo();

	async function changeSlide() {
		// the distance the image being viewed is
		// from the start of the container.
		let start = 0;
		let end = 0;

		let leftOfPrevViewing;

		// get the amount of images to the left
		// of the previously viewed (middle) image
		if (pressed == 'back') {
			leftOfPrevViewing = half;
		} else {
			leftOfPrevViewing = half - 2;
		}

		// loop through all the slides
		for (let i = 0; i < amount; i++) {
			// get one of the slide images
			let img = slides.children[i];

			// resettting order of the slide image
			// goal is to place the slide being viewed in the middle
			img.style.order = i - viewing + half - 1;

			// img.style.order is a string so it must be converted to
			// a Number. These if statements keep the order number in
			// range 0-7.
			if (img.style.order < 0) {
				img.style.order = Number(img.style.order) + amount;
			}
			if (img.style.order >= amount) {
				img.style.order = Number(img.style.order) - amount;
			}

			// calculate the starting position after reordering
			if (img.style.order < leftOfPrevViewing) {
				start += img.clientWidth;
			}

			// if the image is placed to the left of the image being viewed
			// then add its width to the end position
			if (img.style.order < half - 1) {
				end += img.clientWidth;
			}
			img.className = '';
		}

		// highlight the image that is being viewed in the center
		let cur = slides.children[viewing];
		cur.className = 'viewing';

		// add half the width of the image being viewed
		end += cur.clientWidth / 2;

		// subtract half the width of the slides top level container
		end -= slides0.clientWidth / 2;

		end = -end + 'px';

		// calculate new starting position after the reordering
		let prev = slides.children[prevViewing];
		start += prev.clientWidth / 2;
		start -= slides0.clientWidth / 2;
		start = -start + 'px';

		// teleport to the new start,
		// should be same position it's already at except
		// after reordering
		slides.classList.remove('transition-on');
		slides.style['margin-left'] = start;

		await delay(16); // delay for some unknown reason?

		// transition with animation from the start to the end position
		slides.classList.add('transition-on');
		slides.style['margin-left'] = end;
	}

	changeSlide();

	async function goToNext() {
		prevViewing = viewing;
		pressed = 'next';
		viewing++;
		if (viewing >= amount) {
			viewing = 0;
		}
		log('viewing: ' + viewing);
		changeSlide();
	}

	async function goToPrev() {
		autoPlay = false;
		prevViewing = viewing;
		pressed = 'back';
		viewing--;
		if (viewing < 0) {
			viewing = amount - 1;
		}
		log('viewing: ' + viewing);
		changeSlide();
	}

	async function startAutoPlay() {
		//find a way to count how many times startAutoPlay is run
		autoPlay = true;
		while (autoPlay) {
			autoPlayFinished = false;
			goToNext();
			await delay(2000);
		}
		//autoPlayFinished to check that the loop is finished
		autoPlayFinished = true;
	}

	document.getElementById('back').onclick = goToPrev;
	document.getElementById('next').onclick = function () {
		autoPlay = false;
		goToNext();
	};
	document.getElementById('play').onclick = async function () {
		if (!autoPlay) {
			document.getElementById('play').textContent = '‖';
			if (autoPlayFinished == true) {
				startAutoPlay();
			} else {
				autoPlay = true;
			}
		} else {
			document.getElementById('play').textContent = '▶';
			autoPlay = false;
		}
	};
};

/*functionality to add
	[x] Happy birthday song
	[x] blows up/zooms in the image when viewing
	[ ] decorations/dyanmic elements
*/
