import { Types } from 'mongoose';

export type PackType = {
  id: Types.ObjectId;
  name: string;
  items: Types.ObjectId[];
  owner_id: Types.ObjectId;
  is_public: boolean;
  favorited_by: Types.ObjectId[];
  createdAt: NativeDate;
  owners: Types.ObjectId[] | [];
  grades: {
    weight: string;
    essentialItems: string;
    redundancyAndVersatility: string;
  };
  scores: {
    weightScore: number;
    essentialItemsScore: number;
    redundancyAndVersatilityScore: number;
  };
  type: string | 'pack';
};
