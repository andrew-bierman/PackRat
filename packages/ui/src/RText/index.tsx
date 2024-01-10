import { Paragraph, styled } from 'tamagui';
// import { Text } from 'react-native';
import { Text } from 'native-base';

const RText = styled(Paragraph, {
  fontFamily: '$body',
});

// This is very temporary fix for issues we have with RText. Speeds up the app just using Text from react-native or native-base
export default Text;
// export default RText;
