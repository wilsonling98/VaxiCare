import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isHA: {
        type: Boolean,
        default: false
    },
    userID: {
        type: String, // Change type to String
        required: true,
    },
    userCategory: {
        type: String, // Change type to String
        required: true,
    },
    userCategoryRef: {
        type: Schema.Types.ObjectId, // Reference to UserCategory model
        ref: 'UserCategory' // Name of the referenced model
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
