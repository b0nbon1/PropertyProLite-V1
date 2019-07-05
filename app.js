import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import users from './src/routes/UserRoutes';
import property from './src/routes/PropertyRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const prefix = '/api/v1';

app.get('/', (req, res) => {
    res.status(200).send('Welcome to property pro lite');
});
app.use(prefix, users);
app.use(prefix, property);

export default app;
