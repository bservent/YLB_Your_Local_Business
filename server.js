const express = require('express');
const app = express();
const PORT = 4666;


app.get('/', (req, res) => {
    res.send('<h1> THIS IS HOME </h1>');
})


app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`);
})