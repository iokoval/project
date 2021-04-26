const Product = require('./product.model');
const Order = require('./order.model');
// add new product
createProduct = async (req, res) => {

    const product = new Product({
        type: req.body.type,
        name: req.body.name,
        picture: req.body.picture,
        price: req.body.price
    });

    product.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            "message": "Fail!",
            "error": err.message
        });
    });
};
// get One product by id
getProduct = async (req, res) => {
    Product.findById(req.params.id).select('-__v')
        .then(product => {
            res.status(200).json(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    "message": "Product not found with id " + req.params.id,
                    "error": err
                });
            }
            return res.status(500).send({
                "message": "Error retrieving Product with id " + req.params.id,
                "error": err
            });
        });
};
// get All products
products = async (req, res) => {
    Product.find().select('-__v').then(productInfos => {
        res.status(200).json(productInfos);
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            "message": "Error!",
            "error": error
        });
    });
};
// delete product by id
deleteProduct = async (req, res) => {
    let productId = req.params.id;

    Product.findByIdAndRemove(productId).select('-__v -_id')
        .then(product => {
            if (!product) {
                res.status(404).json({
                    "message": "Does Not exist a Product with id = " + productId,
                    "error": "404"
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                "message": "Error -> Can NOT delete a product with id = " + productId,
                "error": err.message
            });
        });
};
// update product
updateProduct = async (req, res) => {
    Product.findByIdAndUpdate(
        req.body._id,
        {
            type: req.body.type,
            name: req.body.name,
            picture: req.body.picture.name,
            price: req.body.price
        },
        { new: true }
    ).select('-__v')
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    "message": "Error -> Can NOT update a product with id = " + req.params.id,
                    "error": "Not Found!"
                });
            }
            res.status(200).json(product);
        }).catch(err => {
            return res.status(500).send({
                "message": "Error -> Can not update a product with id = " + req.params.id,
                "error": err.message
            });
        });
};

createOrder = async (req, res) => {

    const order = new Order({
        date: new Date(),
        address: req.body.address,
        price: req.body.price,
        products: req.body.products,
        clientName: req.body.name,
        clientSurname: req.body.surname,
        paid: req.body.paid,
        sent: req.body.sent,
        email: req.body.email,
        city: req.body.city,
    });

    order.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            "message": "Fail!",
            "error": err.message
        });
    });
};

getOrder = async (req, res) => {
    Order.findById(req.params.id).select('-__v')
        .then(order => {
            res.status(200).json(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    "message": "Order not found with id " + req.params.id,
                    "error": err
                });
            }
            return res.status(500).send({
                "message": "Error retrieving Order with id " + req.params.id,
                "error": err
            });
        });
};
// get All products
orders = async (req, res) => {
    Order.find().select('-__v').then(orderInfos => {
        res.status(200).json(orderInfos);
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            "message": "Error!",
            "error": error
        });
    });
};
// delete product by id
deleteOrder = async (req, res) => {
    let orderId = req.params.id;

    Product.findByIdAndRemove(orderId).select('-__v -_id')
        .then(order => {
            if (!order) {
                res.status(404).json({
                    "message": "Does Not exist a Order with id = " + orderId,
                    "error": "404"
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                "message": "Error -> Can NOT delete a Order with id = " + orderId,
                "error": err.message
            });
        });
};
// update product
updateOrder = async (req, res) => {
    Order.findByIdAndUpdate(
        req.body._id,
        {
            date: new Date(),
            address: req.body.address,
            price: req.body.price,
            productsId: req.body.products,
            clientName: req.body.clientName,
            clientSurname: req.body.clientSurname,
            paid: Boolean,
            sent: Boolean,
        },
        { new: true }
    ).select('-__v')
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    "message": "Error -> Can NOT update a order with id = " + req.params.id,
                    "error": "Not Found!"
                });
            }
            res.status(200).json(order);
        }).catch(err => {
            return res.status(500).send({
                "message": "Error -> Can not update a order with id = " + req.params.id,
                "error": err.message
            });
        });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    products,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    orders,
}