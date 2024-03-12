import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, { versionKey: false, timestamps: true });

contactSchema.post('save', handleMongooseError)

export const Contact = model('contact', contactSchema);