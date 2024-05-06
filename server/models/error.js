import mongoose from "mongoose";
const Schema = mongoose.Schema;

const errorSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        medicamentName: {
            type: String,
            require: true,
        },
        dosage: {
            type: String,
            require: true,
        },
        errorType: {
            type: String,
            require: true,
        },
        errorNature: {
            type: String,
            require: true,
        },
        errorNatureDescription: {
            type: String,
        },
        errorCause:{
            type: String, 
            require: true
        },
        errorCauseDescription:{
            type: String, 
        },   
        grad: {
            type: String,
            require: true,
        },
        gradDescription: {
            type: String,
        }, 
        
        voie: {
            type: String,
            require: true,
        },
        voieDescription: {
            type: String,
        },
        medicamentSource: {
            type: String,
            require: true,
        },
        correction:{
            type: String, 
            require: true
        },
        concequence:{
            type: String, 
            require: true
        },
        concequenceDescription:{
            type: String, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Error = mongoose.model("Error", errorSchema);

export default Error;
