const h2 = document.querySelector('h2');
const p = document.querySelector('p:nth-of-type(2)');
const img = document.getElementById('product-image');
const h3Ingredients = document.querySelector('h3:nth-of-type(1)');
const h3Allergies = document.querySelector('h3:nth-of-type(2)');
const ulAllergies = document.querySelector('ul:nth-of-type(2)');
const ulIngredients = document.querySelector('ul:nth-of-type(1)');

export const productNotFound = () => {
  h2.innerHTML = 'Product is not found';
  h2.classList.toggle('h2-notfound');
  p.innerHTML = "Try to scan it again, if it doesn't work then the product is not known to us";
  img.src = '';
  h3Allergies = '';
  h3Ingredients = '';
  ulAllergies = '';
  ulIngredients = '';
};
