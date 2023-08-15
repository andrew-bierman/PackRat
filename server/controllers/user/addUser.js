
// export const addUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

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

//     res.status(200).json({ message: 'Successfully signed up' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };