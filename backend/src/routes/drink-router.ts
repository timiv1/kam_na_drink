import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { Drink, IDrink } from '@models/drink';
import { DrinkType, IDrinkType } from '@models/drink_type';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;
const drink_types: string = "/drink_types";

/**
 * Get all drinks.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const drinks = await new Drink().fetchAll({ withRelated: "drink_type" });
        return res.status(OK).json({ drinks });
    } catch (error) {
        console.log(error);
    }
});

//Get all drinks sorted by ascending price (lowest to highest)
router.get(p.get + '/price', async (_: Request, res: Response) => {
    try {
        const drinks = await new Drink().fetchAll({ withRelated: "drink_type" });
        drinks.orderBy('price', 'ASC');
        return res.status(OK).json({drinks});
    } catch (err) {
        console.log(err);
    }
});


/**
 * Get drink by id.
 */
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const drink = await new Drink({ id }).fetch({ withRelated: "drink_type" });
        return res.status(OK).json(drink);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Add one drink.
 */
router.post(p.add, async (req: Request, res: Response) => {
    try {
        let newDrink: IDrink = req.body;
        if (!newDrink) {
            throw new ParamMissingError();
        }
        const newEntry = await new Drink().save(newDrink);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Update one drink.
 */
router.put(p.update + "/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser: IDrink = req.body;
        const id = req.params.id
        if (!updatedUser) {
            throw new ParamMissingError();
        }
        const newEntry = await new Drink({ id }).save(updatedUser);
        return res.status(OK).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Delete one drink.
 */
router.delete(p.delete + "/:id", async (req: Request, res: Response) => {
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

/**
 * Get all drinks types.
 */
router.get(drink_types + p.get, async (_: Request, res: Response) => {
    try {
        const drink_types = await new DrinkType().fetchAll({ withRelated: "drinks" });
        return res.status(OK).json({ drink_types });
    } catch (error) {
        
    }
});

/**
 * Add one drink type.
 */
router.post(drink_types + p.add, async (req: Request, res: Response) => {
    try {
        let newDrinkType: IDrinkType = req.body;
        if (!newDrinkType) {
            throw new ParamMissingError();
        }
        const newEntry = await new DrinkType().save(newDrinkType);
        return res.status(CREATED).json(newEntry);
    } catch (error) {

    }
});

/**
 * Update one drink type.
 */
router.put(p.update + "/:id", async (req: Request, res: Response) => {
    try {
        const updatedDrinkType: IDrinkType = req.body;
        const id = req.params.id
        if (!updatedDrinkType) {
            throw new ParamMissingError();
        }
        const newEntry = await new DrinkType({ id }).save(updatedDrinkType);
        return res.status(OK).json(newEntry);
    } catch (error) {

    }
});

/**
 * Delete one drink type.
 */
router.delete(p.delete + "/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new DrinkType({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        
    }
});

// Export default
export default router;
