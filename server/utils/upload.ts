import fs from "fs";
import multer from "multer";
import path from "path";
import { Request } from "express";
import { FileFilterCallback } from "multer";

const multerStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    const folderPath = path.resolve(process.cwd(), "public", "img", "movies");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: (req: Request, __, cb) => {
    const posterName = Date.now() + ".png";
    (req as Request & { locals: { posterName: string } }).locals = {
      posterName,
    };
    cb(null, posterName);
  },
});

const multerFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: multerFilter,
});

export default upload.single("image");
