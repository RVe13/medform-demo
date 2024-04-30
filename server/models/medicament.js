import mongoose from "mongoose";
const Schema = mongoose.Schema;

const medicamentSchema = new Schema({
    title:{
        type: String, require: true,
    },
    desctiption: {
      type: String,
      require: true,
    },
    content:{
        type: String,
        require: true,
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

const Medicament = mongoose.model("Medicament", medicamentSchema)

export default Medicament
