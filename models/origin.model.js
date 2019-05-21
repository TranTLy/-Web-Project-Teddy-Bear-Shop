const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_ORIGIN = "origins";

const getOrigins = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_ORIGIN);
  return await collection.find({}).toArray();
};

const createOrigin = async function(origin) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_ORIGIN);
  return await collection.insertOne({
    _id: new ObjectId(),
    name: origin.name,
    isDelete: false
  });
};

const deleteOrigin = async function(id) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_ORIGIN);

  return await collection.deleteOne({ _id: ObjectId(id) });
};

const updateOrigin = async function(id, origin) {
  const collection = client.db(DATABASE).collection(COLLECTION_ORIGIN);
  delete origin._id;

  return await collection.updateOne({ _id: ObjectId(id) }, { $set: origin }, { upsert: true });
};

exports.getOrigins = getOrigins;
exports.createOrigin = createOrigin;
exports.deleteOrigin = deleteOrigin;
exports.updateOrigin = updateOrigin;
