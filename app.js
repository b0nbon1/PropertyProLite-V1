import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import router from './src/routes';

const Docs = require('./Docs/swagger.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(Docs));

router(app);

export default app;
