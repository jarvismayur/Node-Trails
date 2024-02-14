const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');

router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

router.route('/:id')
    .get(orderController.getOrderById)
    .put(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = router;
