import { showProduct } from './product-found.js';
import { errorState } from './error.js';
import { emptyContent } from './ui.js';
import { removeLoadingState } from './ui.js';

const popup = document.getElementById('popup');
const button = document.getElementById('scan-button');
const buttonContinue = document.getElementById('continue-button');
const scanLine = document.getElementById('redLine');

export const fetchWithBarcode = (barcodeValue) => {
  let barcode = barcodeValue;

  fetch(`https://world.openfoodfacts.org/api/v0/product/'${barcode}.json`)
    .then((response) => response.json(), console.log(barcodeValue))
    .then((data) => {
      scanLine.classList.add('hidden');
      if (data.status_verbose === 'product not found' || data.status_verbose === 'no code or invalid code') {
        // error state if product is not found
        removeLoadingState();
        errorState(data);
        // start errorState
        emptyContent();
        popup.classList.remove('hidden');
        // show popup so the user can search on a barcode
        button.disabled = true;
        buttonContinue.disabled = true;
        // disable buttons when product is not found
      } else {
        console.log(data);
        removeLoadingState();
        popup.classList.add('hidden');
        showProduct(data);
        // show data of the product
        button.disabled = false;
        buttonContinue.disabled = false;
        // let user use the buttons again so the user can scan another product
      }
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });
};
