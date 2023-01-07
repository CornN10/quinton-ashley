async function start() {
	// your code goes here
	// 4 bits
	let choice = await prompt('B2D or D2B?');
	if (choice == 'B2D') {
		let binaryNumber = await prompt('Input a binary number.');
		binaryNumber = '' + binaryNumber;
		log(binaryNumber);
		let decimalNumber = 0;
		for (let i = 0; i < binaryNumber.length; i++) {
			if (binaryNumber[i] == '1') {
				decimalNumber = decimalNumber + 2 ** (binaryNumber.length - 1 - i);
			}
		}
		await alert('Your decimal num is ' + decimalNumber);
	} else {
		let decimalNumber = await prompt('Input a decimal num.');
		let binaryNumber = '';
		for (let i = 15; i >= 0; i--) {
			if (decimalNumber >= 2 ** i) {
				decimalNumber = decimalNumber - 2 ** i;
				binaryNumber = binaryNumber + '1';
			} else {
				binaryNumber = binaryNumber + '0';
			}
		}
		await alert(binaryNumber);
	}
}
