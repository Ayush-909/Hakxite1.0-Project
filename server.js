const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

let orders = [];

app.post('/api/orders', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newOrder = { id: Date.now().toString(), title, description };
    orders.push(newOrder);
    res.json(newOrder);
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
