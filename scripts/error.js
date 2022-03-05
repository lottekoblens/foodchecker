const submitButton = document.querySelector('input[type="button"]');

export const errorState = (data) => {
  submitButton.addEventListener('click', () => {
    window.location.hash = document.getElementById('searchField').value;
  });
};
