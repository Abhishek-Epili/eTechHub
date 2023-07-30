const express = require('express');
const{
    getGadgets,
    createGadget
} = require('../controllers/gadgetController')

const router = express.Router()

router.get('/',getGadgets)

router.post('/',createGadget)

module.exports = router