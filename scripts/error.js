const submitButton = document.querySelector('input[type="button"]');

// Search for product with the value the user puts in the input field
export const errorState = (data) => {
  submitButton.addEventListener('click', () => {
    window.location.hash = document.getElementById('searchField').value;
  });
};
