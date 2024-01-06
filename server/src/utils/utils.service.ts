const utilsService = (() => {
  /**
   * Generates a random password of a specified length.
   *
   * @param {number} length - The length of the password. Defaults to 8 if not provided.
   * @return {string} - The randomly generated password.
   */
  function generatePassword(length = 8) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  function generateUsernameCode(email, length = 4) {
    const charset = '123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return email.split('@')[0] + retVal;
  }

  return {
    randomPasswordGenerator: generatePassword,
    randomUserNameCode: generateUsernameCode,
  };
})();

export default utilsService;
