export default {
  validateField(name) {
    return name !== '';
  },
  useSafeAreaInsets() {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  },
};
