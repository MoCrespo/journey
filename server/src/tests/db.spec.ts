import connectDB from '../config/db';
import mongoose from 'mongoose';

describe('Database Connection Test', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should connect to the correct database based on NODE_ENV', () => {
    if (process.env.NODE_ENV === 'dev') {
      expect(mongoose.connection.db.databaseName).toBe('journey');
    } else if (process.env.NODE_ENV === 'test') {
      expect(mongoose.connection.db.databaseName).toBe('test_db');
    }
  });
});
