import colors from "colors";
import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URI || "";
const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(colors.green.italic(`Database connection is successful 🛢`));
  } catch (error) {
    console.log(colors.italic.red((`Database connection error: ${error}`)));
  }
};
export default dbConnect;
