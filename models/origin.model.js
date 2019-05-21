const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var assert = require("assert");
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

const createOrigin = async function(origin) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_ORIGIN);
  console.log("Object ID", new ObjectId());
  collection.insertOne({ _id: new ObjectId(), name: origin.name }, function(
    err,
    res
  ) {
    console.log("Theem that bai!", err);
    if (err) throw err;
    console.log("Theem thanh cong!");
  });
};
exports.getOrigins = getOrigins;
exports.createOrigin = createOrigin;
