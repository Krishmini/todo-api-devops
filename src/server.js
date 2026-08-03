const express = require("express");
const tasksRouter = require("./routes/tasks");

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

app.listen(PORT, () => {
  console.log(`Todo API disponible sur http://localhost:${PORT}`);
});