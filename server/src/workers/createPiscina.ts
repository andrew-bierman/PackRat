import path from "path";
import Piscina from "piscina";

function createPiscina(relativePath) {
  return new Piscina({
    filename: path.resolve(__dirname, relativePath),
  });
}

export default createPiscina;
