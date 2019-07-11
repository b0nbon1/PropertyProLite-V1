import user from './UserRoutes';
import property from './PropertyRoutes';

const prefix = '/api/v1';

const router = (app) => {
    app.use(prefix, user);
    app.use(prefix, property);
};

export default router;
