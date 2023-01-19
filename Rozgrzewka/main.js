const divForImputs = document.querySelector('#inputs');
let input = document.querySelectorAll('.input');

const buttons = document.querySelector('#buttons');
const addNewBtn = document.querySelector('#add-new-btn');
const doMath = document.querySelector('#do-math');
const reset = document.querySelector('#clear');
const remove = document.querySelector('#remove');

const sume = document.querySelector('#Suma');
const average = document.querySelector('#Srednia');
const minVal = document.querySelector('#Minimum');
const maxVal = document.querySelector('#Maksimum');

input.forEach((item) => {
	item.addEventListener('change', (e) => {
		math();
	});
});

function addNewInput() {
	let newInput = document.createElement('input');
	newInput.setAttribute('type', 'number');
	newInput.setAttribute('class', 'input');
	newInput.setAttribute('placeholder', 'Podaj liczbę');
	document.querySelector('#inputs').appendChild(newInput);
	document.body.insertBefore(divForImputs, buttons);
	newInput.addEventListener('change', (e) => {
		math();
	});
	input = document.querySelectorAll('.input');
}

function math() {
	let sum = null;
	let avg = null;
	let min = null;
	let max = null;
	let arr = [];

	let inputs = document.querySelectorAll('.input');
	inputs.forEach((item) => {
		sum += parseInt(item.value);
		avg = sum / inputs.length;
		arr.push(parseInt(item.value));
	});

	min = Math.min(...arr);
	max = Math.max(...arr);

	sume.innerHTML = sum;
	average.innerHTML = avg;
	minVal.innerHTML = min;
	maxVal.innerHTML = max;
}

addNewBtn.addEventListener('click', () => {
	addNewInput();
});

doMath.addEventListener('click', () => {
	math();
});

reset.addEventListener('click', () => {
	input.forEach((item) => {
		item.value = '';
	});
	sume.innerHTML = '';
	average.innerHTML = '';
	minVal.innerHTML = '';
	maxVal.innerHTML = '';
});

remove.addEventListener('click', () => {
	input[input.length - 1].remove();
	input = document.querySelectorAll('.input');
	math();
});
