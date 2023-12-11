import { Text, XStack } from 'tamagui';

const BodyText = ({ text, color, size, fontWeight,textAlign,textDecoration,fontFamily,fontStyle,lineHeight,letterSpacing }) => {
    const headerStyle = {
        color: color || 'black',
        fontSize: size || 24,
        fontWeight: fontWeight || 'normal',
        textAlign: textAlign || 'left',
        textDecoration: textDecoration || 'none',
        fontFamily: fontFamily || 'Arial',
        fontStyle: fontStyle || 'normal',
        lineHeight: lineHeight || 'normal',
        letterSpacing: letterSpacing || 'normal',
      };
  
  
    return (

    <XStack space="$2">
    <Text style={headerStyle} >
      {text}
    </Text>
    </XStack>
  );
};

export default BodyText;