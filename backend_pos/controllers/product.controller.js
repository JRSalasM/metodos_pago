const Product = require('../models/producto.model');

exports.allProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select({ _id: 0 });
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}