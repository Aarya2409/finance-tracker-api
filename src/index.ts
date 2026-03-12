import express from 'express';
import morgan from 'morgan';
import routes from './routes';

import { errorHandler, NotFoundError } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', routes);


// 404 handler - catches any route that doesn't exist
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.url} not found`));
});

// Global error handler - must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;