const express = require('express')

const router = express.Router();

let product = require('./controller');

router.post('/api/product', product.createProduct);
router.get('/api/product/:id', product.getProduct);
router.get('/api/products', product.products);
router.put('/api/product', product.updateProduct);
router.delete('/api/product/:id', product.deleteProduct);

router.post('/api/order', product.createOrder);
router.get('/api/order/:id', product.getOrder);
router.get('/api/orders', product.orders);
router.put('/api/order', product.updateOrder);
router.delete('/api/order/:id', product.deleteOrder);

module.exports = router;