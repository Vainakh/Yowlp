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

app.post('/nearbyCity', (request, response) => {
    response.send(nearbyCities(request.body)[0]);
})

app.get('/review/:id', (request, response) => {

    client.query(`SELECT * FROM review.restaurant WHERE ID = ${request.params.id}`, (err, res) => {

        if (err) {
            console.log(err.stack);
        } else {
            response.send(res.rows[0]);
        }
    })
});

app.post('/find', (request, response) => {
    client.query(`SELECT ID, RESTAURANT_NAME FROM review.restaurant WHERE RESTAURANT_NAME LIKE '${request.body.query}%' ORDER BY RESTAURANT_NAME::bytea LIMIT 5`, (err, res) => {

        if (err) {
            console.log(err.stack);
        } else {
            response.send(res.rows);
        }
    });
})

const port = Number(process.env.PORT || 4000);

app.listen(port, function () {
    console.log('JSON Server is running')
});