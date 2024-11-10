const container = document.querySelector('.isplaying-anim')
container.addEventListener('click', () => {
  container.firstElementChild.classList.toggle('one')
})

/* const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath()
ctx.moveTo(canvas.width / 2, 0)
ctx.quadraticCurveTo(0, 20, 0, 20)
//ctx.closePath()
ctx.stroke()
*/

/* const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const source = audioCtx.createMediaElementSource(audio)
source.connect(analyser);
analyser.connect(audioCtx.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);

  const barWidth = canvas.width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 4;
    const freqHeight = canvas.height
    const yZero = canvas.height - barHeight;
    
    ctx.beginPath()
    
   // ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
    //ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 2;
  }
  requestAnimationFrame(draw);
}

audio.onplay = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
};

audio.onpause = () => {
    audioCtx.stop();
};

*/