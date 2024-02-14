const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    // Implement method to get product by ID
};

exports.createProduct = async (req, res) => {
    // Implement method to create a new product
};

exports.updateProduct = async (req, res) => {
    // Implement method to update product by ID
};

exports.deleteProduct = async (req, res) => {
    // Implement method to delete product by ID
};
