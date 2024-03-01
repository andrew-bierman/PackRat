import { Paragraph, styled } from 'tamagui';
// import { Text } from 'react-native';
// import { Text } from 'native-base';

// const RText = styled(Paragraph, {
//   fontFamily: '$body',
// });

const RText = Paragraph;

// This is very temporary fix for issues we have with RText. Speeds up the app just using Text from react-native or native-base. If we use native-base, we can get nearly identical styling to RText, for the time being.
// export default Text;
export default RText;
