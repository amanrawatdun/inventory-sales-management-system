const Product = require("../models/Product");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("cloudinary").v2;

// Create Product
const createProduct = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { name, price, category, costPrice, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and Price are required' });
        }

        let imageUrl = null;
        let publicId = null;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'product-images');
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }


        const product = new Product({
            name,
            price,
            category,
            costPrice,
            stock,
            createdBy: adminId,
            image: imageUrl,
            imagePublicId: publicId
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const adminId = req.user.id;
        const products = await Product.find({ createdBy: adminId });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const adminId = req.user.id;
        const product = await Product.findOne({ _id: req.params.id, createdBy: adminId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        const { name, price, category, costPrice, stock } = req.body;

        if (name) product.name = name;
        if (price) product.price = price;
        if (category) product.category = category;
        if (costPrice) product.costPrice = costPrice;
        if (stock) product.stock = stock;

        if (req.file) {
            // Delete old image from Cloudinary
            if (product.imagePublicId) {
                await cloudinary.uploader.destroy(product.imagePublicId);
            }

            const uploadResult = await uploadToCloudinary(req.file.buffer, 'product-images');
            product.image = uploadResult.secure_url;
            product.imagePublicId = uploadResult.public_id;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const adminId = req.user.id;
        const product = await Product.findOneAndDelete({ _id: req.params.id, createdBy: adminId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        // Delete image from Cloudinary if exists
        if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};
