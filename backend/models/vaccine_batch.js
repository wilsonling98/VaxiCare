import mongoose from "mongoose";

const { Schema } = mongoose;

const vaccineBatchSchema = new Schema({
    batchNumber: {
        type: String,
        required: true,
        unique:true,
    },
    vaccineName:{
        type: String,
        required: true
    },
    manufacturingDate: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    dosingInformation:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const vaccineBatch = mongoose.model("vaccineBatch", vaccineBatchSchema);

export default vaccineBatch;