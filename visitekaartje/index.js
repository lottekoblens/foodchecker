const button = document.getElementById('button-animation');
const divje = document.getElementById('hide');

button.addEventListener('click', function () {
  document.getElementById('hide').id = 'show';
  document.getElementById('first').id = 'first-hide';
});
