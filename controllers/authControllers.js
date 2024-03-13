import { User } from "../db/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;


export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, `Email: ${email} already in use`)
        }
        const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({...req.body, password:hashPassword});
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