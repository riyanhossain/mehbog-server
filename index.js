const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
      // console.log(result);
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
  app.get("/machinelearning", (req, res) => {
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
  //getting article id
  app.get('/article/:id', (req, res) => {
    collection.find({_id: ObjectId(req.params.id)}).toArray((err, documents) => {
      res.send(documents);
    });
  })
  //updatting comments
  app.patch('/update/:id', (req, res) => {
    collection.updateOne({_id: ObjectId(req.params.id)}, {$set: {comments: req.body[0].comments}})
    res.send('updated')
  })
  
  //myblogs
  let userMail='';
  app.post("/myblog", (req, res) => {
     userMail=req.body.email
  });


  app.get("/myblogs", (req, res) => {
    collection.find({ bloggerMail: userMail }).toArray((err, documents) => {
      res.send(documents); 
    });
  });
  //delete blog
  app.delete('/delete/:id',(req, res) =>{
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(console.log('deleted'))
  })
});

app.get("/", (req, res) => {
  res.send("mehblog server is running");
});
app.listen(process.env.PORT || 5000);
