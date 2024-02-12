import express from "express";
import Account from "../models/accounts.model"
import authMiddleware from "../middleware";

const router = express.Router();

router.get('/balance', authMiddleware, showBalance);

// function that gets the balance of an user

async function showBalance(req, res){
    try{
        const account = await Account.findOne({userId: req.userId});
        res.send(200).json({balance: account.balance});

    } catch(error){
        res.send(403).json({error: error});
    }
    
}

module.exports = router;
