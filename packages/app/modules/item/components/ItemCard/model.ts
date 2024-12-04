export interface Item {
  id: string;
  name: string;
  category: {
    name: string;
  };
  sku: string;
  seller: string;
  weight: number;
  unit: string;
  description: string;
  productUrl?: string;
  images?: Array<{ url }>;
}

export interface ItemCardProps {
  item: Item;
  onAddPackPress?: (itemId: string, e: any) => void;
}
