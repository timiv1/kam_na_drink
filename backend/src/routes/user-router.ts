import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { User, IUser } from '@models/user';
import { DrinkUser, IDrinkUser } from '@models/drink_user';
import { BarUser } from '@models/bar_user';

const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;
const drinks: string = "/drinks";
const locals: string = "/bars";

//Get all users 
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const users = await new User().fetchAll({});
        return res.status(OK).json({ users });
    } catch (error) {
        console.log(error);
    }
});

//Get all users by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await new User({ id }).fetch({ withRelated: "drinks" });
        return res.status(OK).json(user);
    } catch (error) {
        console.log(error);
    }
});

//Post user 
router.post(p.add, async (req: Request, res: Response) => {
    try {
        const newUser: IUser = req.body;
        if (!newUser) {
            throw new ParamMissingError();
        }
        const newEntry = await new User().save(newUser);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Update user 
router.put(p.update+"/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser: IUser = req.body;
        const id = req.params.id
        if (!updatedUser) {
            throw new ParamMissingError();
        }
        const newEntry = await new User({ id }).save(updatedUser);
        return res.status(OK).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Delete User
router.delete(p.delete+"/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new User({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        console.log(error);
    }
});
       
//Get all users drinks
 router.get(drinks + p.get, async (_: Request, res: Response) => {
    try {
        const users_drinks = await new DrinkUser().fetchAll();
        return res.status(OK).json({ user_drinks: users_drinks });
    } catch (error) {
        console.log(error);
    }
});
                    
//Get all users drinks by userId
router.get(drinks + "/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const user_drinks = await new DrinkUser().where({ userId: id }).fetchAll({ withRelated: "drink" });
    return res.status(OK).json(user_drinks);
});
         
//Add one users drink
router.post(drinks + p.add, async (req: Request, res: Response) => {
    try {
        let newUser: IDrinkUser = req.body;
        if (!newUser) {
            throw new ParamMissingError();
        }
        const newEntry = await new DrinkUser().save(newUser);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Delete one users drink
router.delete(drinks + p.delete + "/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new DrinkUser({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        console.log(error);
    }
});
         
//Get all users bars.
 router.get(locals + p.get, async (_: Request, res: Response) => {
    try {
        const users_locals = await new BarUser().fetchAll();
        return res.status(OK).json({ user_locals: users_locals });
    } catch (error) {
        console.log(error);
    }
});
                   
// Get all users locals by userId.
router.get(locals + "/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const user_locals = await new BarUser().where({ userId: id }).fetchAll({ withRelated: "local" });
    return res.status(OK).json(user_locals);
});

//Add one user local
router.post(locals + p.add, async (req: Request, res: Response) => {
    try {
        let newUserLocal: IDrinkUser = req.body;
        if (!newUserLocal) {
            throw new ParamMissingError();
        }
        const newEntry = await new BarUser().save(newUserLocal);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Delete one user local
router.delete(locals + p.delete + "/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new BarUser({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        console.log(error);
    }
});

// Export default
export default router;