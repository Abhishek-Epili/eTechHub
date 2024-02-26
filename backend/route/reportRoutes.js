const express = require('express');
const{
    getReports,
    createReport,
    updateReport
} = require('../controllers/reportController')

const router = express.Router()

router.get('/',getReports)

router.post('/',createReport)

router.put('/:id',updateReport)

module.exports = router