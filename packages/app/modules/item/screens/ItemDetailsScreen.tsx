// import { View } from 'react-native';
// import React from 'react';
// import useTheme from 'app/hooks/useTheme';
// import useCustomStyles from 'app/hooks/useCustomStyles';
// import { useItem, useItemId, useItemImages } from 'app/modules/item';
// import { usePagination } from 'app/hooks/common';
// import { RH3, RImage, RScrollView, RStack, RText, XStack } from '@packrat/ui';
// import useResponsive from 'app/hooks/useResponsive';
// import { CustomCard } from 'app/components/card';
// import LargeCard from 'app/components/card/LargeCard';
// import { FeedPreview } from 'app/modules/feed';
// import { convertWeight } from 'app/utils/convertWeight';
// import { SMALLEST_ITEM_UNIT } from '../constants';

// export function ItemDetailsScreen() {
//   // const { limit, handleLimitChange, page, handlePageChange } = usePagination();
//   const [itemId] = useItemId();
//   const { data: item, isError } = useItem(itemId);
//   const styles = useCustomStyles(loadStyles);
//   const { currentTheme } = useTheme();
//   const {data: itemImages, isError: isImagesError} = useItemImages(itemId);

//   console.log('itemImages', itemImages);

//   return (
//     <RScrollView style={{ marginBottom: 50 }}>
//       <RStack style={styles.mainContainer}>
//         {!isError && item && (
//           <View style={{ padding: 10, width: '100%' }}>
//             <CustomCard
//               data={item}
//               title={item?.name}
//               content={
//                 <XStack gap="$4">
//                   <RImage
//                     src={itemImages?.[0]?.url || "https://via.placeholder.com/150"}
//                     width={150}
//                     height={150}
//                   />
//                   {item?.name && (
//                     <RStack>
//                       <RText>Category: {item?.category?.name || '-'}</RText>
//                       <RText>
//                         Weight:{' '}
//                         {convertWeight(
//                           Number(item?.weight),
//                           SMALLEST_ITEM_UNIT,
//                           item?.unit as any,
//                         )}
//                         {item?.unit}
//                       </RText>
//                       <RText>Quantity: {item?.quantity}</RText>
//                     </RStack>
//                   )}
//                 </XStack>
//               }
//               type="item"
//             />
//             <LargeCard
//               customStyle={{
//                 width: '80%',
//                 backgroundColor: currentTheme.colors.secondaryBlue,
//                 paddingBottom: 24,
//                 paddingTop: 0,
//               }}
//             >
//               <RH3
//                 style={{
//                   color: currentTheme.colors.text,
//                   fontSize: 24,
//                   alignSelf: 'center',
//                   marginBottom: 20,
//                 }}
//               >
//                 Similar Items
//               </RH3>
//               <FeedPreview feedType="similarItems" id={itemId} />
//             </LargeCard>
//           </View>
//         )}
//       </RStack>
//     </RScrollView>
//   );
// }

// const loadStyles = (theme) => {
//   const { currentTheme } = theme;
//   const { xxs, xs } = useResponsive();

//   return {
//     mainContainer: {
//       backgroundColor: currentTheme.colors.background,
//       flexDirection: 'column',
//       flex: 1,
//       padding: 10,
//       alignItems: 'center',
//     },
//     button: {
//       color: currentTheme.colors.white,
//       display: 'flex',
//       alignItems: 'center',
//       textAlign: 'center',
//     },
//     container: {
//       backgroundColor: currentTheme.colors.card,
//       flexDirection: xs || xxs ? 'column' : 'row',
//       gap: xs || xxs ? 4 : 0,
//       justifyContent: 'space-between',
//       width: '100%',
//       padding: 30,
//       borderRadius: 10,
//     },
//     sortContainer: {
//       width: xxs ? '100%' : xs ? '100%' : '20%',
//       justifyContent: 'space-between',
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//   };
// };

import React from 'react';
import { RScrollView, RStack } from '@packrat/ui';
import { ItemDetailsSection } from '../components/ItemDetailsSection';
import { Platform } from 'react-native';
import { ItemDetailsSectionNative } from '../components/ItemDetailsSectionNative';
import useTheme from 'app/hooks/useTheme';

export function ItemDetailsScreen() {
  const { currentTheme } = useTheme();
  return (
    <RScrollView
      style={{
        marginBottom: 40,
        flex: 1,
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <RStack style={{ padding: 10, width: '100%', paddingBottom: 50 }}>
        {Platform.OS === 'web' ? (
          <ItemDetailsSection />
        ) : (
          <ItemDetailsSectionNative />
        )}
      </RStack>
    </RScrollView>
  );
}
