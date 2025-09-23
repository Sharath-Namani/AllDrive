import express from 'express';
import cors from 'cors';
import routes from '../routes/allRoutes.js';
import logger from '../middleware/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

await mongoose.connect( "mongodb://localhost:27017/AllDrive", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log("Connected to MongoDB");
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});