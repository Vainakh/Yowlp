const { Client } = require('pg');
const faker = require('faker');

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
});

let restaurantName;
let phoneNumber;
let rating;
let category;
let images = [];
let ronalds_rating

for (let i = 0; i < 4; i++) {
    images.push(`https://loremflickr.com/640/480/food?random=${i}`);
}

for (let i = 0; i < 101; i++) {
    restaurantName = faker.company.companyName();
    phoneNumber = faker.phone.phoneNumberFormat();
    rating = Math.floor(Math.random() * 9) + 2;
    category = faker.commerce.productName();
    ronalds_rating = Math.floor(Math.random() * 5) + 1;

    const text = 'INSERT INTO REVIEW.RESTAURANT(RESTAURANT_NAME, PHONE_NUMBER, RATING, CATEGORY, PICTURES, RONALDS_RATING) VALUES($1, $2, $3, $4, $5, $6)'
    const values = [restaurantName, phoneNumber, rating, category, images, ronalds_rating];
    client.query(text, values);
}