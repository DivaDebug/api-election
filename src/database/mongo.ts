import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    mongoose.set('transactionAsyncLocalStorage', true);

    const connection = await mongoose.connect(process.env.MONGO_URI!);

    console.log(`MongoDB connected: ${connection.connection.host}:${connection.connection.port}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);

    process.exit(1);
  }
};

const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect();

    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB:', error);
  }
};

export {connectMongoDB, disconnectMongoDB};
