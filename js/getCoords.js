function getCoords() {
    requestAnimationFrame(getCoords);
    const positions = ctrack.getCurrentPosition();
    console.log([positions[62], positions[37]]);
}

getCoords();