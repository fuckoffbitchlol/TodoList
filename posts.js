const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get posts
router.get("/", async(req, res) =>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.post("/", async(req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createAt: new Date()
    });
    res.status(201).send();
});

router.delete("/:id", async(req, res) =>{
    const posts = await loadPostsCollection();
    // why we need mongodb.objectID here
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// async function getDataFromDB(){
//     const MongoClient = require('mongodb').MongoClient;
//     const uri = "mongodb+srv://woshahua:fuckoffbitch@cluster0-hxuwz.mongodb.net/test?retryWrites=true";
//     const client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//     const collection = client.db("todo").collection("todoList");
//     // perform actions on the collection object
//     return collection;
//     client.close();
//     });
// }
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://woshahua:fuckoffbitch@cluster0-hxuwz.mongodb.net/test?retryWrites=true",{
            useNewUrlParser: true
        });

        return client.db("todo").collection("todoList");
}

module.exports = router;
// mongodb+srv://woshahua:<password>@cluster0-hxuwz.mongodb.net/test?retryWrites=true