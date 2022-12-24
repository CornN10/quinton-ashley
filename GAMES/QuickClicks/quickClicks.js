const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `;

const imposterTarget = `
 .d88b. 
88    88
88    88
 'Y88P' `;
/* Part A: find the range of row and column values the target can be placed at */
let row = 0;
let col = 0;
let times = [];
let counter = 0;
function makeTargets() {
	if (counter == 10) {
		calcStats();
		return;
	}
	counter++;
	times.push(Date.now());
	log(times);
	erase();
	bgPattern();
	row = round(random(1, 23));
	col = round(random(1, 71));
	button(target, row, col, makeTargets);
	for (let i = 1; i < 5; i++) {
		let row2 = round(random(1, 23));
		let col2 = round(random(1, 71));
		button(imposterTarget, row2, col2, gameOver);
	}
}
async function calcStats() {
	let clickSpeed = [];
	for (let j = 0; j <= 8; j++) {
		clickSpeed.push(times[j + 1] - times[j]);
	}
	log(clickSpeed);
	let total = 0;
	let fastestSpeed = 1000000;
	let slowestSpeed = 0;
	for (let k = 0; k <= 8; k++) {
		total = total + clickSpeed[k];
		if (clickSpeed[k] < fastestSpeed) {
			fastestSpeed = clickSpeed[k];
		}
		if (clickSpeed[k] > slowestSpeed) {
			slowestSpeed = clickSpeed[k];
		}
	}
	let average = round(total / 9);
	erase();
	await alert(
		'Your average was: ' +
			average / 1000 +
			' seconds, your fastest speed was: ' +
			fastestSpeed / 1000 +
			' seconds, and your slowest speed was: ' +
			slowestSpeed / 1000 +
			' seconds'
	);
}

function bgPattern() {
	let pattern1 = '____'.repeat(19);
	let pattern2 = '/  \\'.repeat(19);
	let pattern3 = '\\  /'.repeat(19);
	for (let i = 1; i <= 25; i += 3) {
		text(pattern1, i);
		text(pattern2, i + 1);
		text(pattern3, i + 2);
	}
}

async function gameOver() {
	counter = 0;
	times = [];
	erase();
	await alert('Game Over!');
	text(target, row, col);
	await delay(2000);
	await alert('Press okay to start new game');
	makeTargets();
}
async function start() {
	await alert(
		'Click on the larger targets to score a point. Beware of the impostor targets. When you are ready, press okay.',
		12,
		1,
		78
	);
	makeTargets();
}
