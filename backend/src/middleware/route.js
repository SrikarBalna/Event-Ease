const express = require("express");

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        
        if (!user){
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { authMiddleware };