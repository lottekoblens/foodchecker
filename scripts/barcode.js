import { fetchWithBarcode } from './fetch.js';

window.onload = () => {
  detect();
};

async function detect() {
  const barcodeDetector = new BarcodeDetector();
  const barcodeScanner = document.getElementById('barcode-list');
  let itemsFound = [];
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });

  let barcodeValue;

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  video.autoplay = true;

  barcodeScanner.before(video);

  function render() {
    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            // const li = document.createElement('li');
            // li.innerHTML = barcode.rawValue; // deze moet in de url van de fetch
            // list.appendChild(li);
            barcodeValue = barcode.rawValue;
            fetchWithBarcode(barcodeValue);
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
