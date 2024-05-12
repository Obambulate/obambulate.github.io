console.clear();
("use strict");

const startStop = document.createElement('button');
startStop.innerHTML = ("Start/Restart");

const canvas = document.createElement('canvas');
canvas.width = "700";
canvas.height = "700";
canvas.style = "border:1px solid black";

var body = document.getElementsByTagName("body")[0];
body.appendChild(startStop);
body.appendChild(canvas);

const ctx = canvas.getContext("2d");
const ballSize = 25;
const direction = 0;
const speed = 10;
const gravity = 5;


//Sleep function
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

//draw :D
function draw(shape, x, y, size, fill, lineWidth) {
	ctx.clearRect(0, 0, 950, 950);
	ctx.beginPath();
	
	if (shape == "circle"){
		ctx.arc(x, y, size, 0, Math.PI*2);
	}	else if (shape == "square"){
			console.log("lol");
	}
	
	if (fill == 1) {
		ctx.fill();
	} else {
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
	
	
	ctx.closePath();
}

function phys(time) {

	draw("circle", 0, 0, ballSize, 0, 2);
	console.log("help", time);
}


//Calls the draw, phys, and sleep functions
async function mainLoop() {
	for (let i = 0; i <= 5; i++) {
		phys(i);
		await sleep(250);
	}
}


startStop.addEventListener("click", phys);

