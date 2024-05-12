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

const gravity = {x: 0, y: 0.1}; //Gravity == acceleration / time

//Ballss

const ball1 = {
	pos: {x: canvas.width/2, y: 0},
	vel: {x: 0, y: 0},
	size: 10,
	shape: "circle",
	fill: 0,
	colour: "black",
	lineWidth: 1,
}

function reset(obj) { 
	obj.pos.y = obj.vel.y = obj.vel.x = 0 
}

function update(obj) {
	
	
	
	
	
	obj.vel.x += gravity.x;
	obj.vel.y += gravity.y;
	obj.pos.x += obj.vel.x;
	obj.pos.y += obj.vel.y;
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



//Main loop for this program.
async function mainLoop() {
	ctx.clearRect(0, 0, 950, 950);
	update(ball1);
	draw(ball1);
	requestAnimationFrame(mainLoop);
}


startRestart.addEventListener("click", mainLoop /*&& reset(ball1)*/);

