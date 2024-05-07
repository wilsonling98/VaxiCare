import mongoose from "mongoose";

const { Schema } = mongoose;

const userCategorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness for each category
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});


const UserCategory = mongoose.model("UserCategory", userCategorySchema);

export default UserCategory;
