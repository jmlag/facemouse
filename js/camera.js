window.onload = function () {
  const constraintsR = {
    audio: false,
    video: true
  };

  navigator.mediaDevices.getUserMedia(constraintsR)
    .then(mediaStream => {
      const video = document.getElementById("inputVideo");
      video.srcObject = mediaStream;
      video.play();
    })
    .then(console.error);
};