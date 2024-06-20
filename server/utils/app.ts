import express, { NextFunction, Request, Response } from "express"; // Backend App (server)
import cors from "cors"; // HTTP headers (enable requests)
import { ORIGIN } from "../constants";
import path from "path";

// initialize app
const app = express();

// Serve static files from the user frontend
app.use(
  "/user",
  express.static(path.join(__dirname, "../../my-cinema-app/build")),
);

// Serve static files from the admin frontend
app.use(
  "/admin",
  express.static(path.join(__dirname, "../../admin-panel/build")),
);

// Catchall handler for user frontend
app.get("/user/*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../my-cinema-app/build", "index.html"));
});

// Catchall handler for admin frontend
app.get("/admin/*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../admin-panel/build", "index.html"));
});

// middlewares
app.use(cors({ origin: ORIGIN }));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser

// Increase the limit for JSON payloads to 1MB (adjust as necessary)
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send();
  next();
});

export default app;
