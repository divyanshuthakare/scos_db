import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // 🔥 ADD
import routes from "./routeManager/index.js";
import "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ADD THIS LINE
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/", routes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);