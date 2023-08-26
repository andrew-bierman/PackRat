import mongoose from 'mongoose';

const myDB = mongoose.connection.useDb('packratdb');

export default myDB;
