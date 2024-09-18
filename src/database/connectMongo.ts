import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUrl = process.env.MONGO_DB_URL!;

  console.log(dbUrl);

  mongoose.connect(dbUrl);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });
};
