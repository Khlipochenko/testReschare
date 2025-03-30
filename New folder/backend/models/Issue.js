import { Schema, model } from "mongoose"

const issueSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

export const Issue = model("issue", issueSchema);