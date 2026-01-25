import express from "express";
import routes from "./routes/index.js";
import { migrate } from "./db/migrate.js";

const app = express();

app.use(express.json());

// run migrations ONCE at startup
await migrate();

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
