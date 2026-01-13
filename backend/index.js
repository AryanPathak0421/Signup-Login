const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();

require('./Models/db');


app.use(cors({
    origin: '*', // allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(bodyParser.json());






app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

if (process.env.NODE_ENV !== 'production') 
{
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}

module.exports = app;
