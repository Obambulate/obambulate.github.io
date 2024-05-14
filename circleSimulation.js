console.clear();
("use strict");

const startResetButton = document.createElement('button');
startResetButton.innerHTML = ("Start");
const pauseButton = document.createElement('button');
pauseButton.innerHTML = ("Pause/Unpause");


const canvas = document.createElement('canvas');
canvas.width = "700";
canvas.height = "700";
canvas.style = "border:1px solid black";

var body = document.getElementsByTagName("body")[0];
body.appendChild(startResetButton);
body.appendChild(pauseButton);
body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let running = 0;
let start, previousTimeStamp;
const bounce = 0.4;
const speedStart = {x: 5.43252354234, y: 10};
const speedMultiplier = 2
const posStart = {x: (canvas.width/2), y: 10};

//future map implementation//

const map1 = {
	leftWall: 1,
	rightWall: 1,
	floor: 1
}

//properties of the first ball//

const ball1 = {
	pos: {x: 100, y: 100},
	speed: {x: speedStart.x * speedMultiplier, y: speedStart.y * speedMultiplier},
	size: 10,
	shape: "circle",
	fill: 1,
	colour: "black",
	lineWidth: 1,
}

function reset(obj) { 
	obj.pos.x = posStart.x;
	obj.pos.y = posStart.y;
	obj.speed.x = speedStart.x;
	obj.speed.y = speedStart.y;
}

function update(obj, map) {

	obj.pos.x += obj.speed.x;
	obj.pos.y += obj.speed.y;

	if (obj.pos.y + obj.size >= canvas.height) {

		obj.pos.y = (canvas.height - obj.size);
        obj.speed.y = obj.speed.y * -1;

	}

	if (obj.pos.y - obj.size <= 0) {

		obj.pos.y = (0 + obj.size);
        obj.speed.y = obj.speed.y * -1;

	}

	if (obj.pos.x + obj.size >= canvas.width) {

		obj.pos.x = (canvas.width - obj.size);
        obj.speed.x = obj.speed.x * -1;

	}

	if (obj.pos.x - obj.size <= 0) {

		obj.pos.x = (0 + obj.size);
        obj.speed.x = obj.speed.x * -1;

	}

	//console.log(ball1.pos.x, ball1.pos.y, ball1.speed.x, ball1.speed.y);

}


//draw :D
function draw(obj) {
	ctx.beginPath();
	
	if (obj.shape == "circle"){

		ctx.arc(obj.pos.x, obj.pos.y, obj.size, 0, Math.PI*2);
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
	
	if (running == 1) {
		
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
	ctx.clearRect(0, 0, 950, 950);
	update(ball1);
	draw(ball1);
	window.requestAnimationFrame(step);
}

async function startReset() {

	console.log(running);

	if (running == 1){

		running = 0;
		reset(ball1);
		running = 1;

		console.log("reset");

	} else if (running == 0) {
		
		running = 1;
		mainLoop();
		
		console.log("run");

	}

}

function pause() {

	switch (running) {
		case running = 1:
			running = 0;
			console.log("reset");
			break;

		case running = 0:
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