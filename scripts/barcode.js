import { fetchWithBarcode } from './fetch.js';

// window.onload = () => {
//   detect();
// };

const detect = async () => {
  const barcodeDetector = new BarcodeDetector();
  let itemsFound = [];
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });

  let barcodeValue;

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  video.autoplay = true;

  document.querySelector('h2').before(video);

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
            console.log(barcodeValue);
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

document.getElementById('scan-button').addEventListener(
  'click',
  detect
  // document.querySelector('video').classList.toggle('show');
);

// https://daily-dev-tips.com/posts/detecting-barcodes-from-the-webcam/
