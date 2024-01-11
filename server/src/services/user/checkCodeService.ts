import User from '../../models/userModel';

export async function checkCodeService({ email, code }: any) {
  return await User.find({
    $and: [{ email: email.toLowerCase() }, { code }],
  });
}
