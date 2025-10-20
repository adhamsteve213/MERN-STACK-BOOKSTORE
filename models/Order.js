import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    address:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    phone:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Firstname:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Lastname:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Middlename:{
        type:mongoose.Schema.Types.String,
        required:true
    }
});

export default mongoose.model("Order", orderSchema);
    
    