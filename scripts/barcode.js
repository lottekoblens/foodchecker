import { fetchWithBarcode } from './fetch.js';
import { loadingState } from './ui.js';
import { removeLoadingState } from './ui.js';

// window.onload = () => {
//   detect();
// };

export const detect = async () => {
  document.getElementById('scan-button').disabled = true;
  const barcodeDetector = new BarcodeDetector();
  let itemsFound = [];
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });

  let barcodeValue;

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  video.play();

  document.getElementById('container-video').append(video);

  const render = () => {
    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            barcodeValue = barcode.rawValue;

            // video.remove();

            console.log(barcodeValue);
            video.pause();
            loadingState();
            setTimeout(function () {
              video.remove();
              fetchWithBarcode(barcodeValue);
              removeLoadingState();
            }, 5000);
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
