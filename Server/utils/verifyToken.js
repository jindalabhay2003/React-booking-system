import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You need to login"));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(createError(403, "Token is invalid, You need to login again"));
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not allowed to do that"));
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not allowed to do that"));
        }
    });
}