const express = require("express");
const tasksRouter = require("./routes/tasks");
const { initializeDatabase } = require("./db/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo API opérationnelle",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/tasks", tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Route introuvable",
  });
});

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Todo API disponible sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à PostgreSQL :", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
