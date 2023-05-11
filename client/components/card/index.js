import React from 'react';
import { VStack, Box, Divider, Link, IconButton, Text } from 'native-base';
import { StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CustomCard = ({ title, content, footer, link }) => {
    const handleCopyLink = () => {
        Clipboard.setString(link);
    };

    return (
        <Box
            style={styles.mainContainer}
            alignSelf="center"
            alignItems={["center", "center", "flex-start", "flex-start"]}
            w={["100%", "100%", "100%", "90%"]}
            direction={["column", "column", "row", "row"]}
            rounded="lg"
            flexGrow={1}
        >
            <VStack space="4" width='100%' divider={<Divider />}>
                <Box px="4" pt="4" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" color={theme.colors.textPrimary}>
                            {title}
                        </Text>
                    </Box>
                    {link && (
                        <Box>
                            <MaterialCommunityIcons
                                name="link"
                                size={24}
                                color="black"
                                onPress={handleCopyLink}
                            />
                        </Box>
                    )}
                </Box>
                <Box px="4"
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {content}
                </Box>
                <Box px="4" pb="4">
                    {footer}
                </Box>
            </VStack>
        </Box>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: theme.colors.card,
        flex: 1,
        gap: 45,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        border: '1',
    },
    containerMobile: {
        backgroundColor: theme.colors.card,
        flex: 1,
        gap: 45,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
});
