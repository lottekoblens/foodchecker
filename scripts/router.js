import { renderProduct } from './barcode.js';
import { scanButton } from './ui.js';
import './vendor/routie.min.js';

export const handleRoutes = () => {
  routie({
    ':id': (id) => {
      renderProduct(id);
    },
  });
};
