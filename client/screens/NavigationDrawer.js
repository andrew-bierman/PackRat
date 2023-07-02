// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signOut } from '../store/authStore';
// import { Text, View } from 'react-native';

// import { Desktop, Mobile, Tablet } from '../media';
// // import { Home, Feed, Trips, Packs, About, Profile, SignIn } from '../routes'; // Update with your correct import path
// import { Drawer, useNavigation } from "expo-router/drawer";

// const MutualContent = ({ isMobile }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   const handleSignOut = () => {
//     dispatch(signOut());
//   };

//   const DrawerContent = () => {
//     // const navigation = useNavigation();
//     // const { navigate } = navigation;
//     return (
//       <View>
//         {/* <Text onPress={() => navigate('Home')}>Home</Text>
//         <Text onPress={() => navigate('Feed')}>Feed</Text>
//         <Text onPress={() => navigate('Trips')}>Trips</Text>
//         <Text onPress={() => navigate('Packs')}>Packs</Text>
//         <Text onPress={() => navigate('About')}>About</Text>
//         <Text onPress={() => navigate('Profile')}>Profile</Text>
//         <Text onPress={() => navigate('SignIn')}>Sign In</Text>
//         <Text onPress={handleSignOut}>Sign Out</Text> */}
//       </View>
//     );
//   };

//   return (
//     <Drawer
//       // routes={{
//       //   // Home: Home,

//       //   Feed: Feed,
//       //   Trips: Trips,
//       //   Packs: Packs,
//       //   About: About,
//       //   Profile: Profile,
//       //   SignIn: SignIn,
//       // }}
//       initialRouteName="Home"
//       drawerContent={DrawerContent}
//     />
//   );
// };

// // export default function Navigation() {
// //   return (
// //     <View style={{ width: "100%" }}>
// //       <Desktop>
// //         <MutualContent isMobile={false} />
// //       </Desktop>
// //       <Tablet>
// //         <MutualContent isMobile={true} />
// //       </Tablet>
// //       <Mobile>
// //         <MutualContent isMobile={true} />
// //       </Mobile>
// //     </View>
// //   );
// // }
