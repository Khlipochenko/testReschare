import mongoose from 'mongoose';
import { faker } from "@faker-js/faker";
import { connect } from './connect.js'
import { dummyUser } from '../models/UserDummy.js'

const seedUsers = async () => {
    try {
        await connect()

        const userIds = [];
        for (let i = 0; i < 5; i++) {
            const newDummyUser = new dummyUser({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: 'dummyPassword',
            });
            await newDummyUser.save();
            userIds.push(newDummyUser._id);
            console.log(`User ${newDummyUser.username} added with ID: ${newDummyUser._id}`);
        }


        console.log('Dummy user IDs:', userIds);


    } catch (error) {
        console.error('Error creating dummy users:', error);
    }
};

seedUsers();