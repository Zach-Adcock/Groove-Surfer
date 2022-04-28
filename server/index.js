import express from 'express';
import mongoose from 'mongoose';
import cors from  'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();




app.use(bodyParser.json({ limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}));
app.use(cors());
app.use('/posts', postRoutes);
//Connect to DataBase (mongoDB)

const PORT = process.env.REACT_APP_PORT || 4000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err.message));

  // mongoose.set('useFindAndModify', false)