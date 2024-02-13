const express = require('express');
const{
    getGadgets,
    getGadget,
    createGadget,
    updateGadget
} = require('../controllers/gadgetController')

const router = express.Router()

router.get('/',getGadgets)

router.post('/',createGadget)

router.get('/:id',getGadget)

router.put('/:id',updateGadget)

module.exports = router