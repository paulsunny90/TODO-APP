const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "todoapp";
const COLLECTION = "todos";

const client = new MongoClient(MONGO_URI);
let dbInstance = null;

async function connect() {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(DB_NAME);
    console.log("MongoDB Connected");
  }
  return dbInstance;
}

function isValidId(id) {
  return ObjectId.isValid(id);
}

async function createOne(doc) {
  const db = await connect();
  const res = await db.collection(COLLECTION).insertOne({
    ...doc,
    status: "pending",
    createdAt: new Date()
  });
  return res.insertedId;
}

async function findAll() {
  const db = await connect();
  return db.collection(COLLECTION).find({}).toArray();
}

async function findById(id) {
  if (!isValidId(id)) throw new Error("Invalid ID");
  const db = await connect();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function updateById(id, updatePayload) {
  if (!isValidId(id)) throw new Error("Invalid ID");
  const db = await connect();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: updatePayload }
  );
}

async function deleteById(id) {
  if (!isValidId(id)) throw new Error("Invalid ID");
  const db = await connect();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

async function close() {
  await client.close();
  dbInstance = null;
}

module.exports = {
  connect,
  createOne,
  findAll,
  findById,
  updateById,
  deleteById,
  close,
  isValidId
};
