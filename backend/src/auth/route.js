const express = require('express');

const auth = express.Route();

const bcrypt = require('bcrypt');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const { prisma } = require('../db/dbConfig');


auth.post('/login' , async (req , res) => {
    try{
        const { email , password } = req.body;
        if (!email || !password){
            return res.status(400).json({
                "error" : "Email and Password are required"
            })
        }

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if (!user){
            return res.status(404).json({
                "error" : "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password , user.hashedPassword);

        if (!isPasswordValid){
            return res.status(401).json({
                "error" : "Invalid Password"
            })
        }

        const token = jwt.sign({ id : user.id} , process.env.JWT_SECRET , { expiresIn : '1h'});

        return res.status(200).cookie('token' , token , {
            httpOnly : true,
            secure : true ,
            sameSite : 'none' ,
            maxAge : 3600000
        }).json({
            "message" : "Login Successful",
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
})


auth.post('/signup' , async (req , res) => {
    try{
        const { name , email , password } = req.body;
        if (!name || !email || !password){
            return res.status(400).json({
                "error" : "Name , Email and Password are required"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                hashedPassword
            }
        })

        return res.status(201).json({
            "message" : "User created successfully",
            "user" : newUser
        })
    }catch(err){
        console.log(err);
        if (err.code === 'P2002'){
            return res.status(409).json({
                "error" : "Email already exists"
            })
        }
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
})

auth.get('/logout' , (req , res) => {
    return res.status(200).cookie('token' , '' , {
        httpOnly : true,
        secure : true ,
        sameSite : 'none' ,
        expiresIn : new Date(Date.now())
    }).json({
        "message" : "Logout Successful"
    })
});