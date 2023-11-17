import { Stack, styled } from 'tamagui';

const Badge = styled(Stack, {
    ai: 'center',
    jc: 'center',
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
    px: 8,
    py: 4,
    variants:{
        bold:{
            true:{
                fontWeight: 'bold'
            }
        },
        colorScheme:{
            success:{
                backgroundColor: '#16A34A'
            },
            error:{
                backgroundColor: '#DC2626'
            },
            info:{
                backgroundColor: '#0284C7'
            },
            warning:{
                backgroundColor: '#EA580C'
            },
        }
    },
})

export default Badge;
