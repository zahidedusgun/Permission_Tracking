import express, { Router } from "express";
import pool from "../db";
import authorization from "../middleware/authorization";

const router: Router = express.Router();

router.get ("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT username FROM users WHERE id = $1", [req.user]);
        res.json(user.rows[0]);
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});



export default router;
