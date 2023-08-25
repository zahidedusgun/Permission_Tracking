import express from "express";
import pool from "../db";

const router = express.Router();

//creating a request
router.post("/request", async (req, res) => {
  try {
    const {
      id,
      start_date,
      end_date,
      perm_location,
      perm_type,
      description,
      posting_date,
    } = req.body;
    const newRequest = await pool.query(
      "INSERT INTO requests (id,start_date, end_date, perm_location, perm_type, description, posting_date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        id,
        start_date,
        end_date,
        perm_location,
        perm_type,
        description,
        posting_date,
      ]
    );

    res.json(newRequest.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).json({ error: "post hatası" });
  }
});

//get all requests
router.get("/request", async (req, res) => {
  try {
    const allRequests = await pool.query("SELECT * FROM requests");
    res.json(allRequests.rows);
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).json({ error: "get hatası" });
  }
});

//get a request
router.get("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await pool.query("SELECT * FROM requests WHERE id = $1", [
      id,
    ]);
    res.json(request.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).json({ error: "get  a request hatası" });
  }
});

//update a request
router.put("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      start_date,
      end_date,
      perm_location,
      perm_type,
      description,
      posting_date,
    } = req.body;
    const updateRequest = await pool.query(
      "UPDATE requests SET start_date = $1, end_date = $2, perm_location = $3, perm_type = $4, description = $5, posting_date = $6 WHERE id = $7",
      [
        start_date,
        end_date,
        perm_location,
        perm_type,
        description,
        posting_date,
        id,
      ]
    );
    res.json("Request was updated!");
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).json({ error: "put hatası" });
  }
});

//delete a request
router.delete("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRequest = await pool.query(
      "DELETE FROM requests WHERE id = $1",
      [id]
    );
    res.json("Request was deleted!");
  } catch (err) {
    console.error((err as Error).message);
    console.error(err);
    res.status(500).json({ error: "delete hatası" });
  }
});

export default router;