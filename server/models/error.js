import mongoose from "mongoose";
const Schema = mongoose.Schema;

const errorSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        grad: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
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
