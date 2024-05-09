import mongoose from "mongoose";

const connectDb = async (MONGO_DB) => {
  try {
    const conn = await mongoose.connect(MONGO_DB);
    console.log(`Database connected: ${conn.connection.host}\n`.blue.underline);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDb;
