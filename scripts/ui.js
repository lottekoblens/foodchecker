import { detect } from './barcode.js';

const button = document.getElementById('scan-button');

export const scanButton = () => {
  button.addEventListener('click', detect);
  button.addEventListener('click', function () {
    button.disabled = true;
  });
};

export const activateButton = () => {
  button.disabled = false;
};

export const loadingState = () => {
  document.getElementById('loading').classList.add('loading-true');
};

export const removeLoadingState = () => {
  document.getElementById('loading').classList.remove('loading-true');
};
