import { User } from "../db/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import jimp from 'jimp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const { SECRET_KEY } = process.env;


export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, `Email: ${email} already in use`)
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);

      const newUser = await User.create({...req.body, password:hashPassword, avatarURL});
        res.status(201).json({
          user:{email: newUser.email,
          subscription: newUser.subscription,}
          
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, 'Email or password invalid');
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, 'Email or password invalid');
        }

        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({
            token:token,
            user: {
                email: user.email,
                subscription:user.subscription,          
            }
        })
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        res.json({
            email,
            subscription,
        })
    } catch (error) {
        next(error)
    }
};
export const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id,{ token: '' });
        res.status(200).json({
            message: 'Logout succes'
        })
    } catch (error) {
        next(error)
    }
}

export const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarDir, filename);
        await fs.rename(tempUpload, resultUpload);
        await jimp.read(`${resultUpload}`)
            .then((image) => {
                return image
                    .resize(250, 250)
                    .write(`${resultUpload}`)
            })
            .catch((err) => {
                console.error(err);
            });
        const avatarURL = path.join('avatars', filename);
        await User.findByIdAndUpdate(_id, { avatarURL })
        res.json({
            avatarURL,
        })
    } catch (error) {
        next(error)
    }
}