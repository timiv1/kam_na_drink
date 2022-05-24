import { Router } from 'express';
import userRouter from './user-router';
import drinkRouter from './drink-router';
import localRouter from './local-router';
import barRouter from '@routes/bars';
import workTimeRouter from '@routes/workTimes'
import contactRouter from '@routes/contacts'
import locationRouter from '@routes/locations'

// Export the base-router
const baseRouter = Router();

baseRouter.use('/users', userRouter);
baseRouter.use('/drinks', drinkRouter);
baseRouter.use('/locals', localRouter);
baseRouter.use('/bars', barRouter);
baseRouter.use("/work_times", workTimeRouter)
baseRouter.use("/contacts", contactRouter)
baseRouter.use("/location", locationRouter)

// Export default.
export default baseRouter;
