import { fetchWithBarcode } from './fetch.js';

// window.onload = () => {
//   detect();
// };

const detect = async () => {
  const barcodeDetector = new BarcodeDetector();
  const barcodeScanner = document.getElementById('barcode-element');
  let itemsFound = [];
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });

  let barcodeValue;

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  video.autoplay = true;

  barcodeScanner.before(video);

  const render = () => {
    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            barcodeValue = barcode.rawValue;
            fetchWithBarcode(barcodeValue);
            video.remove();
          }
        });
      })
      .catch(console.error);
  };

  const renderLoop = () => {
    requestAnimationFrame(renderLoop);
    // call it once to kick it off, and then it keeps calling itself
    render();
  };
  renderLoop();
};

// https://daily-dev-tips.com/posts/detecting-barcodes-from-the-webcam/
document.getElementById('scan-button').addEventListener(
  'click',
  detect
  // document.querySelector('video').classList.toggle('show');
);
