import { Int32 } from "mongodb";
import { ObjectId } from "mongoose";

export interface User {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isHA: boolean;
    userID: string;
    userCategory: string;
    userCategoryRef: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: Int32;
  }