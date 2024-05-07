import mongoose from "mongoose";

const { Schema } = mongoose;

const vaccineApplicantSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    ICNumber:{
        type:String,
        required:true,
        unique:true
    },
    countryCode:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    appointmentDate:{
        type:String,
        required:true,
    },
    medicalConditions:{
        type:Array,
        required:true,
    },
    vaccine_appointment_confirmed: {
        type: Boolean,
        default: false // Default value set to false
    },
    vaccine_appointment_administered: {
        type: Boolean,
        default: false // Default value set to false
    }
}, {
    timestamps: true
});

const vaccineApplicant = mongoose.model("vaccineApplicant", vaccineApplicantSchema);

export default vaccineApplicant;
