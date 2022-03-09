import { showProduct } from './product-found.js';
import { errorState, stopErrorState } from './error.js';
import { disableButton, emptyContent } from './ui.js';
import { removeLoadingState } from './ui.js';

export const fetchWithBarcode = (barcodeValue) => {
  const popup = document.getElementById('popup');
  const button = document.getElementById('scan-button');
  const buttonContinue = document.getElementById('continue-button');
  const invalidBarcode = document.getElementById('invalid_code');
  const form = document.querySelector('form');
  let barcode = barcodeValue;

  const cors = 'https://world.openfoodfacts.org/';
  const endpoint = 'api/v0/product/';
  const end = '.json';
  const url = `${cors}${endpoint}${barcode}${end}`;
  // https://world.openfoodfacts.org/api/v0/product/'${barcode}.json
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status_verbose === 'product not found' || data.status_verbose === 'no code or invalid code' || data.code === null) {
        // error state if product is not found
        removeLoadingState();
        errorState(data);
        emptyContent();
        disableButton(); // disable buttons when product is not found
      } else {
        removeLoadingState();
        stopErrorState();
        showProduct(data); // show data of the product
        button.disabled = false;
        buttonContinue.disabled = false; // let user use the buttons again so the user can scan another product
        invalidBarcode.classList.add('hidden');
        form.reset();
      }
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });
};
