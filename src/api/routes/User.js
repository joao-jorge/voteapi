const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Nuno');
    console.log('x')
});
  
module.exports = router