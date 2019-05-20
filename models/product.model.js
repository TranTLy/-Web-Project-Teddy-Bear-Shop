const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_PRODUCTS = "products";
const COLLECTION_DISCOUNT = "discount";
const BEAR_TYPE = 1;
const BARBIE_TYPE = 2;
const CAR_TYPE = 3;
const OTHER_TYPE = 4;

const getProducts = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.find({}).toArray();
};

const getDiscount = async function(){
  const connect = await client.connect()
  const collection = client.db(DATABASE).collection(COLLECTION_DISCOUNT);

  return await collection.find({}).toArray();
}
exports.getProducts = getProducts;
exports.getDiscount = getDiscount;