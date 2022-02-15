export function fetchWithBarcode(barcodeValue) {
  // let barcode = '3366321051983';
  let barcode = barcodeValue;
  fetch('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showProduct(data);
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });

  const showProduct = (data) => {
    const h2 = document.querySelector('h2');
    h2.innerHTML = data.product.abbreviated_product_name;
    const img = document.getElementById('product-image');
    img.src = data.product.image_url;
  };
}
