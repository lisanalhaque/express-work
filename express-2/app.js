const express = require('express');

const app = express();

const PORT = 4000;

app.use(express.json());

app.use('/api', require('./routes/api.route'));


app.listen(PORT,() => {
    console.log(`server is running at ${PORT}`);
    
});