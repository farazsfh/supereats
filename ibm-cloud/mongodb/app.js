const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

let port = process.env.PORT || 8000;

// Import routes
const storeRoutes = require('./routes/stores')
app.use('/stores', storeRoutes)

app.get('/', (req, res) => {
    res.send('Server is connected.')
});

mongoose.connect('mongodb+srv://admin:faraz@supereats-main.ycvqe.azure.mongodb.net/<dbname>?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected!')
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});