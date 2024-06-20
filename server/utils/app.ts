import express, { NextFunction, Request, Response } from "express"; // Backend App (server)
import cors from "cors"; // HTTP headers (enable requests)
import { ORIGIN } from "../constants";
import path from "path";

// initialize app
const app = express();

// for static files
const staticPath = path.join(process.cwd(), "public");
app.use(express.static(staticPath));

// middlewares
app.use(cors({ origin: ORIGIN }));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send();
  next();
});

export default app;
