
const express = require('express')
const router = express.Router();


 
router.get('/', async (req, res) =>
{



   res.send('Hello, World 3!');

//res.sendFile(path.join(__dirname, 'index.html'));
});



module.exports = router;