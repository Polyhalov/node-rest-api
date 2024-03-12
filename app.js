import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
const { DB_HOST } = process.env;
mongoose.connect(DB_HOST)
  .then(() => { app.listen(3000, () => console.log('Database connection successful')) })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });
