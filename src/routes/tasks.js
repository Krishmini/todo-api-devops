const express = require("express");
const { pool } = require("../db/database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, description, status FROM tasks ORDER BY id"
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur GET /tasks :", error.message);

    return res.status(500).json({
      error: "Impossible de récupérer les tâches",
    });
  }
});


router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "SELECT id, description, status FROM tasks WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Tâche introuvable",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur GET /tasks/:id :", error.message);

    return res.status(500).json({
      error: "Impossible de récupérer la tâche",
    });
  }
});

router.post("/", async (req, res) => {
  const { description, status = "todo" } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO tasks (description, status)
        VALUES ($1, $2)
        RETURNING id, description, status
      `,
      [description, status]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur POST /tasks :", error.message);

    return res.status(500).json({
      error: "Impossible de créer la tâche",
    });
  }
});


router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { description, status } = req.body;

  try {
    const result = await pool.query(
      `
        UPDATE tasks
        SET description = $1, status = $2
        WHERE id = $3
        RETURNING id, description, status
      `,
      [description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Tâche introuvable",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur PUT /tasks/:id :", error.message);

    return res.status(500).json({
      error: "Impossible de modifier la tâche",
    });
  }
});


router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { description, status } = req.body;

  try {
    const currentResult = await pool.query(
      "SELECT id, description, status FROM tasks WHERE id = $1",
      [id]
    );

    if (currentResult.rows.length === 0) {
      return res.status(404).json({
        error: "Tâche introuvable",
      });
    }

    const currentTask = currentResult.rows[0];

    const result = await pool.query(
      `
        UPDATE tasks
        SET description = $1, status = $2
        WHERE id = $3
        RETURNING id, description, status
      `,
      [
        description ?? currentTask.description,
        status ?? currentTask.status,
        id,
      ]
    );

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur PATCH /tasks/:id :", error.message);

    return res.status(500).json({
      error: "Impossible de modifier la tâche",
    });
  }
});


router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Tâche introuvable",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Erreur DELETE /tasks/:id :", error.message);

    return res.status(500).json({
      error: "Impossible de supprimer la tâche",
    });
  }
});

module.exports = router;