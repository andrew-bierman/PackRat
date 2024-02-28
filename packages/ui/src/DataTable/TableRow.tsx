import { H4, ListItem, View, XStack } from 'tamagui';
// import { PackOptions } from '../PackOptions';
// import { DeletePackItemModal } from './DeletePackItemModal';
// import { EditPackItemModal } from './EditPackItemModal';
import { formatNumber } from '../../../app/utils/formatNumber';
// import { AddItem } from '../item/AddItem';
// import { IgnoreItemCheckbox } from './TableHelperComponents';

const TableRow = ({
  itemData,
}) => {
  const { name, weight, quantity, unit, _id } = itemData;

  return (
    <XStack
      gap="$2"
      $sm={{ flexDirection: 'row' }}
    >
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
      >{name}</H4>
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
      >{`${formatNumber(weight)} ${unit}`}</H4>
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
      >{quantity}</H4>
    </XStack>

  );
};

export default TableRow
