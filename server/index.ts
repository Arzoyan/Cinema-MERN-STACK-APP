require("dotenv").config();
import mongo from "./utils/mongo";
import { PORT } from "./constants";
import RoomRouts from "./routes/rooms";
import MovieRouts from "./routes/movies";
import SeatsRouts from "./routes/seats";
import app from "./utils/app";
import uploadImage from "./utils/upload";

async function bootstrap() {
  await mongo.connect();

  app.use("/api/rooms", RoomRouts);
  app.use("/api/movies", uploadImage, MovieRouts);
  app.use("/api/seats", SeatsRouts);

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
