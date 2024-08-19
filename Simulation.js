console.clear();
const body = document.getElementsByTagName("body")[0];

const canvas = document.createElement('canvas');
canvas.width = "700";
canvas.height = "700";
canvas.style = "border:1px solid black";
const ctx = canvas.getContext("2d");

const startButton = document.createElement('button');
startButton.innerHTML = ("Start");
const restartButton = document.createElement('button');
restartButton.innerHTML = ("Restart");
const playPause = document.createElement('button');
playPause.innerHTML = ("Pause/Unpause");

const numberOfClonesSlider = document.createElement("input");
numberOfClonesSlider.type = "range";
numberOfClonesSlider.min = "1";
numberOfClonesSlider.max = "100";
numberOfClonesSlider.step = "1";
numberOfClonesSlider.value = "1";
let numberOfClones = numberOfClonesSlider.value;

const cloneNumber = document.createElement('div');
cloneNumber.innerHTML = numberOfClones;

const addClones = document.createElement('button');
addClones.innerHTML = "Add Clones";

body.appendChild(startButton);
body.appendChild(restartButton);
body.appendChild(playPause);
body.appendChild(canvas);
body.appendChild(numberOfClonesSlider);
body.appendChild(cloneNumber);
body.appendChild(addClones);

let clones = [];
let iteration;

let ballOriginal = {
    visible: true,
    size: 10,
    shape: "circle",
    color: "#00cba0",
    fill: 1,
    strokeWidth: 1,
    pos: {x:40 , y:40},
    vel: {x:null , y:null}
};



function draw(obj) {
	ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);

	let iteration = 0
	if (obj.length != NaN || undefined || 0) {
		while (iteration < obj.length) {
			if (obj[iteration].shape == "circle"){
			ctx.arc(obj[iteration].pos.x, obj[iteration].pos.y, obj[iteration].size, 0, Math.PI*2);
			}
			else if (obj[iteration].shape == "square"){
				console.log("lol");
			}

			if (obj[iteration].fill == 1) {		
				ctx.fillStyle = obj[iteration].color;
				ctx.fill();		
			} else {
				ctx.strokeStyle = obj[iteration].colour;
				ctx.lineWidth = obj[iteration].strokeWidth;
				ctx.stroke();
			}
			iteration++;
		}
	} else {
		if (obj.shape == "circle"){		
			ctx.arc(obj.pos.x, obj.pos.y, obj.size, 0, Math.PI*2);
		}
		else if (obj.shape == "square"){
				console.log("lol");
		}
		if (obj.fill == 1) {		
			ctx.fillStyle = obj.color;
			ctx.fill();		
		} else {
			ctx.strokeStyle = obj.color;
			ctx.lineWidth = obj.strokeWidth;
			ctx.stroke();
		}
	}

	ctx.closePath();
}


numberOfClonesSlider.addEventListener("input", function (e) {numberOfClones = (numberOfClonesSlider.value); cloneNumber.innerHTML = numberOfClonesSlider.value;});
startButton.addEventListener("mouseup",   function (e){draw(clones)});
restartButton.addEventListener("mouseup", function (e){});
addClones.addEventListener("mouseup", 	function (e){let i = 0; clones = [];
	while (i < numberOfClones){
		const clone = structuredClone(ballOriginal); 
		clone.pos.x += (clones.length*20); 
		clones.push(clone); i++;}});
playPause.addEventListener("mouseup",   function (e){});
