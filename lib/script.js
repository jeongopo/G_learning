import S_InGame from '../scenes/ingame.js'

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const handPos = document.getElementById("handPos");

let ingame;

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
      if ((results.multiHandLandmarks)[0][0]["x"] < 0.5 && (results.multiHandLandmarks)[0][0]["y"] < 0.5) {
        handPos.innerHTML = "↖";
        checkPos=1;
        console.log("script push_W_Key");
      }
      if ((results.multiHandLandmarks)[0][0]["x"] < 0.5 && (results.multiHandLandmarks)[0][0]["y"] > 0.5) {
        handPos.innerHTML = "↙";
        checkPos=2;
      }
      if ((results.multiHandLandmarks)[0][0]["x"] > 0.5 && (results.multiHandLandmarks)[0][0]["y"] < 0.5) {
        handPos.innerHTML = "↗";
        checkPos=3;
      }
      if ((results.multiHandLandmarks)[0][0]["x"] > 0.5 && (results.multiHandLandmarks)[0][0]["y"] > 0.5) {
        handPos.innerHTML = "↘";
        checkPos=4;
      }
  } catch {
    handPos.innerHTML = "X";
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