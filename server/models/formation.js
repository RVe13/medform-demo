import mongoose from "mongoose";
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    title:{
        type: String, require: true,
    },
    content:{
        type: String, require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    image:{
        data: Buffer,
        contentType: String,
    }
}, {timestamps: true})

const Formation = mongoose.model("Formation", formationSchema)

export default Formation
