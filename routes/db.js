require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function connectToDB() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("inventory")
    const result = await db.collection('box')
    console.log('Connected to MongoDB');
}


module.exports = connectToDB;