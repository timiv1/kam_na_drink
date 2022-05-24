import { Router } from 'express';
import userRouter from './user-router';
import drinkRouter from './drink-router';
import barRouter from './bar-router';
import workTimeRouter from '@routes/workTimes-router'
import contactRouter from '@routes/contact-router'
import locationRouter from '@routes/location-router'

// Export the base-router
const baseRouter = Router();

baseRouter.use('/users', userRouter);
baseRouter.use('/drinks', drinkRouter);
baseRouter.use('/bars', barRouter);
baseRouter.use("/work_times", workTimeRouter)
baseRouter.use("/contacts", contactRouter)
baseRouter.use("/location", locationRouter)

// Export default.
export default baseRouter;
