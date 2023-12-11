import { Text } from 'tamagui';

const HeaderText = ({ text, color, size, fontWeight,textAlign,textDecoration,fontFamily,fontStyle,lineHeight,letterSpacing }) => {
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
    <Text style={headerStyle} >
      {text}
    </Text>
  );
};

export default HeaderText;