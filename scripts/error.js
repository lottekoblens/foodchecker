import { detect } from './barcode.js';
import { handleRoutes } from './router.js';
import { scanButton } from './ui.js';

// Search for product with the value the user puts in the input field
export const errorState = (data) => {
  const submitButton = document.querySelector('input[type="button"]');
  const invalidBarcode = document.getElementById('invalid_code');
  const inputValue = document.getElementById('searchField');
  const link = document.getElementById('again');
  const popup = document.getElementById('popup');
  submitButton.addEventListener('click', () => {
    window.location.hash = inputValue.value;
    // inputValue.value = ''
    console.log(document.getElementById('searchField').value);
    if (data.code === null || data.status_verbose === 'product not found') {
      invalidBarcode.classList.remove('hidden');
    }
  });
  link.addEventListener('click', () => {
    popup.classList.add('hidden');
    detect();
  });
};
