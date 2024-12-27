import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/todoList", todoRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
