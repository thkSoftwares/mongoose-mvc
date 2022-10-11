import colors from "colors";
import "dotenv/config";
import { app } from "./app";
import dbConnect from "./utils/dbConnect";

const port: string | number = process.env.PORT || 8000;
const startServer = async (): Promise<void> => {
  try {
    app.listen(port, () => {
      console.log(colors.yellow.bold.italic(`Server is running on port ${port}`));
      dbConnect();
    });
  } catch (error) {
    console.log(colors.red.bold.italic((`Server error: ${error}`)));
  }
};
startServer();
