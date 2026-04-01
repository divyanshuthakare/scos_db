import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import routes from "./routeManager/index.js";
import "./db/db.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", routes);

// ✅ error handler before listen
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});