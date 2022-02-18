const h2 = document.querySelector('h2');
const img = document.getElementById('product-image');
const h3 = document.querySelector('h3');
const p = document.querySelector('p:nth-of-type(2)');

export function fetchWithBarcode(barcodeValue) {
  let barcode = barcodeValue;
  fetch('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json')
    .then((response) => response.json())
    .then((data) => {
      if (data.status_verbose === 'product not found') {
        productNotFound();
      } else {
        console.log(data);
        showProduct(data);
      }
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });
}

const showProduct = (data) => {
  h2.innerHTML = data.product.abbreviated_product_name;
  img.src = data.product.image_url;
  h3.classList.toggle('show');
  h3.innerHTML = 'Allergens:';
  p.innerHTML = data.product.allergens;
};

const productNotFound = () => {
  h2.innerHTML = 'Product is not found';
  h2.classList.toggle('h2-notfound');
  p.innerHTML =
    "Try to scan it again, if it doesn't work then the product is not known to us";
};
