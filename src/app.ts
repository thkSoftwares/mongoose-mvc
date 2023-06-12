import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
const app: Application = express();
import path from 'path';

/* middleware  */
app.use(cors());
app.use(express.json());

/* here will be all the imports routes */
import { default as userRouter } from "./routes/v1/users.route";
import { default as appRouter } from "./routes/v1/app.route";

/* here will be the all the routes */
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

/* Here is the User Routes */
app.use("/api/v1/", userRouter);
app.use("/api/v1/", appRouter);

/* Server Error Routes */
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
    status: 404,
  });
});
export { app };
