 const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
// app.use(cors({
//   origin: 'https://daily-stride-seven.vercel.app',
//   credentials: true
// }));
app.use(cors({
  origin: [
    'https://dailystride360.vercel.app',
    'https://daily-stride-seven.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/metrics', require('./routes/healthMetrics'));
app.use('/api/nutrition', require('./routes/nutrition'));
app.use('/api/workouts', require('./routes/workouts'));

app.get('/', (req, res) => res.send('Health Tracker API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));