import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from './routes/auth.js';

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', authRouter)
app.use("/api/contacts", contactsRouter);


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => { app.listen(PORT, () => console.log('Database connection successful')) })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

