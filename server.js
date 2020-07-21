process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const pg = require('pg');
const bodyParser = require("body-parser");
const express = require('express');
const nearbyCities = require("nearby-cities")
const path = require('path');
// const { Client } = require('pg');
const connectionString = 'postgresql://postgres:password@127.0.0.1:5432/yowlp'

// const client = new Client({
//     connectionString: connectionString,
// })

var client = new pg.Client({
    user: "ygxcaytdyjreia",
    password: "147b031debaa3d6a179f90f439529bdeffe05eb3997f203b39cab285916142a1",
    database: "d8prlgjqpncmr",
    port: 5432,
    host: "ec2-18-233-137-77.compute-1.amazonaws.com",
    ssl: true
}); 

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

app.get('/review', (request, response) => {
    response.redirect('https://yowlp.herokuapp.com/');
})

const port = Number(process.env.PORT || 4000);

app.listen(port, function () {
    console.log('JSON Server is running')
});