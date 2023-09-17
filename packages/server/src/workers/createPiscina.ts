import path from 'path';
import Piscina from 'piscina';

/**
 * Creates a Piscina instance with the given relative path.
 *
 * @param {string} relativePath - The relative path to the file.
 * @return {Piscina} - The newly created Piscina instance.
 */
function createPiscina(relativePath) {
  return new Piscina({
    filename: path.resolve(__dirname, relativePath),
  });
}

export default createPiscina;
