import express from 'express';
import routes from './routes.js';
import routeNotFoundMiddleware from './middlewares/route-not-found.middleware.js';
import exceptionHandlerMiddleware from './middlewares/exception-handler.middleware.js';

const app = express();

app.use(express.json());
app.use('/', routes);

app.use(routeNotFoundMiddleware);
app.use(exceptionHandlerMiddleware);

export default app;
