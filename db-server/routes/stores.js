const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

router.post('/', (req, res) => {
    console.log(req);
});

module.exports = router;
