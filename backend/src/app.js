const express = require('express');
require('dotenv').config();
const {PrismaClient} = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
}

);