let arr = [];
for (let i = 0; i <= 100; i++) {
	arr.push(i);
}

async function addNumbers(arr) {
	let sum = 0;
	for (let i = 0; i <= 99; i++) {
		sum += await asyncAdd(arr[i], arr[i + 1] ?? 0);
		console.log('result of operation #' + i + ': ' + sum);
	}
	return sum;
}

const asyncAdd = async (a, b) => {
	if (typeof a !== 'number' || typeof b !== 'number') {
		return Promise.reject('Argumenty muszą mieć typ number!');
	}
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(a + b);
		}, 100);
	});
};

console.time('addNumbers');
addNumbers(arr).then((sum) => {
	console.log('Final result: ' + sum);
});
console.timeEnd('addNumbers');
