import express, { Request, Response, NextFunction } from 'express';
import logger from './config/logger';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import router from './routes/recipeRoutes';
import path from 'path';
import promBundle from 'express-prom-bundle';
import bodyParser from 'body-parser';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  response.header('Content-Type', 'application/json');
  response.status(error.statusCode || 500);
  response.json({ error: error.message });
  response.send();
};

const app = express();

app.use(
  promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    promClient: {
      collectDefaultMetrics: {},
    },
  })
);

app.use(cors());

app.use(bodyParser.json());

let routeBase = './src/routes/*.{ts,js}';
if (process.env.NODE_ENV === 'production') {
  routeBase = './build/routes/*.{ts,js}';
}

const spec = swaggerJSDoc({
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Recipe Book',
      version: '0.0.1',
      description: 'https://github.com/hicks-team/RecipeBook',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    license: {
      name: 'Licensed Under MIT',
    },
  },
  apis: [path.join(process.cwd(), routeBase)],
});

app.use('/rest-docs', serve, setup(spec));
app.use('/api', router);

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use(errorHandler);

app.listen(8080, () => {
  logger.info('Starting server');
  console.log('Server started');
  if (process.env.NODE_ENV !== 'production') {
    console.log('Visit the docs at http://localhost:8080/rest-docs');
  }
});
