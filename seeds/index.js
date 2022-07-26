const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randIdx = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '629e85f8b9e72af176a449ac',
            location: `${cities[randIdx].city}, ${cities[randIdx].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti quae, maiores voluptatibus blanditiis ipsum ducimus culpa magni itaque corporis eaque molestias sint sed illum veritatis quod nobis repellendus autem officia!',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randIdx].longitude, 
                    cities[randIdx].latitude
                ]
            },
            images: [ 
                { 
                    "url" : "https://res.cloudinary.com/djswz6c2q/image/upload/v1654809777/YelpCamp/vud42bo6cukovgpwu45b.jpg", 
                    "filename" : "YelpCamp/vud42bo6cukovgpwu45b"
                }, 
                { 
                    "url" : "https://res.cloudinary.com/djswz6c2q/image/upload/v1654809778/YelpCamp/ctynb2awhnxjpqmicvbd.jpg", 
                    "filename" : "YelpCamp/ctynb2awhnxjpqmicvbd"
                } 
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})