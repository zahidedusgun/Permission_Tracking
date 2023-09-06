import express, { Router, Request, Response } from "express";
import pool from "../db";
import authorization from "../middleware/authorization";

const router: Router = express.Router();

router.get("/", authorization, async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
        const user = await pool.query(
      "SELECT username FROM users WHERE id = $1",
      [id]
    );
    console.log(id);
    res.json(user.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
});

export default router;
