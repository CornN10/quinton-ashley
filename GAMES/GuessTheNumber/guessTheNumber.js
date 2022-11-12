async function start() {
	// your code goes here!

	let num = round(random(1, 100));
	let guess;

	while (guess != num) {
		guess = await prompt('Guess a number 1 to 100');

		if (guess > num) {
			await alert('Guess was too high');
		} else if (guess < num) {
			await alert('Guess was too low');
		} else {
			await alert('Your guess was correct!');
		}
	}
	exit();
}
