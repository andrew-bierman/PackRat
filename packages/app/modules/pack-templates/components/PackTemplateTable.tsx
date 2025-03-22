import { View } from '@packrat/ui';
import { BasicTable } from '@packrat/ui/src/Bento/elements/tables';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  ItemCategoryEnum,
  type Item,
  useItemWeightUnit,
} from 'app/modules/item';
import { convertWeight } from 'app/utils/convertWeight';
import {
  TotalWeightBox,
  WeightUnitDropdown,
} from 'app/modules/pack/components/PackTable/TableHelperComponents';

export const PackTemplateTable = ({ items }: { items: Item[] }) => {
  const [weightUnit, setWeightUnit] = useItemWeightUnit();

  const columnHelper = createColumnHelper<Item>();
  const columns: ColumnDef<Item, any>[] = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: () => 'Name',
    }),
    columnHelper.accessor('weight', {
      cell: (info) => info.getValue(),
      header: () => 'Weight',
    }),
    columnHelper.accessor('quantity', {
      header: () => 'Quantity',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('category.name', {
      header: () => 'Category',
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroup = table.getHeaderGroups()[0];
  const tableRows = table.getRowModel().rows;
  const footerGroup = table.getFooterGroups()[0];

  if (!headerGroup) {
    return null;
  }

  let totalBaseWeight = 0;
  let totalFoodWeight = 0;
  let totalWaterWeight = 0;

  items.forEach((item) => {
    const categoryName = item.category.name;
    const itemWeight = item.weight;
    const itemQuantity = item.quantity;
    const itemUnit = item.unit;
    switch (categoryName) {
      case ItemCategoryEnum.ESSENTIALS: {
        totalBaseWeight += convertWeight(
          itemWeight * itemQuantity,
          itemUnit as any,
          weightUnit,
        );
        break;
      }
      case ItemCategoryEnum.FOOD: {
        totalFoodWeight += convertWeight(
          itemWeight * itemQuantity,
          itemUnit as any,
          weightUnit,
        );
        break;
      }
      case ItemCategoryEnum.WATER: {
        totalWaterWeight += convertWeight(
          itemWeight * itemQuantity,
          itemUnit as any,
          weightUnit,
        );
        break;
      }
    }
  });

  const totalWeight = totalBaseWeight + totalWaterWeight + totalFoodWeight;

  return (
    <View>
      <BasicTable
        headerGroup={headerGroup}
        tableRows={tableRows}
        footerGroup={footerGroup}
        columnsLength={columns.length}
      />
      <View my="$5">
        <TotalWeightBox
          label="Base Weight"
          weight={totalBaseWeight}
          unit={weightUnit}
        />
        <TotalWeightBox
          label="Water + Food Weight"
          weight={totalWaterWeight + totalFoodWeight}
          unit={weightUnit}
        />
        <TotalWeightBox
          label="Total Weight"
          weight={totalWeight}
          unit={weightUnit}
        />
      </View>
      <WeightUnitDropdown
        value={weightUnit}
        onChange={setWeightUnit as (value: string) => void}
      />
    </View>
  );
};
