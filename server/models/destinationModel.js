import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['osm', 'user'], 
    required: true
  },
  reference: {
    type: Schema.Types.ObjectId,
    refPath: 'onModel',
    required: true
  },
  onModel: {
    type: String,
    enum: ['Node', 'Way', 'User'], 
    required: true
  }
});

export const DestinationModel = myDB.model("Destination", destinationSchema);