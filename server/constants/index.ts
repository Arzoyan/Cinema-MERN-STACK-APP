require("dotenv").config();
const ORIGIN = "*";
const PORT = process.env.PORT || 8000;

// for "atlas" edit MONGO_URI in -> .env file || for "community server" edit <MyDatabase>
const MONGO_URI = process.env.MONGO_URI as string;
const MONGO_OPTIONS = {};

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS };
