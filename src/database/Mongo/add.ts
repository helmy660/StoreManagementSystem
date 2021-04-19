import { db } from "../mongo";

export const add = async (path: string, data: any): Promise<any> => {
  try {
    // if (!data["timestamp"]) data["timestamp"] = admin.firestore.FieldValue.serverTimestamp();
    return await db.collection(path).insertOne(data);
  } catch (error) {
    console.error(error);
    throw new Error(`error in add firestore ${path} `);
  }
};
