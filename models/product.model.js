const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_PRODUCTS = "products";
const COLLECTION_DISCOUNT = "discount";
const COLLECTION_TYPE = "type";
const BEAR_TYPE = 1;
const BARBIE_TYPE = 2;
const CAR_TYPE = 3;
const OTHER_TYPE = 4;

const getProducts = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  // connect.close();
  return await collection.find({}).toArray();
};

const getTypes = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_TYPE);
  // connect.close();
  return await collection.find({}).toArray();
};

const insertProduct = async function(insetProduct) {
  console.log("InsertProduct!");
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  collection.insertOne(insetProduct, function(err, res) {
    console.log("Theem that bai!", err);
    if (err) throw err;
    console.log("Theem thanh cong!");
  });
};



const updateProduct = async function(id, product) {
  console.log("Update product");
  // const products = getProducts();
  // console.log("up product",products);
  // const productbyId = products.filter((item) => item._id === id);
  // console.log("up product by id", productbyId);
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  console.log("id", new ObjectId(id));
  console.log("bf", product);
  delete product._id;
  console.log("af", product);

  collection.updateOne(
    { _id: ObjectId(id) },
    { $set: product },
    { upsert: true },
    function(err, res) {
      console.log("err", err);
      if (err) throw err;
      console.log("Update successfully");
    }
  );
};

const isExistTypeInProducts = async function(idType) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  const result =  await collection.findOne({type : ObjectId(idType)});
  if(result != null) {
    return true;
  } else return false;
};

const isExistOriginInProducts = async function(idOrigin) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  const result =  await collection.findOne({origin : ObjectId(idOrigin)});
  if(result != null) {
    return true;
  } else return false;
};

const isExistProducerInProducts = async function(idOrigin) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  const result =  await collection.findOne({producer : ObjectId(idOrigin)});
  if(result != null) {
    return true;
  } else return false;
};

exports.getProducts = getProducts;
exports.getTypes = getTypes;
exports.insertProduct = insertProduct;
exports.updateProduct = updateProduct;
exports.isExistTypeInProducts = isExistTypeInProducts;
exports.isExistOriginInProducts = isExistOriginInProducts;
exports.isExistProducerInProducts = isExistProducerInProducts;
