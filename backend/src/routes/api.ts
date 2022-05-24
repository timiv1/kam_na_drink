import { Router } from 'express';
import userRouter from './user-router';
import drinkRouter from './drink-router';
import localRouter from './local-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/drinks', drinkRouter);
baseRouter.use('/locals', localRouter);

// Export default.
export default baseRouter;
