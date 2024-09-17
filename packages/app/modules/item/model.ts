interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  ownerId: string;
  weight: number;
  quantity: number;
  unit: string;
  category: Category;
}
