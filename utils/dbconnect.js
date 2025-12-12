const mongoose = require('mongoose');

const uri = process.env.MONGODB_CONNECTION_STRING;
export default async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Connection error:', error);
  }
}

