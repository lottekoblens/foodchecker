import { fetchWithBarcode } from './fetch.js';
import { activateButton, loadingState } from './ui.js';
import { removeLoadingState } from './ui.js';

export const detect = async () => {
  const scanLine = document.getElementById('redLine');
  const barcodeDetector = new BarcodeDetector();
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }, // use the back camera of the phone
  });

  let itemsFound = [];
  let barcodeValue;

  const video = document.createElement('video'); // create a html element video
  video.srcObject = mediaStream; // show the mediaStream in the video element

  loadingState();
  await video.play();
  removeLoadingState();
  scanLine.classList.remove('hidden');

  const divScan = document.getElementById('scan');
  divScan.append(video); // append the video element to the element with the id scan

  const render = () => {
    barcodeDetector
      .detect(video) // the detect() returns a Promise which fulfills with an Array of detected barcodes within an image
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            barcodeValue = barcode.rawValue; // rawValue is a string decoded from the barcode data
            video.pause();
            video.remove();
            window.location.hash = barcodeValue; // put the barcodeValue in the window.location.hash
            scanLine.classList.add('hidden');
            activateButton();
          }
        });
      })
      .catch(console.error);
  };

  const renderLoop = () => {
    requestAnimationFrame(renderLoop); // call it once to kick it off, and then it keeps calling itself
    render();
  };
  renderLoop();
};

export const renderProduct = (barcodeHash) => {
  loadingState();
  fetchWithBarcode(barcodeHash); // give barcodeHash to the function fetchWithBarcode and run that function
};

// source barcode scanner: https://daily-dev-tips.com/posts/detecting-barcodes-from-the-webcam/
