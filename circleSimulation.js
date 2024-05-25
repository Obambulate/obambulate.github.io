console.clear();
("use strict");

const startResetButton = document.createElement('button');
startResetButton.innerHTML = ("Start/Reset");
const pauseButton = document.createElement('button');
pauseButton.innerHTML = ("Pause/Unpause");


const canvas = document.createElement('canvas');
canvas.width = "700";
canvas.height = "700";
canvas.style = "border:1px solid black";

const body = document.getElementsByTagName("body")[0];
body.appendChild(startResetButton);
body.appendChild(pauseButton);
body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let clearing = true;
let running = 0;
let doReset = 0;
let paused = 0;
let start, previousTimeStamp;
const bounce = 0.4;
const speedMultiplier = 2
let ballSize = 10;

//future map implementation//

const map1 = {
	leftWall: 1,
	rightWall: 1,
	floor: 1
}

function getRandom( min, max, limit, wholeNumber) { 

	if (wholeNumber == NaN || undefined) {wholeNumber = false};
	if (limit == NaN || undefined) {limit = 0};

	let rand = Math.random() * ((max - limit) - (min + limit)) + min;


	if (wholeNumber == true) {

		return Math.trunc(rand);

	} else {
		return rand;
	}
}


//properties of the first ball//

let ball1 = {
	maxSpeed: 	{x: 10, y: 10},
	posStart: 	{x: 0, y: 0},
	speedStart: {x: 0, y: 0},
	pos: 		{x: 0, y: 0},
	speed: 		{x: 0, y: 0},
	shape: 		"circle",
	colour: 	"black",
	fill: 		1,
	lineWidth: 	1
}

async function reset(obj) { 
	obj.pos.x = getRandom(ballSize, canvas.width, ballSize*2);
	obj.pos.y = getRandom(ballSize, canvas.width, ballSize*2);
	obj.speed.x = getRandom((-1 * obj.maxSpeed.x), obj.maxSpeed.x, 0);
	obj.speed.y = ( 10 - (Math.abs(obj.speed.x) * funtion() {(
		let number = getRandom(-1,1,0,true);
		if (number <= 0){return (-1)} else if (number >= 0) {return (1)})))} );

	console.log(getRandom(-1,1,0,true));
	console.log(obj.speed.x, " + ", obj.speed.y, " == ", Math.abs(obj.speed.x) + Math.abs(obj.speed.y));
}

function update(obj, map) {

	obj.pos.x += obj.speed.x;
	obj.pos.y += obj.speed.y;

	if (obj.pos.y + ballSize >= canvas.height) {

		obj.pos.y = (canvas.height - ballSize);
        obj.speed.y = obj.speed.y * -1;

	}

	if (obj.pos.y - ballSize <= 0) {

		obj.pos.y = (0 + ballSize);
        obj.speed.y = obj.speed.y * -1;

	}

	if (obj.pos.x + ballSize >= canvas.width) {

		obj.pos.x = (canvas.width - ballSize);
        obj.speed.x = obj.speed.x * -1;

	}

	if (obj.pos.x - ballSize <= 0) {

		obj.pos.x = (0 + ballSize);
        obj.speed.x = obj.speed.x * -1;

	}

}


//draw :D
function draw(obj) {
	ctx.beginPath();
	
	if (obj.shape == "circle"){

		ctx.arc(obj.pos.x, obj.pos.y, ballSize, 0, Math.PI*2);
	}
	else if (obj.shape == "square"){
			console.log("lol");
	}
	
	if (obj.fill == 1) {

		ctx.fillStyle = obj.colour;
		ctx.fill();

	} else {
		ctx.strokeStyle = obj.colour;
		ctx.lineWidth = obj.lineWidth;
		ctx.stroke();
	}
	
	
	ctx.closePath();
}


function step(timeStamp) {
	
	if (running == 1 && paused == 0) {
		
		if (start === undefined || NaN) {

	  		start = timeStamp;
		}
  
		if (previousTimeStamp !== timeStamp){

			mainLoop();

		}
	}
}

//Main loop for this program.
function mainLoop() {
	if (clearing == true) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	update(ball1);
	draw(ball1);
	window.requestAnimationFrame(step);
}

function startReset() {


	if (doReset == 1){

		reset(ball1);
		ctx.clearRect(0,0,950,950);
		draw(ball1);

	} if (doReset == 0) {
		
		reset(ball1);
		running = 1;
		doReset = 1;
		mainLoop();

	}

}

function pause() {

	switch (paused) {
		case paused = 0:
			paused = 1;
			running = 0;
			break;

		case paused = 1:
			paused = 0;
			running = 1;
			mainLoop();
			break;
		default:
			console.log("woops");
			console.log(running);
	}
}

startResetButton.addEventListener("click", startReset);
pauseButton.addEventListener("click", pause);