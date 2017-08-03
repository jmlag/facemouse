const currCoords = [];
let currDisp = [];
let avgDisp = [];
let avg_dx, avg_dy;

const robot = require("robotjs");
const screenSize = robot.getScreenSize();

function moveCursor() {
  requestAnimationFrame(moveCursor);
  const positions = ctrack.getCurrentPosition();
  if (currCoords.length === 2) currCoords.shift();
  currCoords.push([positions[62], positions[37]]);
  const prev62x = currCoords[0][0][0];
  const prev62y = currCoords[0][0][1];
  const prev37x = currCoords[0][1][0];
  const prev37y = currCoords[0][1][1];
  const curr62x = currCoords[1][0][0];
  const curr62y = currCoords[1][0][1];
  const curr37x = currCoords[1][1][0];
  const curr37y = currCoords[1][1][1];

  currDisp = [[curr62x - prev62x, curr62y - prev62y], [curr37x - prev37x, curr37y - prev37y]];

  getAvgDisp();
  reduceJitter();
  
  moveMouse();
}
/* Get average displacement */
const avg2 = (n1, n2) => (n1 + n2)/2;

function getAvgDisp() {
  avg_dx = avg2(currDisp[0][0], currDisp[1][0]);
  avg_dy = avg2(currDisp[0][1], currDisp[1][1]);
}

/* Disregard displacement under a specific amount to reduce jitter */
const avgPct = (avg, pixels, smoothness = 0.001) => {
  if (Math.abs(avg/pixels) < smoothness) return 0;
  else return (avg/pixels);
}

function reduceJitter(){
  avgDisp = [-avgPct(avg_dx, 400), avgPct(avg_dy, 300)];
  // x-coord is negative because robot uses quadrant 4 while clmtrackr uses quadrant 3
}

/* move the mouse function */ 
let mousePos; 
function moveMouse(sensitivity = 6) {
  robot.setMouseDelay(40);
  mousePos = Object.values(robot.getMousePos());
  robot.moveMouse(avgDisp[0]*screenSize.width*sensitivity + mousePos[0], avgDisp[1]*screenSize.height*sensitivity + mousePos[1]);
}

module.exports = moveCursor;
