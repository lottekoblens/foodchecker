import { renderResultaten } from './barcode.js';
import './vendor/routie.min.js';

export const handleRoutes = () => {
  routie({
    ':id': (id) => {
      renderResultaten(id);
    },
  });
};
