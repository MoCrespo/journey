import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const NODE_ENV = process.env.NODE_ENV;

const connectDB = async () => {
  if (NODE_ENV === 'dev') {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'journey',
    });
    console.log('MongoDB Connected');
  }

  if (NODE_ENV === 'test') {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'test_db',
    });
    console.log('Test MongoDB Connected');
  }
};

export default connectDB;
