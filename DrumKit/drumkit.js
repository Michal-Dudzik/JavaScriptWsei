document.addEventListener('keypress', onKeyPress);

let records = [];
let isRecording = false;
let record = [];

class Sound {
	constructor(key) {
		this.key = key;
		this.timestamp = Date.now();
	}
}

function onKeyPress(event) {
	const key = event.key;
	let sound = '';
	switch (key) {
		case 'd':
			sound = 'boom';
			document.querySelector('#d').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#d').classList.remove('keyPressed');
			}, 100);
			break;
		case 'k':
			sound = 'tom';
			document.querySelector('#k').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#k').classList.remove('keyPressed');
			}, 100);
			break;
		case 's':
			sound = 'hihat';
			document.querySelector('#s').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#s').classList.remove('keyPressed');
			}, 100);
			break;
		case 'f':
			sound = 'kick';
			document.querySelector('#f').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#f').classList.remove('keyPressed');
			}, 100);
			break;
		case 'g':
			sound = 'openhat';
			document.querySelector('#g').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#g').classList.remove('keyPressed');
			}, 100);
			break;
		case 'a':
			sound = 'ride';
			document.querySelector('#a').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#a').classList.remove('keyPressed');
			}, 100);
			break;
		case 'j':
			sound = 'snare';
			document.querySelector('#j').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#j').classList.remove('keyPressed');
			}, 100);
			break;
		case 'h':
			sound = 'tink';
			document.querySelector('#h').classList.add('keyPressed');
			setTimeout(() => {
				document.querySelector('#h').classList.remove('keyPressed');
			}, 100);
			break;
		default:
			sound = 'default';
			break;
	}
	if (isRecording) record.push(new Sound(sound));
	playSound(sound);
}

function playSound(sound) {
	const audioTag = document.querySelector(`#${sound}`);
	audioTag.currentTime = 0;
	audioTag.play();
}

function playRecord(record) {
	record.forEach((sound) => {
		setTimeout(() => {
			playSound(sound.key);
		}, sound.timestamp - record[0].timestamp);
	});
}

function showRecords() {
	const recordsList = document.querySelector('.records');
	recordsList.innerHTML = '';
	records.forEach((record, index) => {
		const li = document.createElement('li');
		li.classList.add('records');
		li.textContent = `Record ${index + 1}`;
		li.addEventListener('click', () => {
			if (isRecording) {
				alert("You can't play while recording");
			} else {
				playRecord(record);
			}
		});
		recordsList.appendChild(li);
	});
}

const itsRecording = document.querySelector('#record');
itsRecording.addEventListener('change', () => {
	if (itsRecording.checked) isRecording = true;
	else {
		isRecording = false;
		records.push(record);
		record = [];
		showRecords();
	}
});
