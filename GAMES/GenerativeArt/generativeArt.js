let time = 0;
let art = 0;

async function draw() {
	log(art);
	background(0, 255, 255, 30);
	if (art < 3) {
		background(0, 0, 0, 30);
	} else if (art < 8) {
		background(0, 0, 255, 30);
	} else if (art < 11) {
		background(255, 0, 0);
	} else {
		background(mouse.x % 255, 255, 0);
	}
	stroke('green');
	strokeWeight(10);
	translate(width / 2, height / 2);
	if (kb.presses('left')) {
		if (art == 0) {
			art = 12;
		} else {
			art--;
		}
	}
	if (kb.presses('right')) {
		if (art == 12) {
			art = 0;
		} else {
			art++;
		}
	}
	for (let i = 0; i < 10; i++) {
		if (i % 2 == 0) {
			stroke('green');
		} else {
			stroke('w');
		}
		if (art < 3) {
			//art 0-2
			for (let i = 0; i < 30; i++) {
				point(eqX(time - i), eqY(time - i));
			}
			time += 0.1;
		} else if (art < 8) {
			//art 3-7
			for (let i = 0; i < 3; i++) {
				stroke('blue');
				line(eqX(time - i), eqY(time - i), eqX2(time - i), eqY2(time - i));
			}
			time += 0.1;
		} else if (art < 11) {
			//art 8-10
			stroke('black');
			strokeWeight((time % 100) / 50);
			//log(eqX(time), eqY(time), eqX2(time), eqY2(time));
			for (let i = 0; i < 20; i++) {
				line(eqX(time - i), eqY(time - i), eqX2(time - i), eqY2(time - i));
			}
			time += 0.1;
		} else {
			//art 11-12
			strokeWeight(mouse.x / 100);
			for (let i = 0; i < 12; i++) {
				stroke(sin(time - i) * 255, 200, cos(time - i) * 255);
				line(eqX(time - i), eqY(time - i), eqX2(time - i), eqY2(time - i));
			}
			time += 0.1;
		}
	}
}

function eqX(t) {
	if (art == 0) {
		return sin(t * 5) * 100 + cos(t * 10) * 200;
	}
	if (art == 1) {
		return sin(t * 10) * 300 + tan(t * 20) * 100;
	}
	if (art == 2) {
		return cos(t * 20) * 200 + sin(t * 30) * 100;
	}
	if (art == 3) {
		return sin(t * 10) * 200 + cos(t * 10) * 100;
	}
	if (art == 4) {
		return 0;
	}
	if (art == 5) {
		return sin(t * 30) * 50 + tan(t * 30) * 50;
	}
	if (art == 6) {
		return cos(t * 20) * 200 + cos(t * 20) * 50 + mouse.x;
	}
	if (art == 7) {
		return sin(t * 20) * 50 + sin(t * 15) * 50;
	}
	if (art == 8) {
		return sin(t * 20) * 50 + sin(t * 15) * 50 + mouse.x;
	}
	if (art == 9) {
		return sin(t * 30) * 50 + mouse.x;
	}
	if (art == 10) {
		return cos(t * 30) * mouse.x + cos(t * 15) * 40;
	}
	if (art == 11) {
		return tan(t * 10) * 40;
	}
	if (art == 12) {
		return cos(t * 15) * 50;
	}
}

function eqY(t) {
	if (art == 0) {
		return cos(t * 5) * 100;
	}
	if (art == 1) {
		return sin(t * 4) * 300 + cos(t * 4) * 300;
	}
	if (art == 2) {
		return cos(t * 10) * 200 + sin(t * 10) * 100;
	}
	if (art == 3) {
		return cos(t * 10) * 200 + sin(t * 10) * 100;
	}
	if (art == 4) {
		return 0;
	}
	if (art == 5) {
		return cos(t * 30) * 50 + tan(t * 30) * 50;
	}
	if (art == 6) {
		return sin(t * 15) * 200 + cos(t * 30) * 50 + mouse.y;
	}
	if (art == 7) {
		return cos(t * 20) * 50 + sin(t * 15) * 50;
	}
	if (art == 8) {
		return cos(t * 20) * 50 + sin(t * 15) * 50 + mouse.y;
	}
	if (art == 9) {
		return cos(t * 30) * 50 + cos(t * 15) * 50 + mouse.y;
	}
	if (art == 10) {
		return sin(t * 70) * 200 + mouse.y;
	}
	if (art == 11) {
		return cos(t * 30) * 50 + sin(t * 15) * 50;
	}
	if (art == 12) {
		return tan(t * 30) * 50 + sin(t * 15) * 50;
	}
}

function eqX2(t) {
	if (art == 3) {
		return sin(t * 30) * 50 + sin(t * 12) * 100;
	}
	if (art == 4) {
		return sin(t * 30) * 50 + sin(t * 12) * 100;
	}
	if (art == 5) {
		return tan(t * 30) * 50 + sin(t * 30) * 50;
	}
	if (art == 6) {
		return tan(t * 30) * 50 + cos(t * 30) * 50;
	}
	if (art == 7) {
		return sin(t * 15) * 200 + cos(t * 15) * 200;
	}
	if (art == 8) {
		return sin(t * 15) * 200 + cos(t * 15) * 200;
	}
	if (art == 9) {
		return sin(t * 30) * 50 + tan(t * 15) * 50;
	}
	if (art == 10) {
		return sin(t * 30) * 50 + sin(t * 15) * 50;
	}
	if (art == 11) {
		return cos(t * 30) * 50 + cos(t * 15) * 50;
	}
	if (art == 12) {
		return tan(t * 30) * 50 + tan(t * 15) * 50;
	}
}

function eqY2(t) {
	if (art == 3) {
		return sin(t * 30) * 50 + sin(t * 12) * 100;
	}
	if (art == 4) {
		return sin(t * 30) * 50 + sin(t * 12) * 100;
	}
	if (art == 5) {
		return cos(t * 50) * 50 + cos(t * 50) * 50;
	}
	if (art == 6) {
		return sin(t * 30) * 200 + sin(t * 30) * 50;
	}
	if (art == 7) {
		return cos(t * 20) * 50 + cos(t * 20) * 50;
	}
	if (art == 8) {
		return cos(t * 20) * 50 + cos(t * 20) * 50;
	}
	if (art == 9) {
		return sin(t * 30) * 50 + tan(t * 15) * 50;
	}
	if (art == 10) {
		return cos(t * 100) * 10 + sin(t * 15) * 50;
	}
	if (art == 11) {
		return tan(t * 30) * 50 + tan(t * 15) * 50;
	}
	if (art == 12) {
		return sin(t * 30) * 50 + sin(t * 15) * 50;
	}
}
