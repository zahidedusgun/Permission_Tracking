import express, { Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator";
import authorization from "../middleware/authorization";

const validInfo = require("../middleware/validInfo");
const router = express.Router();

// Registering
router.post("/register", validInfo, async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (users.rows.length > 0) {
      return res.status(401).send("User already exists");
    }

    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, password, role]
    );
    console.log(newUser.rows[0]);
    res.json(newUser.rows[0]);

    if (!newUser.rows[0]) {
      return res.status(500).send("Failed to register new user");
    }

    const token = jwtGenerator(newUser.rows[0].id);

    res.status(201).json({ token });
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).send("Server error");
  }
});
//Get Registered Users
router.get("/register", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).json({ error: "get hatası" });
  }
});
// Logging in
router.post("/login", validInfo, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Username is incorrect");
    }

    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
});

router.get("/is-verify", authorization, async (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
});

export default router;
