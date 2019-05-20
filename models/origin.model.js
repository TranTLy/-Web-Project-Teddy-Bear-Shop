const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_ORIGIN = "origin";

const getOrigins = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_ORIGIN);
  return await collection.find({}).toArray();
};
exports.getOrigins = getOrigins;
