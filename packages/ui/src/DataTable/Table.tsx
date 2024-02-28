import { H3, H4, ListItem, ScrollView, View, XStack, YStack, } from 'tamagui';
import TableRow from './TableRow.tsx';
import loadStyles from '../../../app/components/pack_table/packtable.style';
import { useCustomStyles } from '../styles/useCustomStyles.js';
import { formatNumber } from '../../../app/utils/formatNumber';
import { AddItem } from '../../../app/components/item/AddItem.js';
import { useState } from 'react';
import { Platform } from 'react-native';

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

  const [packOptions, setPackOptions] = useState();

  const FillOptions = () => {
    if (
      Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      window.innerWidth < 900
    ) {
      setPackOptions()
    }
  }
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
            <H3 style={{ width: '100%' }} size="$3.5" >{title}</H3>
          </XStack>
        )}

        <ListItem p={0}>
          <XStack
            ai="center"
            jc="center"
            pos="relative"
            t="$0"
            b='$0'
            l='$0'
            r='$0'
            py="$3"
          >
            <ListItem gap="$4">
              {headings?.map((header, index) => (
                <H4
                  color="$color"
                  fow="700"
                  maw={100}
                  textTransform="none"
                  ai="center"
                  jc="center"
                  textAlign="center"
                  size="$1"
                  fontWeight="600"
                  py="$1"
                >{header}</H4>
              ))}
            </ListItem>
          </XStack>
        </ListItem>



        {table?.map(([category, items], index) => (
          <>
            <ListItem style={{ width: '100%' }} backgroundColor="$borderColor" >
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
            <ListItem p={0} >
              <XStack
                gap="$4"
                style={{ width: '100%', flexDirection: 'column' }}
                ai="center"
                jc="center"
                textAlign="center"

              >

                {items.map((item, index) => {
                  // const { name, weight, quantity, unit, _id } = item;
                  return (
                    <>
                      <ListItem style={{ width: '100%' }} ai="center" jc="space-between">
                        <View>
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
                        </View>
                        <View>
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
                        </View>
                        <View>
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
                        </View>
                        <View>
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
                        >Options G.H</H4>
                        </View>
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
  );
}
