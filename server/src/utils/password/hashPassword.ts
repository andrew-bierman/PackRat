import bcrypt from 'bcryptjs';

async function generateHashedPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const password = process.argv[2];

if (!password) {
  console.error('Please provide a password as a command-line argument.');
  process.exit(1);
}

generateHashedPassword(password)
  .then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
  })
  .catch((error) => {
    console.error('Error generating hashed password:', error);
    process.exit(1);
  });