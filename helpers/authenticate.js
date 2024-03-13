import { User } from "../db/user.js";
import HttpError from "./HttpError.js";
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
    const { authorization=''} = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token!==token) {
            next(HttpError(401, 'Not authorized'));
        }
        req.user = user;
        next();
    } catch {
        next(HttpError(401, 'Not authorized'));
    }

}