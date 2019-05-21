const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_TYPE = "type";

const getTypes = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_TYPE);
  return await collection.find({}).toArray();
};

const createType = async function(type) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_TYPE);

  const obID = new ObjectId();
  type._id = obID;
  
  return await collection.insertOne(type)
};

const deleteType = async function(id) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_TYPE);

  return await collection.deleteOne({ _id: ObjectId(id) });
};

const updateType = async function(id, type) {
  console.log("Update type");
  const collection = client.db(DATABASE).collection(COLLECTION_TYPE);
  delete type._id;

  return await collection.updateOne({ _id: ObjectId(id) }, { $set: type }, { upsert: true });
};

exports.getTypes = getTypes;
exports.createType = createType;
exports.deleteType = deleteType;
exports.updateType = updateType;
