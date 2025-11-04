const express = require('express');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cookieParser = require('cookie-parser');

const { auth } = require('./auth/route');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/auth' , auth)


async function main(){
    try{
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }catch(err){
        console.log(err);
    }
}

main()
.catch((e) => {
    console.error('Error during server initialization:', e);
});

module.exports = app;