import {
  H3,
  H4,
  ListItem,
  ScrollView,
  View,
  XStack,
  YStack,
} from 'tamagui';
import TableRow from './TableRow.tsx';
import loadStyles from '../../../app/components/pack_table/packtable.style';
import { useCustomStyles } from '../styles/useCustomStyles.js';
import { formatNumber } from '../../../app/utils/formatNumber';
import { AddItem } from '../../../app/components/item/AddItem.js';


interface DataTableProps {
  title?: string;
  table?: any;
  headings?: Array,
}

export function DataTable({
  title,
  table,
  headings,
}: DataTableProps) {


  return (
    <ScrollView horizontal>
      <YStack
        gap="$2"
        borderWidth={1}
        borderColor="$borderColor"
        f={1}
        my="$4"
        br="$4"
        ov="hidden"
        mx="$-4"
        $sm={{
          mx: 0,
        }}
      >
        {!!title && (
          <XStack style={{ width: '100%' }} ai="center" py="$2" px="$4" backgroundColor="$borderColor">
            <H3 style={{ width: '100%' }} size="$3">{title}</H3>
          </XStack>
        )}

        <ListItem p={0}>
          <XStack
            // ai="center"
            // pos="relative"
            py="$3"
            // px="$4"
            $sm={{ flexDirection: 'row' }}
          >
            <ListItem gap="$4">
              {headings?.map((header, index) => (
                <H4
                  color="$color"
                  fow="700"
                  // borderWidth={1}
                  maw={100}
                  textTransform="none"
                  ai="center"
                  jc="center"
                  textAlign="center"
                  size="$1"
                  py="$1"
                >{header}</H4>
              ))}
            </ListItem>
          </XStack>
        </ListItem>



        {table?.map(([category, items], index) => (
          <>
            <ListItem style={{ width: '100%' }} backgroundColor="$borderColor">
              <H3
                style={{ width: '100%' }}
                py="$1"
                backgroundColor="$borderColor"
                maw={100}
                textTransform="none"
                ai="center"
                jc="center"
                size="$2"
              >{category}</H3>
            </ListItem>
            <ListItem p={0}>
              <XStack
                gap="$4"
                $sm={{ flexDirection: 'column' }}
                style={{width : '100%'}} 
              >

                {items.map((item, index) => {
                  // const { name, weight, quantity, unit, _id } = item;
                  return (
                    <>
                      {/* <TableRow itemData={item} /> */}
                      <ListItem style={{width : '100%'}} >
                        <H4
                          color="$color"
                          fow="700"
                          maw={100}
                          textTransform="none"
                          ai="center"
                          jc="center"
                          textAlign="center"
                          size="$1"
                          py="$1"
                        >{item.name}</H4>
                        <H4
                          color="$color"
                          fow="700"
                          maw={100}
                          textTransform="none"
                          ai="center"
                          jc="center"
                          textAlign="center"
                          size="$1"
                          py="$1"
                        >{`${formatNumber(item.weight)} ${item.unit}`}</H4>
                        <H4
                          color="$color"
                          fow="700"
                          maw={100}
                          textTransform="none"
                          ai="center"
                          jc="center"
                          textAlign="center"
                          size="$1"
                          py="$1"
                        >{item.quantity}</H4>
                        <H4
                          color="$color"
                          fow="700"
                          maw={100}
                          textTransform="none"
                          ai="center"
                          jc="center"
                          textAlign="center"
                          size="$1"
                          py="$1"
                        >{item.name}</H4>
                      </ListItem>
                    </>
                  )
                })}

              </XStack>
            </ListItem>
          </>
        ))}
      </YStack>
    </ScrollView>











    // <ScrollView horizontal>
    //   <YStack
    //     borderWidth={1}
    //     borderColor="$borderColor"
    //     f={1}
    //     aria-label={hasAriaLabel ? ariaLabel : 'Component Props'}
    //     aria-labelledby={ariaLabelledBy}
    //     my="$4"
    //     br="$4"
    //     ov="hidden"
    //     mx="$-4"
    //     $sm={{
    //       mx: 0,
    //     }}
    //   >
    //     {!!title && (
    //       <XStack ai="center" py="$2" px="$4" backgroundColor="$borderColor">
    //         <H3 size="$3">{title}</H3>
    //       </XStack>
    //     )}


    //     <ListItem p={0}>
    //       <XStack
    //         ai="center"
    //         pos="relative"
    //         py="$3"
    //         px="$4"
    //         $sm={{ flexDirection: 'row' }}
    //       >
    //         {headings?.map((item) => {
    //           return (
    //             <>
    //               <H4
    //                 color="$color"
    //                 fow="700"
    //                 borderWidth={1}
    //                 maw={100}
    //                 textTransform="none"
    //                 ai="center"
    //                 jc="center"
    //                 textAlign="center"
    //                 size="$1"
    //                 py="$1"
    //               >
    //                 {
    //                   item
    //                 }
    //               </H4>
    //             </>
    //           )
    //         })}
    //       </XStack>
    //     </ListItem>


    //     <ListItem p={0}>
    //       <XStack
    //         ai="center"
    //         pos="relative"
    //         // borderWidth={1}
    //         py="$3"
    //         px="$4"
    //         $sm={{ flexDirection: 'column' }}
    //       >
    //         {
    //           // table.map((items) => {
    //           //   return (
    //           //     <>
    //           //       <XStack ai="center" py="$2" px="$4" backgroundColor="$borderColor">
    //           //         <H3 size="$3">{items.category.name}</H3>
    //           //       </XStack>
    //           //     </>
    //           //   )
    //           // })

    //         }



    //         {/* <XStack ai="center" py="$2" px="$4" backgroundColor="$borderColor">
    //           <H3 size="$3">{title}</H3>
    //         </XStack> */}
    //       </XStack>
    //     </ListItem>

    //     {/* {table.getHeaderGroups().map((headerGroup) => (
    //       <ListItem key={headerGroup.id} p={0}>
    //         <XStack
    //           ai="center"
    //           pos="relative"
    //           py="$3"
    //           px="$4"
    //           $sm={{ flexDirection: 'column' }}
    //         >
    //           {headerGroup.headers.map((header) => (
    //             <View
    //               onPressIn={header.getResizeHandler()}
    //               onPressOut={header.getResizeHandler()}
    //             >
    //               <H4
    //                 color="$color"
    //                 fow="700"
    //                 key={header.id}
    //                 borderWidth={1}
    //                 maw={100}
    //                 textTransform="none"
    //                 ai="center"
    //                 jc="center"
    //                 textAlign="center"
    //                 size="$4"
    //                 width={header.getSize()}
    //               >
    //                 {flexRender(
    //                   header.column.columnDef.header,
    //                   header.getContext(),
    //                 )}
    //               </H4>
    //             </View>
    //           ))}
    //         </XStack>
    //       </ListItem>
    //     ))}
    //     {table.getRowModel().rows.map((row, i) => (
    //       <ListItem key={row.id} p={0}>
    //         <XStack
    //           ai="center"
    //           pos="relative"
    //           borderWidth={1}
    //           py="$3"
    //           px="$4"
    //           $sm={{ flexDirection: 'column' }}
    //         >
    //           {row.getVisibleCells().map((cell) => (
    //             <H4
    //               color="$color"
    //               fow="700"
    //               key={cell.id}
    //               maw={100}
    //               textTransform="none"
    //               ai="center"
    //               jc="center"
    //               textAlign="center"
    //               size="$4"
    //               width={200}
    //             >
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </H4>
    //           ))}
    //         </XStack>
    //       </ListItem>
    //     ))} */}
    //   </YStack>
    // </ScrollView>
  );
}
