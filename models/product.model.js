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

const getProducts = async function(filter) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  // connect.close();
  return await collection.find(filter).toArray();
};

const getStatistic = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  // connect.close();
  let query = [
    { $group : {
      _id : "$type", count: {$sum:1}}
    }
  ]
  return await collection.aggregate(query);
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

const createProduct = async function(product) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  console.log("Đang thêm!");

  product.discount = parseFloat(product.discount);
  product.price = parseInt(product.price);
  product.origin = new ObjectId(product.origin);
  product.producer = new ObjectId(product.producer);
  product.type = new ObjectId(product.type);
  product.rating = parseInt(product.rating);
  (product.isDeleted = false),
    (product.isStandOut = false),
    (product.isNew = true),
    (product.rating = 0);

  console.log("product", product);
  const obID = new ObjectId();
  product._id = obID;

  return await collection.insertOne(product);
};

const updateProduct = async function(id, product) {
  console.log("Update product");
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  delete product._id;

  return await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: product },
    { upsert: true }
  );
};

const deleteProduct = async function(id) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.deleteOne({ _id: ObjectId(id) });
};

const isExistTypeInProducts = async function(idType) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  const result = await collection.findOne({ type: ObjectId(idType) });
  if (result != null) {
    return true;
  } else return false;
};

const isExistOriginInProducts = async function(idOrigin) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  const result = await collection.findOne({ origin: ObjectId(idOrigin) });
  if (result != null) {
    return true;
  } else return false;
};

const isExistProducerInProducts = async function(idOrigin) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  const result = await collection.findOne({ producer: ObjectId(idOrigin) });
  if (result != null) {
    return true;
  } else return false;
};

exports.getProducts = getProducts;
exports.getTypes = getTypes;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.isExistTypeInProducts = isExistTypeInProducts;
exports.isExistOriginInProducts = isExistOriginInProducts;
exports.isExistProducerInProducts = isExistProducerInProducts;
exports.getStatistic = getStatistic;
