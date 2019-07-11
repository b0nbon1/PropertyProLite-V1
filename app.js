import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import router from './src/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

router(app);

export default app;
