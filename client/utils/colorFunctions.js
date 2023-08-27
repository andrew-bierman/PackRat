/**
 * Converts a hexadecimal color code to RGB format.
 *
 * @param {string} hex - The hexadecimal color code to be converted.
 * @return {string} - The RGB color code in the format "r,g,b".
 */
function hexToRGB(hex) {
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 4) {
    r = parseInt('0x' + hex[1] + hex[1]);
    g = parseInt('0x' + hex[2] + hex[2]);
    b = parseInt('0x' + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt('0x' + hex[1] + hex[2]);
    g = parseInt('0x' + hex[3] + hex[4]);
    b = parseInt('0x' + hex[5] + hex[6]);
  }

  return `${r},${g},${b}`;
}

export function hexToRGBA(hex, alpha) {
  return `rgba(${hexToRGB(hex)},${alpha})`;
}
