const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// A simple in-memory "database" to store user data
// NOTE: This data resets every time the server restarts. For a real app,
// you would use a persistent database like MongoDB or PostgreSQL.
let userData = {
    balances: {
        depositBalance: 0.00,
        totalDeposit: 0.00,
        totalWithdraw: 0.00
    },
    transactions: []
};

// API endpoint for user signup (new)
app.post('/api/signup', (req, res) => {
    // Reset data for a "new user" simulation
    const initialBonus = 85.00;
    userData.balances.depositBalance = initialBonus;
    userData.balances.totalDeposit = initialBonus;
    userData.balances.totalWithdraw = 0.00;
    userData.transactions = [];

    const bonusTransaction = {
        type: 'Deposit',
        gateway: 'Registration Bonus',
        amount: `+${initialBonus.toFixed(2)}`,
        date: new Date().toLocaleDateString(),
        details: 'Registration bonus'
    };
    userData.transactions.unshift(bonusTransaction);

    res.json({ message: 'Signup successful!', balances: userData.balances });
});

// API endpoint for deposits
app.post('/api/deposit', (req, res) => {
    const { amount, phoneNumber, gateway } = req.body;

    // Update balances
    userData.balances.depositBalance += amount;
    userData.balances.totalDeposit += amount;

    // Create a new transaction
    const newTransaction = {
        type: 'Deposit',
        gateway: gateway,
        amount: `+${amount.toFixed(2)}`,
        date: new Date().toLocaleDateString(),
        phoneNumber: phoneNumber
    };
    userData.transactions.unshift(newTransaction);

    res.json({ message: 'Deposit successful!', balances: userData.balances });
});

// API endpoint for withdrawals
app.post('/api/withdraw', (req, res) => {
    const { amount, phoneNumber, gateway } = req.body;

    if (amount > userData.balances.depositBalance) {
        return res.status(400).json({ message: 'Insufficient funds.' });
    }
   
    // Update balances
    userData.balances.depositBalance -= amount;
    userData.balances.totalWithdraw += amount;

    // Create a new transaction
    const newTransaction = {
        type: 'Withdrawal',
        gateway: gateway,
        amount: `-${amount.toFixed(2)}`,
        date: new Date().toLocaleDateString(),
        phoneNumber: phoneNumber
    };
    userData.transactions.unshift(newTransaction);

    res.json({ message: 'Withdrawal successful!', balances: userData.balances });
});

// API endpoint to get all balances
app.get('/api/balances', (req, res) => {
    res.json(userData.balances);
});

// API endpoint to get all transactions for the admin page
app.get('/api/admin/transactions', (req, res) => {
    res.json(userData.transactions);
});

// A simple array to store notifications
let notifications = [];

// Route to get notifications
app.get('/api/notifications', (req, res) => {
    res.json(notifications);
    // You can clear notifications after they are sent to the admin
    // notifications = [];
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on "https://lexuechange-1.onrender.com:${PORT}`);
});