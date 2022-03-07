const submitButton = document.querySelector('input[type="button"]');
const invalidBarcode = document.getElementById('invalid_code');

// Search for product with the value the user puts in the input field
export const errorState = (data) => {
  submitButton.addEventListener('click', () => {
    window.location.hash = document.getElementById('searchField').value;
    if (data.code === null || data.status_verbose === 'product not found') {
      invalidBarcode.classList.remove('hidden');
      console.log('test');
    }
  });
};
