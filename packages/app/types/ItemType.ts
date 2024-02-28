import { Types } from 'mongoose';

export type ItemType = {
  name: string;
  weight: number;
  quantity: number;
  unit: string;
  category: Types.ObjectId;
  owners: Types.ObjectId[] | [];
  packs: Types.ObjectId[] | [];
  global: boolean;
};
