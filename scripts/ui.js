import { detect } from './barcode.js';

const button = document.getElementById('scan-button');
const buttonContinue = document.getElementById('continue-button');
// buttonContinue.disabled = true;

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
