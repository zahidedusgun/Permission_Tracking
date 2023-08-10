import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: number; 
        }
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json("Not Authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret!) as { user: number };

        req.user = payload.user;

        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json("Not Authorized");
    }
};
