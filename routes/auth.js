import express from 'express'
const Router = express.Router();
import {Login,Register,authUser} from '../controller/auth.js';


Router.route('/user/register').post(Register);
Router.route('/user/login').post(Login);
Router.route('/get/user').post(authUser);

export default Router;