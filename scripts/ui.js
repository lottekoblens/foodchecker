import { detect } from './barcode.js';

const button = document.getElementById('scan-button');
const buttonContinue = document.getElementById('continue-button');
const h2 = document.querySelector('h2');
const img = document.getElementById('product-image');
const h3Ingredients = document.querySelector('h3:nth-of-type(1)');
const h3Allergies = document.querySelector('h3:nth-of-type(2)');
const ulAllergies = document.querySelector('ul:nth-of-type(2)');
const ulIngredients = document.querySelector('ul:nth-of-type(1)');

export const scanButton = () => {
  button.addEventListener('click', detect);
  buttonContinue.addEventListener('click', detect);
  button.addEventListener('click', function () {
    button.disabled = true;
    buttonContinue.disabled = true;
    document.getElementById('scan').scrollIntoView();
  });
  buttonContinue.addEventListener('click', function () {
    buttonContinue.disabled = true;
    button.disabled = true;
    document.getElementById('scan').scrollIntoView();
  });
};

export const activateButton = () => {
  buttonContinue.disabled = false;
  button.disabled = false;
};

export const loadingState = () => {
  document.getElementById('loading').classList.add('loading-true');
};

export const removeLoadingState = () => {
  document.getElementById('loading').classList.remove('loading-true');
};

export const emptyContent = () => {
  h2.innerHTML = '';
  img.src = '';
  h3Allergies.innerHTML = '';
  h3Ingredients.innerHTML = '';
  ulAllergies.innerHTML = '';
  ulIngredients.innerHTML = '';
};
