const robot = require("robotjs");
const screenSize = robot.getScreenSize();
const settings = require("electron-settings");
const path = require("path");
const { userSettings } = require(path.resolve("./app/js/settings"));

const currCoords = [];
let currDisp = [];
let avgDisp = [];
let avg_dx, avg_dy;

function generateWatch(setting, callback){
  settings.watch(setting, callback);
}

function updateSettings(){
  for (let setting in userSettings){
    generateWatch(setting, newValue => userSettings[setting] = newValue);
  }
}

function moveCursor() {
  requestAnimationFrame(moveCursor);
  const positions = ctrack.getCurrentPosition();
  if (currCoords.length === 2) currCoords.shift();
  if (positions){
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
    updateSettings();
    moveMouse(...Object.values(userSettings));
  }

}
/* Get average displacement */
const avg2 = (n1, n2) => (n1 + n2)/2;

function getAvgDisp() {
  avg_dx = avg2(currDisp[0][0], currDisp[1][0]);
  avg_dy = avg2(currDisp[0][1], currDisp[1][1]);
}

/* Disregard displacement under a specific amount to reduce jitter */
const avgPct = (avg, pixels, jitterReduction) => {
  return Math.abs(avg/pixels) < jitterReduction ? 0 : avg/pixels
}

function reduceJitter(jitterReduction){
  avgDisp = [-avgPct(avg_dx, 400, jitterReduction), avgPct(avg_dy, 300, jitterReduction)];
  // x-coord is negative because robot uses quadrant 4 while clmtrackr uses quadrant 3
}

/* move the mouse function 
- sensitivty controls how much the mouse moves relative to displacement of tracked points
- delay controls cursor delay in milliseconds
- jitterReduction is a value from 0 to 1, disregards displacement under a certain amount  
*/ 
function moveMouse(sensitivity = 6, delay = 0, jitterReduction = 0.0012) {
  reduceJitter(jitterReduction);
  robot.setMouseDelay(delay);
  let mousePos = Object.values(robot.getMousePos());
  robot.moveMouse(avgDisp[0]*screenSize.width*sensitivity + mousePos[0], avgDisp[1]*screenSize.height*sensitivity + mousePos[1]);
}


module.exports = moveCursor;
