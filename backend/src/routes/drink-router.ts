import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { Drink, IDrink } from '@models/drink'

const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;

//Get all drinks 
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const drinks = await new Drink().fetchAll();
        return res.status(OK).json({drinks});
    } catch (err) {
        console.log(err);
    }
});

//Get all drinks sorted by ascending price (lowest to highest)
router.get(p.get + '/price', async (_: Request, res: Response) => {
    try {
        const drinks = await new Drink().fetchAll();
        drinks.orderBy('price', 'ASC');
        return res.status(OK).json({drinks});
    } catch (err) {
        console.log(err);
    }
});

//Get all drinks by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const lokal = await new Drink({id}).fetch();
        return res.status(OK).json(lokal);
    } catch (error) {
        console.log(error);
    }
});

//Post drink
router.post(p.add, async (req: Request, res: Response) => {
    try {
        const drink: IDrink = req.body;
        if (!drink) {
            throw new ParamMissingError();
        }
        const newEntry = await new Drink().save(drink);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Update drink
router.put(p.update+"/:id", async (req: Request, res: Response) => {
    try {
        const drink: IDrink = req.body;
        const id = req.params.id
        if (!drink) {
            throw new ParamMissingError();
        }
        const newEntry = await new Drink({ id }).save(drink);
        return res.status(OK).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Delete drink
router.delete(p.delete+"/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new Drink({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        console.log(error);
    }
});

// Export default
export default router;
