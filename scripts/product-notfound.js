const h2 = document.querySelector('h2');
const p = document.querySelector('p:nth-of-type(2)');

export const productNotFound = () => {
  h2.innerHTML = 'Product is not found';
  h2.classList.toggle('h2-notfound');
  p.innerHTML =
    "Try to scan it again, if it doesn't work then the product is not known to us";
};
