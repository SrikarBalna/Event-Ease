const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { prisma } = require('../prisma/prismaConfig');
const { auth } = require("../src/auth/auth")


const app = express();

app.use(cors({
    origin : 'https://event-ease-19lu.vercel.app/',
    credentials : true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth)


// app.get('/login', async (req , res) => {
//     try{
//         return res.status(200).json({ message: 'Login route' });
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// app.get('/signup', async (req , res) => {
//     try{
//         return res.status(200).json({ message: 'Signup route' });
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// app.get('/logout', async (req , res) => {
//     try{
//         return res.status(200).json({ message: 'Logout route' });
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }})
// app.get('/hi' , (req , res) => {
//     return res.send('Hello World!');
// })


async function main(){
    try{
        await prisma.$connect();
        console.log("Connected to the database successfully");
        app.listen(process.env.PORT , () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }catch(err){
        console.log("Connection failed to the database" , err);
    }
}

main()
.finally(async () => {
    await prisma.$disconnect();
});