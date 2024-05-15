import { Types } from 'mongoose';

export type TripType = {
  name: string;
  description: string;
  duration: string;
  weather: string;
  start_date: Date;
  end_date: Date;
  destination: string;
  geojson: Types.ObjectId[];
  owner_id: Types.ObjectId;
  packs: Types.ObjectId;
  is_public: boolean;
  type: string | 'trip';
};

export enum TripActivity {
  HIKING = 'hiking',
  RUNNING = 'running',
}
