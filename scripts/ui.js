import { detect } from './barcode.js';

export function scanButton() {
  document.getElementById('scan-button').addEventListener('click', detect);
}

export function loadingState() {
  document.getElementById('loading').classList.add('loading-true');
}
