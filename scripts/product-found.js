const h2 = document.querySelector('h2');
const img = document.getElementById('product-image');
const h3 = document.querySelector('h3');
const p = document.querySelector('p:nth-of-type(2)');

export const showProduct = (data) => {
  h2.innerHTML = data.product.abbreviated_product_name;
  img.src = data.product.image_url;
  h3.classList.toggle('show');
  h3.innerHTML = 'Allergens:';
  p.innerHTML = data.product.allergens;
};
