console.clear();
const body = document.getElementsByTagName("body")[0];

const canvas = document.createElement('canvas');
canvas.width = "700";
canvas.height = "700";
canvas.style = "border:1px solid black";
const ctx = canvas.getContext("2d");

const startButton = document.createElement('startButton');
const playPause = document.createElement('PlayPause');
body.appendChild(startButton);
body.appendChild(playPause);
body.appendChild(canvas);


let ball2 = {
    
    visible: true,
    size: 10,
    color: "#000000",
    pos: {x:null , y:null},
    vel: {x:null , y:null}
};


