const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const handPos = document.getElementById("handPos");

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 5
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: '#FF0000',
        lineWidth: 2
      });
    }
  }
  canvasCtx.restore();

  try {
      if ((results.multiHandLandmarks)[0][0]["x"] < 0.4 && (results.multiHandLandmarks)[0][0]["y"] < 0.4) {
        handPos.innerHTML = "↖";
        checkPos=1;
        console.log("script push_W_Key");
      }
      else if ((results.multiHandLandmarks)[0][0]["x"] < 0.4 && (results.multiHandLandmarks)[0][0]["y"] > 0.6) {
        handPos.innerHTML = "↙";
        checkPos=2;
      }
      else if ((results.multiHandLandmarks)[0][0]["x"] > 0.4 && (results.multiHandLandmarks)[0][0]["y"] < 0.4) {
        handPos.innerHTML = "↗";
        checkPos=3;
      }
      else if ((results.multiHandLandmarks)[0][0]["x"] > 0.6 && (results.multiHandLandmarks)[0][0]["y"] > 0.6) {
        handPos.innerHTML = "↘";
        checkPos=4;
      }
      else{handPos.innerHTML = "■";checkPos=0;}
  } catch {
    handPos.innerHTML = "X";
    checkPos=-1;
  }
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

export let checkPos=0;

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({
      image: videoElement
    });
  },
  width: 1280,
  height: 720
});
camera.start();
