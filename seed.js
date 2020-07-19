const { Client } = require('pg');
const faker = require('faker');

const connectionString = 'postgresql://vainakh:password@127.0.0.1:5432/yowlp'

const client = new Client({
    connectionString: connectionString,
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});

let restaurantName;
let phoneNumber;
let rating;
let category;
let images = [];
let randomImageLength = Math.floor(Math.random() * 10) + 6;

for (let i = 0; i < randomImageLength; i++) {
    images.push(faker.image.food());
}

for (let i = 0; i < 101; i++) {
    restaurantName = faker.company.companyName();
    phoneNumber = faker.phone.phoneNumberFormat();
    rating = Math.floor(Math.random() * 10) + 1;
    category = faker.commerce.productName();

    const text = 'INSERT INTO REVIEW.RESTAURANT(RESTAURANT_NAME, PHONE_NUMBER, RATING, CATEGORY, PICTURE) VALUES($1, $2, $3, $4, $5)'
    const values = [restaurantName, phoneNumber, rating, category, images];
    client.query(text, values);
}