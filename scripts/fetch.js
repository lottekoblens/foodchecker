const getData = async () => {
  let barcode = '3366321051983';
  //   console.log(probeer);
  fetch('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.product.abbreviated_product_name);
    })
    .catch((err) => {
      // if something goes wrong, the error is displayed in the console
      console.error(err);
    });
};

getData();
