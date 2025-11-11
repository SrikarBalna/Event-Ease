const express = require("express");
const {PrismaClient} = require("@prisma/client");
const { prisma } = new PrismaClient();
const auth = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
auth.post('/login', async (req , res) => {
    try{
       const { email, password } = req.body;
       if (!email || !password) {
           return res.status(400).json({ error: 'Email and password are required' });
       }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res
            .cookie('token', token, { httpOnly: true , secure : true , sameSite : 'none' })
            .status(200).json({ message: 'Login successful' });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Sever Error' });
    }
})

auth.post('/signup', async (req , res) => {
    try{
        const { name , email , password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        return res.status(201).json({ message: 'User Created Successfully' , user : newUser });
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

auth.post('/logout', async (req , res) => {
    try{
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = { auth };



