let frog, lilypads, flies;
let bigJumpSound, smallJumpSound;

let countdown = 12;

let score = 0;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });

	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });

	let flyText = `
0
 00000
 0  0 0`;
	let flyImg = spriteArt(flyText);
	flies = new Group();
	flies.addImg(flyImg);

	bigJumpSound = loadSound('sounds/bigJump.wav');
	bigJumpSound.setVolume(0.01);
	smallJumpSound = loadSound('sounds/smallJump.wav');
	smallJumpSound.setVolume(0.01);
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
	frog.y = 80;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.layer = 2;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';
	lilypads.layer = 1;

	flies.y = 80;

	makeLilyPads();

	frog.overlaps(flies, eat);

	alert('Press the up arrow key to jump one lily pad. Press right arrow to jump two.', 2);
}

function eat(player, fly) {
	fly.remove();
	countdown += 3;
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */

	for (let i = 1; i <= 100; i++) {
		let lily = new lilypads.Sprite();
		lily.ani.frameDelay = round(random(20, 50));
		lily.ani.frame = round(random(0, 11));
		lily.x = 16 * i;

		if (lilypads.length % 6 == 0) {
			let fly = new flies.Sprite();
			fly.x = lily.x;
		}

		if (random(0, 1) > 0.5) {
			i++;
		}
	}
	log(lilypads.length);
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	if (frameCount % 60 == 0) {
		countdown--;
		text(countdown + ' ', 0, 18);
	}

	// if the frog is on the ground
	if (frog.y > 83) {
		frog.ani.stop();
		frog.ani.frame = 0;
		if (kb.presses('ArrowUp')) {
			// little jump
			frog.ani.play();
			smallJumpSound.play();
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.96;
			score++;
		} else if (kb.presses('ArrowRight')) {
			// BIG jump!
			frog.ani.play();
			bigJumpSound.play();
			frog.velocity.y = -2;
			frog.velocity.x = 1.35;
			score += 2;
		}
		frog.x = round(frog.x / 16) * 16;
	}
	camera.x = frog.x + 64;

	if (frog.y > 160) {
		frog.x = frog.x - 16;
		frog.y = 80;
	}

	if (countdown == 0) {
		reset();
	}
}

async function reset() {
	text('Game Over! Your score was ' + score, 6, 2);
	await delay(2000);
	text('                                 ', 6, 2);
	score = 0;
	countdown = 11;
	frog.velocity.x = 0;
	frog.velocity.y = 0;
	frog.x = 16;
	frog.y = 80;
}
