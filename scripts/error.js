const submitButton = document.querySelector('input[type="button"]');
const invalidBarcode = document.getElementById('invalid_code');
const inputValue = document.getElementById('searchField');

// Search for product with the value the user puts in the input field
export const errorState = (data) => {
  submitButton.addEventListener('click', () => {
    window.location.hash = inputValue.value;
    // inputValue.value = ''
    console.log(document.getElementById('searchField').value);
    if (data.code === null || data.status_verbose === 'product not found') {
      invalidBarcode.classList.remove('hidden');
    }
  });
};
