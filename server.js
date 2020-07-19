const bodyParser = require("body-parser");
const express = require('express');
const nearbyCities = require("nearby-cities")
const path = require('path');
const { Client } = require('pg');
const connectionString = 'postgresql://postgres:password@127.0.0.1:5432/yowlp'

const client = new Client({
    connectionString: connectionString,
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})


const app = express();

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.post('/nearbyCity', (req, res) => {
    res.send(nearbyCities(req.body)[0]);
})

const port = Number(process.env.PORT || 4000);

app.listen(port, function () {
    console.log('JSON Server is running')
});