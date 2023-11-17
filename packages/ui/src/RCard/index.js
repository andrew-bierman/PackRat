import { Card, Stack, XStack, styled, Text, withStaticProperties } from 'tamagui';

export const CustomCard_frame = styled(Stack, {
    padding: 15,
    borderRadius: 5,
    variants:{
        landing_page:{
            true:{
                marginBottom: 10,
                width: '100%',
            }
        }
    }
});

export const CustomCard_header = styled(XStack, {
    alignItems:'center',
    justifyContent:'space-between',
    px: 20,
    py: 10,
})

export const CustomCard_text = styled(Text, {
    fos:16,
    px: 20,
    py: 10,
})

export const CustomCard = withStaticProperties(CustomCard_frame, {
    Header: CustomCard_header,
    Text:CustomCard_text,
})

export default Card;

