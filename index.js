const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const uri =
  "mongodb+srv://mehrabriyan:Cr6J4QfXRe3rBPn@cluster0.f6ym0.mongodb.net/mehblog?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("mehblog").collection("blogdata");
  // perform actions on the collection object
  console.log("connected");
  //iserting data
  app.post("/blog", (req, res) => {
    const blog = req.body;
    console.log(blog);
    collection.insertOne(blog).then((result) => {
      console.log(result);
    });
  });

  //getting data
  app.get("/blogs", (req, res) => {
    collection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //getting tech data
  app.get("/tech", (req, res) => {
    collection.find({ category: "Tech" }).toArray((err, documents) => {
      res.send(documents);
    });
  });
  //getting programming data
  app.get("/programming", (req, res) => {
    collection.find({ category: "Programing" }).toArray((err, documents) => {
      res.send(documents);
    });
  });
  //getting AI data
  app.get("/ai", (req, res) => {
    collection.find({ category: "AI" }).toArray((err, documents) => {
      res.send(documents);
    });
  });
  //getting Maching Learning data
  app.get("/machinglearning", (req, res) => {
    collection.find({ category: "Maching Learning" }).toArray((err, documents) => {
      res.send(documents);
    });
  });
  //getting blockchain data
  app.get("/blockchain", (req, res) => {
    collection.find({ category: "Blockchain" }).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.get("/", (req, res) => {
  res.send("mehblog server is running");
});
app.listen(5000);