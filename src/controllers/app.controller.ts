import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../utils/dbCollection";
const appNameCollection = client.db("bloodBucket").collection("appName");

export const getAppName = async (req: Request, res: Response) => {
  const appID = {
    _id: new ObjectId("6486efba026b0452519c1896"),
  };
  const appName = await appNameCollection.findOne(appID);
  res.send(appName);
};

export const updateAppName = async (req: Request, res: Response) => {
  const name = req.body;
  const appID = {
    _id: new ObjectId("6486efba026b0452519c1896"),
  };
  const updateDoc = {
    $set: name,
  };
  const result = await appNameCollection.updateOne(appID, updateDoc);
  if (result.acknowledged) {
    res.send({ success: true, message: "Update app name successfully" });
  }
};
