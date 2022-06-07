import { Router } from 'express';
import authRouter from './auth-router';
import userRouter from './user-router';
import drinkRouter from './drink-router';
import barRouter from './bar-router';
import workTimeRouter from '@routes/workTimes-router'
import contactRouter from '@routes/contact-router'
import locationRouter from '@routes/location-router'
import menuRouter from './menu-router';
import extractJWT from 'src/middleware/extractJWT';

// Export the base-router
const baseRouter = Router();

// Secured routes
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', extractJWT, userRouter);
baseRouter.use('/drinks', extractJWT, drinkRouter);
baseRouter.use('/bars', extractJWT, barRouter);
baseRouter.use("/work_times", extractJWT, workTimeRouter)
baseRouter.use("/contacts", extractJWT, contactRouter)
baseRouter.use("/location", extractJWT, locationRouter)
baseRouter.use("/menus", extractJWT, menuRouter)

// Export default.
export default baseRouter;
