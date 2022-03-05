import { showProduct } from './product-found.js';
import { errorState } from './error.js';
const popup = document.getElementById('popup');
const h2 = document.querySelector('h2');
const img = document.getElementById('product-image');
const h3Ingredients = document.querySelector('h3:nth-of-type(1)');
const h3Allergies = document.querySelector('h3:nth-of-type(2)');
const ulAllergies = document.querySelector('ul:nth-of-type(2)');
const ulIngredients = document.querySelector('ul:nth-of-type(1)');
const button = document.getElementById('scan-button');
const buttonContinue = document.getElementById('continue-button');

export const fetchWithBarcode = (barcodeValue) => {
  let barcode = barcodeValue;

  fetch(`https://world.openfoodfacts.org/api/v0/product/'${barcode}.json`)
    .then((response) => response.json(), console.log(barcodeValue))
    .then((data) => {
      if (data.status_verbose === 'product not found' || data.status_verbose === 'no code or invalid code') {
        errorState(data);
        h2.innerHTML = '';
        img.src = '';
        h3Allergies.innerHTML = '';
        h3Ingredients.innerHTML = '';
        ulAllergies.innerHTML = '';
        ulIngredients.innerHTML = '';
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
