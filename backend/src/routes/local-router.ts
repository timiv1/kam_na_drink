import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { Local, ILocal } from '@models/local'

const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;

//Get all locals 
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const lokals = await new Local().fetchAll();
        return res.status(OK).json({lokals});
    } catch (error) {
        console.log(error);
    }
});

//Get all locals by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const lokal = await new Local({id}).fetch();
        return res.status(OK).json(lokal);
    } catch (error) {
        console.log(error);
    }
});

//Post local 
router.post(p.add, async (req: Request, res: Response) => {
    try {
        const newLokal: ILocal = req.body;
        if (!newLokal) {
            throw new ParamMissingError();
        }
        const newEntry = await new Local().save(newLokal);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Update local 
router.put(p.update+"/:id", async (req: Request, res: Response) => {
    try {
        const lokal: ILocal = req.body;
        const id = req.params.id
        if (!lokal) {
            throw new ParamMissingError();
        }
        const newEntry = await new Local({ id }).save(lokal);
        return res.status(OK).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

//Delete local 
router.delete(p.delete+"/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new Local({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        console.log(error);
    }
});


// Export default
export default router;
