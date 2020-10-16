const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const rollbar = require('./util/rollbarAccessToken');
const connectionString = require('./util/mongodbConnectionString');

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('PowerAppsLogger')
    const flowsCollection = db.collection('flows');

    app.get('/logrun', (req, res) => {

    let date = new Date();

    let flow = {
        solution: "Test",
        name: "Click a button to email a note",
        owner: "Denzil Doyle",
        timestamp: date,
        description: "Click a button to send a note by email.",
        created: "Oct 8, 02:37 PM",
        Modified: "Oct 15, 01:20 PM",
        Type: "Instant",
        isSuccessful: true,
    }

    flowsCollection.insertOne(flow)
        .then(result => {
            rollbar.log("Email Flow Ran");
            // console.log(result)
            res.sendStatus(200)
        })
        .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))


app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.send('Hello World')
})