import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../helpers/handleMongooseError.js";


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true })


userSchema.post('save', handleMongooseError)

export const User = model('user', userSchema);

export const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription:Joi.string()
    
})

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),    
})
