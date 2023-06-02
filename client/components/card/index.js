import React, { useState } from "react";
import {
  VStack,
  Box,
  Divider,
  Link,
  IconButton,
  Text,
  Toast,
} from "native-base";
import { StyleSheet, TouchableOpacity, Clipboard } from "react-native";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const CustomCard = ({ title, content, footer, link, type, destination }) => {


  console.log('kshjdjkashdkjashd', type)
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    Clipboard.setString(link);

    setIsCopied(true);

    const resetCopyStateTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    Toast.show({
      title: "Link copied to clipboard",
      placement: "bottom",
      duration: 2000,
    });

    return () => clearTimeout(resetCopyStateTimeout);
  };

  if(type === 'pack'){
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
       <VStack space="4" width="100%" divider={<Divider />}>
         <Box
           px="4"
           pt="4"
           flexDirection="row"
           justifyContent="space-between"
           alignItems="center"
         >
           <Box>
             <Text
               fontSize="xl"
               fontWeight="bold"
               color={theme.colors.textPrimary}
             >
               {title}
             </Text>
           </Box>
           {link && (
             <Box>
               {isCopied ? (
                 <MaterialCommunityIcons
                   name="check"
                   size={24}
                   color="green"
                   onPress={handleCopyLink}
                 />
               ) : (
                 <MaterialCommunityIcons
                   name="link"
                   size={24}
                   color="black"
                   onPress={handleCopyLink}
                 />
               )}
             </Box>
           )}
         </Box>
         <Box
           px="4"
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
  }


  if(type === 'trip'){
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
       <VStack space="4" width="100%" divider={<Divider />}>
         <Box
           px="4"
           pt="4"
           flexDirection="row"
           justifyContent="space-between"
           alignItems="center"
         >
           <Box>
             <Text
               fontSize="xl"
               fontWeight="bold"
               color={theme.colors.textPrimary}
             >
               {title}
             </Text>
           </Box>
           {link && (
             <Box>
               {isCopied ? (
                 <MaterialCommunityIcons
                   name="check"
                   size={24}
                   color="green"
                   onPress={handleCopyLink}
                 />
               ) : (
                 <MaterialCommunityIcons
                   name="link"
                   size={24}
                   color="black"
                   onPress={handleCopyLink}
                 />
               )}
             </Box>
           )}
         </Box>
         <Box
           px="4"
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
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.card,
    flex: 1,
    gap: 45,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    border: "1",
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
