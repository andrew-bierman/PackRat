/**
 * Validates and returns the input value.
 *
 * @param {any} val - The value to be validated.
 * @throws {Error} If the value is empty or falsy.
 * @return {any} The validated value.
 */
export const oneEntity = async (val: any) => {
  if (!val) {
    throw new Error("Required");
  }
  return val;
};
