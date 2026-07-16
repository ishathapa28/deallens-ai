import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true,
        maxlength: [300, "Product title cannot exceed 300 characters"],
    }, 

    normalizedTitle: {
        type: String,
        required: [true, "Normalized title is required"],
        trim: true,
        lowercase: true,
        index: true,
    },

    brand: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
        index: true,
    },

    modelNumber: {
        type: String,
        trim: true,
        uppercase: true,
        default: "",
        index: true,
    },

    category: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
        index: true,
    },

    imageUrl: {
        type: String,
        trim: true,
        default: "",
    },

    specification: {
        type: Map,
        of: String,
        default: {},
    },
},
{
    timestamps : true,
},
);

productSchema.index({brand: 1, modelNumber: 1,});

const Product = mongoose.model("Product", productSchema);

export default Product;