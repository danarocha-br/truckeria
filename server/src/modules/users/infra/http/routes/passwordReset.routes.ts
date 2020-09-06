import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordReset = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordReset.post('/forgot-password', forgotPasswordController.create);
passwordReset.post('/reset-password', resetPasswordController.create);

export default passwordReset;
