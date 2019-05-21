const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_PRODUCER = "producer";

const getProducers = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCER);
  return await collection.find({}).toArray();
};

const createProducer = async function(producer) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCER);
  return await collection.insertOne({
    _id: new ObjectId(),
    name: producer.name,
    isDelete: false
  });
};

const deleteProducer = async function(id) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCER);

  return await collection.deleteOne({ _id: ObjectId(id) });
};

const updateProducer = async function(id, producer) {
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCER);
  delete producer._id;

  return await collection.updateOne({ _id: ObjectId(id) }, { $set: producer }, { upsert: true });
};

exports.getProducers = getProducers;
exports.createProducer = createProducer;
exports.deleteProducer = deleteProducer;
exports.updateProducer = updateProducer;
