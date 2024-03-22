import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: 'journey',
  });
  console.log('MongoDB Connected');
};

export default connectDB;
