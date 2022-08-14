const {
  MongoClient
} = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);

// client.connect(function(err) {
//
//   console.log("connected successfully to server");
//
// });

async function run() {
  try {
    const database = client.db("insertDB");
    const foods = database.collection("foods");
    // create an array of documents to insert
    const docs = [
      { name: "cake", healthy: false },
      { name: "lettuce", healthy: true },
      { name: "donut", healthy: false }
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await foods.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
