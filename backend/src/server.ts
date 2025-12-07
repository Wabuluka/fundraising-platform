import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDatabase } from "./infrastructure/database/connection";
import { config } from "./config";
import compression from "compression";
import morgan from "morgan";
import { errorHandler } from "./presentation/middleware/errorhandler";
import router from "./presentation/routes";

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

//Error handling
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(config.PORT, () => {
      console.log(`Server running on port: ${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
