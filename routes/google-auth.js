import express from 'express';
const Router = express.Router();

import {googleAuth,googleUser} from '../controller/google-auth.js';


Router.route('/auth').post(googleAuth);
Router.route('/user').post(googleUser);

export default Router;
