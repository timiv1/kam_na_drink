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
var cors = require('cors')

//Na koncu projekta bomo kar je zakomentirano obdržali
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', userRouter); //baseRouter.use('/users', extractJWT, userRouter);
baseRouter.use('/drinks', drinkRouter); //baseRouter.use('/drinks',  extractJWT, drinkRouter);
baseRouter.use('/bars', barRouter); //baseRouter.use('/bars', extractJWT, barRouter);
baseRouter.use("/work_times", workTimeRouter) //baseRouter.use("/work_times", extractJWT, workTimeRouter)
baseRouter.use("/contacts", contactRouter) //baseRouter.use("/contacts", extractJWT, contactRouter)
baseRouter.use("/location", locationRouter) //baseRouter.use("/location", extractJWT, locationRouter)
baseRouter.use("/menus", menuRouter) //baseRouter.use("/menu", extractJWT, menuRouter)

// Export default.
export default baseRouter;
