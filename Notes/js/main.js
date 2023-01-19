import App from './App.js';

const root = document.getElementById('app');
const app = new App(root);

const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

const theme = localStorage.getItem('theme');

if (theme) {
	body.classList.add(theme);
}

themeSwitcher.addEventListener('click', () => {
	if (body.classList.contains('dark')) {
		body.classList.replace('dark', 'light');

		themeSwitcher.childNodes[1].src = 'images/moon.png';
		localStorage.setItem('theme', 'light');
	} else {
		body.classList.replace('light', 'dark');
		themeSwitcher.childNodes[1].src = 'images/sun.png';
		localStorage.setItem('theme', 'dark');
	}
});

// when user click on color-picker-button change the color of only that note title to the color of the button
const colorPicker = document.querySelectorAll('.color-picker-button');

colorPicker.forEach((element) => {
	element.addEventListener('click', () => {
		const color = element.getAttribute('data-color');
		const title = document.querySelector('.notes__title');
		title.style.color = color;
	});
});

const notification = document.getElementById('notification');
const audio = document.getElementById('notification-audio');

notification.addEventListener('click', () => {
	audio.play();
});
