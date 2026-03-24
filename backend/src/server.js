import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(env.port, () => console.log(`Backend API listening at http://localhost:${env.port}`));
  })
  .catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
