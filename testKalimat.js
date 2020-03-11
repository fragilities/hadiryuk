function testKalimat(string = '') {
	const stringArr = string.split(' ');
	const newWordArr = [];
	for (let i = 0; i < stringArr.length; i++) {
		newWordArr.push(hurufTengah(stringArr[i]));
	}
	return newWordArr.join('');
}

function hurufTengah(string = '') {
	const middleCharIndex = Math.floor(string.length / 2);

	if (string.length % 2 == 0) {
		return string[middleCharIndex - 1];
	} else {
		return string[middleCharIndex];
	}
}

console.log(testKalimat('Hello This Is a Php Problem') == 'lhIhb' ? 'Benar' : 'Salah');
console.log(testKalimat('the Quick Brown Fox jumps Over the lazy Dog') == 'ioovo' ? 'Benar' : 'Salah');
console.log(testKalimat('Your Guess Is As Good As Mine') == 'oeIAoAi' ? 'Benar' : 'Salah');
console.log(testKalimat('this should        be empty') == '' ? 'Benar' : 'Salah');
console.log(testKalimat('') == '' ? 'Benar' : 'Salah');
console.log(testKalimat('     ') == '' ? 'Benar' : 'Salah');
console.log(testKalimat('this also emPty') == '' ? 'Benar' : 'Salah');
