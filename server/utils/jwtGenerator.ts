import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function jwtGenerator(id: number) {
    const payload = {
        user: {
            id: id
        }
    };

    return jwt.sign(payload, process.env.jwtSecret!, { expiresIn: "1h" });
}

export default jwtGenerator;