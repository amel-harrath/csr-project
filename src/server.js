import express from 'express';
import cors from 'cors';
import router from 'src/api';
import CustomError from 'src/utils/errors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
    });
  } else {
    res.status(500).json({ message: 'Error occurred', err });
  }
});
app.use('/api', (req, res, next) => {
  res
    .status(404)
    .json({ error: 'Route not found. Please read the API documentation' });
});

export default app;
