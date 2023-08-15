export const oneEntity = async (val: any) => {
  if (!val) {
    throw new Error("Required");
  }
  return val;
};
