export const Regex = {
  email:
    /^([a-zA-Z0-9_.-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  passwordHard: /^(?=.*\d).{8,100}$/,
  password: /^.{6,}$/,
  numberOnly: /^[0-9]+$/,
  numberWithSpace: /^[\d]*$/,
  username: /^[a-zA-Z0-9]+$/,
  name: /^[a-zA-Z]{2,}$/,
};
