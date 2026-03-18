import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import routeNotFoundMiddleware from './middlewares/route-not-found.middleware.js';
import exceptionHandlerMiddleware from './middlewares/exception-handler.middleware.js';
import responseMiddleware from './middlewares/response.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(responseMiddleware);

app.use('/', routes);

app.use(routeNotFoundMiddleware);
app.use(exceptionHandlerMiddleware);

export default app;
