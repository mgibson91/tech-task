/**
 * A user needs to be able to enter a URL and they will get an 8 character (lowercase-alphanumeric) shortened version of the URL.
 * URLs are shortened and persisted into MongoDB via a REST API.
 * The frontend app will display a list of previously shortened URLs.
 * New URLs will be generated and added to the frontend list.
 * The same 8-characters cannot be used twice i.e. each shortened URL needs to be unique.
 * The URLs need to be shortened with the following domain 'pbid.io' e.g. https://pbid.io/f3x2ab1c
 * The shortened URL do not need to actually redirect/work as the domain doesn’t exist.
 * The entire system needs to be runnable using Docker, a simple compose file will do.
 * Appropriate tests should be added to the code, using the jest framework.
 * The app layout should be responsive.
 * Add a root README.md describing what the application is, and how to run it.
 */

import * as express from 'express';
import 'express-async-errors';

import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import { body } from 'express-validator';
import { connect } from '@database/index';
import { ShortUrlModel } from '@database/entities/short-url/model';
import logger from '@src/common/logger';
import { shortenUrl } from '@src/common/shorten-url';
import { executeValidations, ExpressValidationError } from '@src/common/validations';
import * as config from 'config';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.options('*', cors());

const validations = {
  addShortUrl: [
    body('url', 'Invalid url').isURL(),
    executeValidations,
  ],
};

app.post('/add-short-url', validations.addShortUrl, async (req: express.Request, res: express.Response) => {
  const { original, shortened } = shortenUrl({
    baseUrl: 'https://pbid.io',
    url: req.body.url,
  });

  const result = await ShortUrlModel.create({
    originalUrl: original,
    shortUrl: shortened,
  });

  res.json(result);
});

app.get('/get-short-urls', async (req: express.Request, res: express.Response) => {
  const result = await ShortUrlModel.find();
  res.json(result);
});

// Handle express validation errors
app.use((err: any, req: any, res: any, next: any) => {
  if (err && err.message) {
    console.log(err.message);
  }

  if (err instanceof ExpressValidationError) {
    const errors = err.errors;
    console.error(errors);

    return res.status(500).json({
      error: err.constructor.name,
      message: `Validation error(s): ${err.errors.map((e: any) => e.msg).join(', ')}`,
      errors,
    });
  }

  next(err);
});

// Handle any previously unhandled errors
app.use((err: any, req: any, res: any, next: any) => {
  const error = {
    error: err ? err.constructor.name : 'Error',
    message: (err && err.message) ? err.message : 'Unknown problem occurred',
  };

  res.status(500).json(error);

  console.error(`${error.error}: ${error.message}`);
});

// Start database
connect({ host: config.get('db_host'), databaseName: config.get('db_name')})
  .then(() => {
    logger.info('Connected to database');
  })
  .catch(() => {
    logger.error('Error connecting to database');
  });

const port = config.get('port');

// Start server
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
