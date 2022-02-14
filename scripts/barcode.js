window.onload = () => {
  detect();
};

async function detect() {
  const barcodeDetector = new BarcodeDetector();
  const list = document.getElementById('barcode-list');
  let itemsFound = [];
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });

  let probeer;

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  video.autoplay = true;

  list.before(video);

  function render() {
    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            const li = document.createElement('li');
            li.innerHTML = barcode.rawValue; // deze moet in de url van de fetch
            list.appendChild(li);
            probeer = barcode.rawValue;
          }
        });
      })
      .catch(console.error);
  }

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    render();
  }
  renderLoop();
}

// https://daily-dev-tips.com/posts/detecting-barcodes-from-the-webcam/
