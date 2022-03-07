import { showProduct } from './product-found.js';
import { errorState } from './error.js';
import { emptyContent } from './ui.js';
const popup = document.getElementById('popup');
const button = document.getElementById('scan-button');
const buttonContinue = document.getElementById('continue-button');

export const fetchWithBarcode = (barcodeValue) => {
  let barcode = barcodeValue;

  fetch(`https://world.openfoodfacts.org/api/v0/product/'${barcode}.json`)
    .then((response) => response.json(), console.log(barcodeValue))
    .then((data) => {
      if (data.status_verbose === 'product not found' || data.status_verbose === 'no code or invalid code') {
        errorState(data);
        emptyContent();
        popup.classList.remove('hidden');
        button.disabled = true;
        buttonContinue.disabled = true;
      } else {
        console.log(data);
        popup.classList.add('hidden');
        showProduct(data);
        button.disabled = false;
        buttonContinue.disabled = false;
      }
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });
};
