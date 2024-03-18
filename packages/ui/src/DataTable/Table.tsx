import { flexRender } from '@tanstack/react-table';
import {
  H3,
  H4 as OriginalH4,
  ListItem,
  Paragraph,
  ScrollView,
  Separator,
  View,
  XStack as OriginalXStack,
  YStack as OriginalYStack,
} from 'tamagui';

const H4: any = OriginalH4;
const XStack: any = OriginalXStack;
const YStack: any = OriginalYStack;

export function DataTable({
  title,
  table,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: {
  title?: string;
  table?: any;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) {
  const hasAriaLabel = !!(ariaLabel || ariaLabelledBy);
  return (
    <ScrollView horizontal>
      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        f={1}
        aria-label={hasAriaLabel ? ariaLabel : 'Component Props'}
        aria-labelledby={ariaLabelledBy}
        my="$4"
        br="$4"
        ov="hidden"
        mx="$-4"
        $sm={{
          mx: 0,
        }}
      >
        {!!title && (
          <XStack ai="center" py="$2" px="$4" backgroundColor="$borderColor">
            <H3 size="$3">{title}</H3>
          </XStack>
        )}

        {table.getHeaderGroups().map((headerGroup) => (
          <ListItem key={headerGroup.id} p={0}>
            <XStack
              ai="center"
              pos="relative"
              py="$3"
              px="$4"
              $sm={{ flexDirection: 'column' } as any}
            >
              {headerGroup.headers.map((header) => (
                <View
                  onPressIn={header.getResizeHandler()}
                  onPressOut={header.getResizeHandler()}
                >
                  <H4
                    color="$color"
                    fow="700"
                    key={header.id}
                    borderWidth={1}
                    maw={100}
                    textTransform="none"
                    ai="center"
                    jc="center"
                    textAlign="center"
                    size="$4"
                    width={header.getSize()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </H4>
                </View>
              ))}
            </XStack>
          </ListItem>
        ))}
        {table.getRowModel().rows.map((row, i) => (
          <ListItem key={row.id} p={0}>
            <XStack
              ai="center"
              pos="relative"
              borderWidth={1}
              py="$3"
              px="$4"
              $sm={{ flexDirection: 'column' }}
            >
              {row.getVisibleCells().map((cell) => (
                <H4
                  color="$color"
                  fow="700"
                  key={cell.id}
                  maw={100}
                  textTransform="none"
                  ai="center"
                  jc="center"
                  textAlign="center"
                  size="$4"
                  width={200}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </H4>
              ))}
            </XStack>
          </ListItem>
        ))}
      </YStack>
    </ScrollView>
  );
}
