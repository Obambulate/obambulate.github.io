console.clear();
("use strict");

const startRestart = document.createElement('button');
startRestart.innerHTML = ("Start/Restart");

const canvas = document.createElement('canvas');
canvas.width = "700";
canvas.height = "700";
canvas.style = "border:1px solid black";

var body = document.getElementsByTagName("body")[0];
body.appendChild(startRestart);
body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let running = 0;
let start, previousTimeStamp;
const gravity = {x: 0, y: 0.5}; //Gravity == acceleration / time
const bounce = 1;
const velStart = {x: -3, y: 10};
const posStart = {x: (canvas.width/2), y: 30};

const map1 = {
	leftWall: 1,
	rightWall: 1,
	floor: 1
}

const ball1 = {
	pos: {x: 100, y: 100},
	vel: {x: velStart.x, y: velStart.y},
	size: 10,
	shape: "circle",
	fill: 1,
	colour: "black",
	lineWidth: 1,
}


function reset(obj) { 
	obj.pos.x = posStart.x;
	obj.pos.y = posStart.y;
	obj.vel.x = velStart.x;
	obj.vel.y = velStart.y;
}

function update(obj, map) {

	obj.vel.x += gravity.x;
	obj.vel.y += gravity.y;
	obj.pos.x += obj.vel.x;
	obj.pos.y += obj.vel.y;

	if (obj.pos.y + obj.size >= canvas.height) {

		obj.pos.y = (canvas.height - obj.size);
        obj.vel.y = -Math.abs(obj.vel.y) * bounce;

	}

	if (obj.pos.y - obj.size <= 0) {

		obj.pos.y = (0 + obj.size);
        obj.vel.y = Math.abs(obj.vel.y) * bounce;

	}

	if (obj.pos.x + obj.size >= canvas.width) {

		obj.pos.x = (canvas.width - obj.size);
        obj.vel.x = -Math.abs(obj.vel.x) * bounce;

	}

	if (obj.pos.x - obj.size <= 0) {

		obj.pos.x = (0 + obj.size);
        obj.vel.x = Math.abs(obj.vel.x) * bounce;

	}

	//console.log(ball1.pos.x, ball1.pos.y, ball1.vel.x, ball1.vel.y);
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
	if (start === undefined || NaN) {
	  start = timeStamp;
	}
  
	if (previousTimeStamp !== timeStamp){

		mainLoop();

	}
}

//Main loop for this program.
async function mainLoop() {
	ctx.clearRect(0, 0, 950, 950);
	update(ball1);
	draw(ball1);
	window.requestAnimationFrame(step);
}

function startStop() {

	console.log(running);

	if (running = 1){

		reset(ball1);
		console.log("reset");
		running = 0;

	} 
	
	if (running == 0) {

		mainLoop();
		running = 1;
		console.log("run");

	}

}

startRestart.addEventListener("click", startStop);
