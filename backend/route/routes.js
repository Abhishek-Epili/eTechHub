const express = require('express');
const{
    getGadgets,
    getGadget,
    createGadget
} = require('../controllers/gadgetController')

const router = express.Router()

router.get('/',getGadgets)

router.post('/',createGadget)

router.get('/:id',getGadget)

module.exports = router