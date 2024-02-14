const express = require('express');
const router = express.Router();
const {getAllPayments, createPayment, getPaymentById, updatePayment, deletePayment} = require('../controllers/paymentController');

router.route('/')
    .get(getAllPayments)
    .post(createPayment);

router.route('/:id')
    .get(getPaymentById)
    .put(updatePayment)
    .delete(deletePayment);

module.exports = router;
