import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MoviesController from './app/controllers/MoviesController';


const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/sessions', SessionController.store);


routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/movies', MoviesController.index)
routes.post('/movies', MoviesController.store);
routes.put('/movies/vote/:movie_id', MoviesController.vote)


export default routes;
