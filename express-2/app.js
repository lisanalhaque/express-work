const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', require('./routes/api.route'));


app.listen(PORT,() => {
    console.log(`server is running at ${PORT}`);
    
});