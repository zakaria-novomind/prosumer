
const express = require('express')
const router = express.Router();


 
router.get('/', async (req, res) =>
{

   res.sendFile(__dirname + '/html/index.html');
});



module.exports = router;