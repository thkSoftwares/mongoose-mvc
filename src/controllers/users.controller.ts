import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import client from "../utils/dbCollection";
const usersCollection = client.db("bloodBucket").collection("users");

export const getUsers = async (req: Request, res: Response) => {
  const uid = req.query.uid;
  if (uid) {
    const user = await usersCollection.find({ uid: uid }).toArray();
    res.send(user);
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  res.send(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await usersCollection.find({}).toArray();
  res.send(users);
};

// update user data using patch
export const updateUser = async (req: Request, res: Response) => {
  const data = req.body;
  const uid = req.query.uid;
  const query = { uid: uid };
  const updateDoc = {
    $set: data,
  };
  const result = await usersCollection.updateOne(query, updateDoc);
  if (result.acknowledged) {
    res.send({ success: true, message: "Update profile successfully" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  const filter = { email: body.email, uid: body.uid };
  const updateDoc = {
    $set: body,
  };
  const options = { upsert: true };
  const result = await usersCollection.updateOne(filter, updateDoc, options);
  const token = jwt.sign(
    { email: body.email, uid: body.uid },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15d" }
  );
  res.send({ result, token });
};

export const deleteUser = async (req: Request, res: Response) => {
  const email = req.query.email;
  const result = await usersCollection.deleteOne({ email: email });
  res.send(result);
};

export const findAdmin = async (req: Request, res: Response) => {
  const email = req.query.email;
  const user = await usersCollection.findOne({ email: email });
  const isAdmin = user?.role === "admin";
  res.send({ admin: isAdmin });
};

export const makeAdmin = async (req: Request, res: Response) => {
  const email = req.body.email;
  const filter = { email: email };
  const updateDoc = {
    $set: { role: "admin" },
  };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
};

export const removeAdmin = async (req: Request, res: Response) => {
  const email = req.body.email;
  const filter = { email: email };
  const updateDoc = {
    $set: { role: "user" },
  };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
};
