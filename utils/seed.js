const connection = require('../config/connection');
const { Thought, User } = require('../models');
const getRandomName = require('./data');
const mongoose = require('mongoose');

console.log(getRandomName());

mongoose.connection.on('error', (err) => err);

mongoose.connection.once('open', async () => {
    let thoughtCheck = await mongoose.connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await mongoose.connection.dropCollection('thoughts');
    }

    let userCheck = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await mongoose.connection.dropCollection('users');
    }

    const users = [];

    for (let i = 0; i < 20; i++) {
        const randomName = getRandomName();
        const randomEmail = `${randomName.toLowerCase().replace(/\s/g, '')}@example.com`;

        const newUser = new User({
            username: randomName,
            email: randomEmail
        });

        users.push(newUser);
    }

    await User.insertMany(users);

    console.log('Data seeded successfully.');
    process.exit(0);
});