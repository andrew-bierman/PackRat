// import { Text } from 'tamagui';

// const PRText = ({ children, style, ...props }) => {
//   return (
//     <Text style={[style]} fontFamily="$body" {...props}>
//       {children}
//     </Text>
//   );
// };

// export default PRText;

import { Paragraph, styled } from 'tamagui';
import { Text } from 'react-native';

const RText = styled(Paragraph, {
  fontFamily: '$body',
});

export default Text;
// export default RText;
