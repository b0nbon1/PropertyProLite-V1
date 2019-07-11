import user from './UserRoutes';
import property from './PropertyRoutes';
import Res from '../utils/helpers/responses';

const prefix = '/api/v1';

const router = (app) => {
    app.use(prefix, user);
    app.use(prefix, property);
    // Res.handleError below acts as success
    app.get('/', (req, res) => Res.handleError(200, 'Welcome to Property Pro Lite', res));
    app.use('*', (req, res) => Res.handleError(405, 'Invalid route or Method', res));
};

export default router;
