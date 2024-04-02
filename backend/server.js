import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Determine the environment
const environment = process.env.NODE_ENV || 'development';

// Load environment-specific configurations
if (environment === 'development') {
    dotenv.config({ path: '.env.development' });
} else if (environment === 'production') {
    dotenv.config({ path: '.env.production' });
}

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from build directory in production
if (environment === 'production') {
    const buildPath = path.join(__dirname, '../frontend-r/build');
    app.use(express.static(buildPath));
}

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${environment} mode`);
});
