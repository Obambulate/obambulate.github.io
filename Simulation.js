console.clear();
let DevTools = true;
let frame = 0;
let lastTime;
let showFPS = false;
let start; 
let previousTimeStamp;
let pause = false;

// Definitions And Variables:

let clones = [];
let iteration;

let ballOriginal = {
    visible		: true,
    shape		: "circle",
    color		: "#000000",
    strokeWidth	: 1,
    fill		: 1,
    size		: 10,
    pos			: {x:null , y:null},
    vel			: {x:null , y:null}
};

// Define Elements

const body = document.getElementById("mainBody");


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const cloneButton = document.getElementById("cloneButton");
const numberOfClones = document.getElementById("cloneInput");
const speedInput = document.getElementById("speedInput");

// Developer Tools

function DeveloperTools(){}

// The Meat And Potatoes:

function getRandom( min, max, wholeNumber) { 
	if (typeof wholeNumber === 'undefined' || isNaN(wholeNumber)) {wholeNumber = false}; //error checking

	let rand = Math.random() * ((max - min) + min);

	if (wholeNumber == true) {
		return Math.trunc(rand);
	} else {
		return rand;
	}
}

function setClones (numberOfClones, ) {
    let speed = speedInput.value;
	let offset;
	let i = 0; clones = [];
	if (numberOfClones.value > numberOfClones.max){numberOfClones.value = numberOfClones.max;}
	while (i < numberOfClones){
		clone = structuredClone(ballOriginal); 
		clone.pos.x = getRandom(clone.size/2, canvas.width - clone.size/2, undefined, 1); 
		clone.pos.y = getRandom(clone.size/2, canvas.height - clone.size/2, undefined, 1);
		offset = getRandom(-1, 1)
		clone.vel.x = offset*speed;
		if(clone.vel.x>0){
			clone.vel.y = (offset - 1)*speed;
		} else {
			clone.vel.y = (clone.vel.x + 1)*speed;
		}
		//console.log(i);
		console.log("offset:"+offset, clone.vel.x/speed, clone.vel.y/speed, (clone.vel.x/speed)-(clone.vel.y/speed));
		console.log(clone.vel.x, clone.vel.y);
		clones.push(clone); i++;}
	}

function draw(input) {
    ctx.clearRect(0,0,canvas.width,canvas.height);

	let iteration = 0
	if (input.length !== NaN || 'undefined' || 0) {
		while (iteration < input.length) {
			ctx.beginPath();
			if (input[iteration].shape == "circle"){
			ctx.arc(input[iteration].pos.x, input[iteration].pos.y, input[iteration].size, 0, Math.PI*2);
			}
			else if (input[iteration].shape == "square"){
				console.log("lol");
			}

			if (input[iteration].fill == 1) {		
				ctx.fillStyle = input[iteration].color;
				ctx.fill();		
			} else {
				ctx.strokeStyle = input[iteration].colour;
				ctx.lineWidth = input[iteration].strokeWidth;
				ctx.stroke();
			}
			iteration++;
			ctx.closePath();
		}
	} else {
		ctx.beginPath();
		if (input.shape == "circle"){		
			ctx.arc(input.pos.x, input.pos.y, input.size, 0, Math.PI*2);
		}
		else if (input.shape == "square"){
				console.log("lol");
		}
		if (input.fill == 1) {		
			ctx.fillStyle = input.color;
			ctx.fill();		
		} else {
			ctx.strokeStyle = input.color;
			ctx.lineWidth = input.strokeWidth;
			ctx.stroke();
		}
		ctx.closePath();
	}

	ctx.closePath();
}

function phys(input) {
	let iteration = 0;
	if (input.length !== NaN || 'undefined' || 0) {
		while (iteration < input.length) {
			//console.log('now calculating:', iteration);
			input[iteration].pos.x += input[iteration].vel.x;
			input[iteration].pos.y += input[iteration].vel.y;
			
			if (input[iteration].pos.y + input[iteration].size >= canvas.height) {
		
				input[iteration].pos.y = (canvas.height - input[iteration].size);
				input[iteration].vel.y = input[iteration].vel.y * -1;
		
			}
		
			if (input[iteration].pos.y - input[iteration].size <= 0) {
		
				input[iteration].pos.y = (0 + input[iteration].size);
				input[iteration].vel.y = input[iteration].vel.y * -1;
		
			}
		
			if (input[iteration].pos.x + input[iteration].size >= canvas.width) {
		
				input[iteration].pos.x = (canvas.width - input[iteration].size);
				input[iteration].vel.x = input[iteration].vel.x * -1;
		
			}
		
			if (input[iteration].pos.x - input[iteration].size <= 0) {
		
				input[iteration].pos.x = (0 + input[iteration].size);
				input[iteration].vel.x = input[iteration].vel.x * -1;
		
			}
			iteration++;
		} 
	}
}

fpsCounter: {

	if (showFPS){FPS};
	function FPS(timestamp){
		console.log(Math.trunc(1/((Math.round(timestamp) - lastTime) * 0.001)));
		lastTime = timestamp;
		if (showFPS){requestAnimationFrame(FPS)}
	}

}

function step(timestamp) {
    if (start === undefined) {start = timestamp;}
    const dTime = timestamp - start;
    
    //console.log(frame+"frame(s)", Math.trunc(dTime)+"ms"); 

	// Add Code Here:
	phys(clones);
	draw(clones);


    //if (frame >= 100) {console.log("frame100");return;}


    

    //frame++;
    requestAnimationFrame(step);
  }


startButton.addEventListener("mouseup", function (e){if(1==1) {console.log("start"); step();}});
restartButton.addEventListener("mouseup", function (e){});
pauseButton.addEventListener("mouseup", function (e){});
cloneButton.addEventListener("mouseup", function (e){setClones(numberOfClones.value)});
