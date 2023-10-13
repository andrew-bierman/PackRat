// export const addUser = async (c) => {
//   try {
//     const { email, password } = c.req.json();

//     // Create user in Firebase Auth
//     const userRecord = await firebase.auth().createUser({
//       email: email,
//       password: password,
//     });
//     const uid = userRecord.uid;

//     // Create user in MongoDB and link to Firebase Auth UID
//     const newUser = new User({
//       email: email,
//       firebaseUid: uid, // <-- Store Firebase UID in MongoDB
//       // ... other user fields
//     });
//     await newUser.save();

//     c.status(200).json({ message: 'Successfully signed up' });
//   } catch (error) {
//     c.status(400).json({ error: error.message });
//   }
// };
