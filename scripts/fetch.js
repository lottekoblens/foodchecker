import { loadingState } from './ui.js';
import { showProduct } from './product-found.js';
import { productNotFound } from './product-notfound.js';

export function fetchWithBarcode(barcodeValue) {
  let barcode = barcodeValue;

  fetch('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json')
    .then((response) => response.json(), console.log(barcodeValue))
    .then((data) => {
      if (data.status_verbose === 'product not found') {
        productNotFound();
      } else {
        console.log(data);
        showProduct(data);
      }
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });
}
