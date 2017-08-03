/*
Code taken from clmtracker examples 
Copyright (c) 2017 Audun Mathias Øygard
https://github.com/auduno/clmtrackr/blob/master/LICENSE.txt
*/

const vid = document.getElementById('videoel');
const overlay = document.getElementById('overlay');
const vid_width = vid.width;
const vid_height = vid.height;
const overlayCC = overlay.getContext('2d');

/*********** Setup of video/webcam and checking for webGL support *********/
function gumSuccess(stream) {
  // add camera stream if getUserMedia succeeded
  if ("srcObject" in vid) {
    vid.srcObject = stream;
  } else {
    vid.src = (window.URL && window.URL.createObjectURL(stream));
  }
  vid.onloadedmetadata = function () {
    // resize overlay and video if proportions are different
    const proportion = vid.videoWidth / vid.videoHeight;
    vid_width = Math.round(vid_height * proportion);
    vid.width = vid_width;
    overlay.width = vid_width;

    vid.play();
  }
}

// set up video
navigator.mediaDevices.getUserMedia({ video: true }).then(gumSuccess).catch(console.error);

/*********** Code for face tracking *********/
const ctrack = new clm.tracker({ useWebGL: true });
ctrack.init();

function startVideo() {  
  vid.play(); // start video  
  ctrack.start(vid); // start tracking  
  drawLoop();// start loop to draw face
}

function drawLoop() {
  window.requestAnimationFrame(drawLoop);
  overlayCC.clearRect(0, 0, vid_width, vid_height);
  if (ctrack.getCurrentPosition()) {
    ctrack.draw(overlay);
  }
}
