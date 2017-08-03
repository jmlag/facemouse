const currCoords = [];
let currDisp = [];
let avgDisp = [];

function getCoords() {
  requestAnimationFrame(getCoords);
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

  const avg2 = (n1, n2) => (n1 + n2)/2;
  const avg_dx = avg2(currDisp[0][0], currDisp[1][0]);
  const avg_dy = avg2(currDisp[0][1], currDisp[1][1]);

  avgDisp = [avg_dx, avg_dy]
  console.log(avgDisp);
}

getCoords();
