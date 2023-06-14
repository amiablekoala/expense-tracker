const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TransactionModel = require('./models/transaction.js');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('test ok 4');
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect("mongodb+srv://athulb200430ch:mongodb_expensetracker1@cluster0.ivehwxk.mongodb.net/?retryWrites=true&w=majority");
    const { price, name, description, datetime } = req.body;
    const transaction = await TransactionModel.create({ price, name, description, datetime });
    res.json(transaction);
});

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect("mongodb+srv://athulb200430ch:mongodb_expensetracker1@cluster0.ivehwxk.mongodb.net/?retryWrites=true&w=majority");
    const transactions = await TransactionModel.find();
    res.json(transactions);
});

app.listen(4040);