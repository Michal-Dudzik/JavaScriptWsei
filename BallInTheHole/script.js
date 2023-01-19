const canvas = document.querySelector('#gameSpace');
const ctx = canvas.getContext('2d');
const screen = document.querySelector('body');
const gameTime = document.querySelector('#timer');
let player = document.querySelector('#username').value;
document.addEventListener('DOMContentLoaded', () => {
	saveScore(player, time);
});

const holes = [];
const howManyHoles = 5;
let time = 0;
let gameStatus = true;

canvas.width = 800;
canvas.height = 800;

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 15,
	color: '#ff4000',
	dx: 0,
	dy: 0,
};

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.closePath();
}

function moveBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;
}

window.addEventListener('deviceorientation', handleOrientation);
function handleOrientation(event) {
	ball.dx = event.gamma / 20;
	ball.dy = event.beta / 20;
}

document.onkeydown = function (event) {
	switch (event.keyCode) {
		case 37: // left arrow
			ball.dx = -1;
			break;
		case 38: // up arrow
			ball.dy = -1;
			break;
		case 39: // right arrow
			ball.dx = 1;
			break;
		case 40: // down arrow
			ball.dy = 1;
			break;
	}
};

for (let i = 0; i < howManyHoles; i++) {
	holes.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		radius: 15,
		color: '#393e41',
	});
}

function drawHoles() {
	for (let i = 0; i < howManyHoles; i++) {
		ctx.beginPath();
		if (holes[i].x + holes[i].radius > canvas.width) {
			holes[i].x = canvas.width - holes[i].radius;
		} else if (holes[i].x - holes[i].radius < 0) {
			holes[i].x = holes[i].radius;
		}
		if (holes[i].y + holes[i].radius > canvas.height) {
			holes[i].y = canvas.height - holes[i].radius;
		} else if (holes[i].y - holes[i].radius < 0) {
			holes[i].y = holes[i].radius;
		}

		ctx.arc(holes[i].x, holes[i].y, holes[i].radius, 0, Math.PI * 2);
		ctx.fillStyle = holes[i].color;
		ctx.fill();
		ctx.closePath();
	}
}

function checkCollision() {
	for (let i = 0; i < howManyHoles; i++) {
		const hole = holes[i];
		const x = hole.x - ball.x;
		const y = hole.y - ball.y;
		const distance = Math.sqrt(x * x + y * y);
		if (distance < hole.radius + ball.radius) {
			hole.color = '#6bd425';
		}
	}

	if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
		ball.dx = -ball.dx;
	}
	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
		ball.dy = -ball.dy;
	}
}

function animate() {
	if (gameStatus === true) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawHoles();
		drawBall();
		moveBall();
		checkCollision();
		if (holes.every((hole) => hole.color === '#6bd425')) {
			gameStatus = false;
		}
		requestAnimationFrame(animate);
	} else {
		stopGame();
		return;
	}
}

function timer() {
	let timer = setInterval(function () {
		time++;
		gameTime.innerHTML = time;
	}, 1000);
}

function saveScore(player, time) {
	const scores = JSON.parse(localStorage.getItem('scores')) || [];
	scores.push({ username: player, time: time });
	localStorage.setItem('scores', JSON.stringify(scores));

	const scoreboard = document.querySelector('#scoreboard');
	scoreboard.innerHTML = '';
	scores.forEach((score) => {
		const li = document.createElement('li');
		li.innerHTML = `${score.username} - ${score.time}`;
		scoreboard.prepend(li);
	});
}

function gameStart() {
	player = document.querySelector('#username').value;
	if (player === '') {
		alert('Please enter your name!');
		return;
	}
	timer();
	animate();
}

function stopGame() {
	saveScore(player, time);
	alert(`Bravo ${player}! You won in ${time} seconds!`);
	player = '';
	time = 0;
	gameTime.innerHTML = time;
	return;
}

function reset() {
	location.reload();
}
