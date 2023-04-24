export const oneEntity = async (val) => {
    if (!val) {
        throw new Error("Required");
    }
    return val;
};