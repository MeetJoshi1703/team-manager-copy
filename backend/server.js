import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import connectDB from './config/db.js'; 
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path'; // Import the 'path' module


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const buildPath = path.join(__dirname, '../frontend-r/build');
app.use(express.static(buildPath));

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
