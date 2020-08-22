const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

let port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Server is connected.')
});

app.post('/stores/add', (req, res) => {
    const 
});

app.post('/orders/add')

mongoose.connect('mongodb+srv://admin:<password>@cluster0.nevls.mongodb.net/<dbname>?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected!')
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});