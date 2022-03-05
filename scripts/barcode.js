import { fetchWithBarcode } from './fetch.js';
import { activateButton, loadingState } from './ui.js';
import { removeLoadingState } from './ui.js';

export const detect = async () => {
  const barcodeDetector = new BarcodeDetector();
  let itemsFound = [];
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });

  let barcodeValue;

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  loadingState();
  await video.play();
  removeLoadingState();

  document.getElementById('scan').append(video);

  const render = () => {
    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            barcodeValue = barcode.rawValue;
            console.log(barcodeValue);
            video.pause();
            video.remove();
            // fetchWithBarcode(barcodeValue);
            window.location.hash = barcodeValue;
            activateButton();
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

export const renderProduct = (barcodeHash) => {
  fetchWithBarcode(barcodeHash);
  document.getElementById('product-image').scrollIntoView();
};
// https://daily-dev-tips.com/posts/detecting-barcodes-from-the-webcam/
