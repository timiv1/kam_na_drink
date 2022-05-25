import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { Drink, IDrink } from '@models/drink';
import { DrinkType, IDrinkType } from '@models/drink_type';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

const drink_types: string = "/drink_types";

/** Drinks object
 * @swagger
 * components:
 *   schemas:
 *     drinks:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the drink
 *         name:
 *           type: string
 *           description: Name of the drink
 *         price:
 *           type: number
 *           description: Price of the drink
 *         volume:
 *           type: number
 *           description: Volume of the drink
 *         year:
 *           type: number
 *           description: Year of the drink
 *         alcohol:
 *           type: integer
 *           description: Alcohol content of the drink
 *         description:
 *           type: string
 *           description: Description of the drink
 *         drink_type_id:
 *           type: number
 *           description: Drink_type_id of the drink
 */

/** DrinkType object
 * @swagger
 * components:
 *   schemas:
 *     drinktype:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the drink type
 *         type:
 *           type: string
 *           description: Type of a drink
 */

/** Returns the list of all drinks
 * @swagger
 * /api/drinks:
 *   get:
 *     summary: Returns the list of all drinks
 *     tags: [drinks]
 *     responses:
 *       200:
 *         description: The list of the drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/drinks'
 */
router.get('/', async (_: Request, res: Response) => {
    try {
        const drinks = await new Drink().fetchAll({ withRelated: "drink_type" });
        return res.status(OK).json(drinks);
    } catch (error) {
        console.log(error);
    }
});

/** Returns the list of all drinks sorted by ascending price (lowest to highest)
 * @swagger
 * /api/drinks/price:
 *   get:
 *     summary: Returns the list of all drinks sorted by ascending price (lowest to highest)
 *     tags: [drinks]
 *     responses:
 *       200:
 *         description: The list of the drinks ordered by price ascending
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/drinks'
 */
router.get('/price', async (_: Request, res: Response) => {
    try {
        const drinks = await new Drink().fetchAll({ withRelated: "drink_type" });
        drinks.orderBy('price', 'ASC');
        return res.status(OK).json(drinks);
    } catch (err) {
        console.log(err);
    }
});

/** Get the drink by id
 * @swagger
 * /api/drinks/{id}:
 *   get:
 *     summary: Get the drink by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The drinks id
 *     tags: [drinks]
 *     responses:
 *       200:
 *         description: drink by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/drinks'
 *       404:
 *         description: The drink was not found
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

/** Create a new drink
 * @swagger
 * /api/drinks:
 *   post:
 *     summary: Create a new drink
 *     tags: [drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/drinks'
 *     responses:
 *       200:
 *         description: The drink was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drinks'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req: Request, res: Response) => {
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

/** Update a drink
 * @swagger
 * /api/drinks/{id}:
 *   put:
 *     summary: Update a drink
 *     tags: [drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/drinks'
 *     responses:
 *       200:
 *         description: The drink was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drinks'
 *       500:
 *         description: Some server error
 */
router.put("/:id", async (req: Request, res: Response) => {
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
 * @swagger
 * /api/drinks/{id}:
 *   delete:
 *     summary: Remove the drinks entry
 *     tags: [drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The drinks id
 * 
 *     responses:
 *       200:
 *         description: The drinks was deleted
 *       404:
 *         description: The drinks was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
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

//TODO: ??? Nevem men ne gre klicat posamezno tega API-ja, vendar ga pa pokaže pri /get/drinks
/**
 * @swagger
 * /api/drinks/types:
 *   get:
 *     summary: Returns the list of drink types
 *     tags: [drinktype]
 *     responses:
 *       200:
 *         description: The list of drink types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/drinktype'
 *       500:
 *         description: Some server error
 */
router.get('/types', async (_: Request, res: Response) => {
    try {
        const drink_types = await new DrinkType().fetchAll({ withRelated: "drinks" });
        return res.status(OK).json(drink_types);
    } catch (error) {
        
    }
});

/**
 * @swagger
 * /api/drinks/types:
 *   post:
 *     summary: Create a new drink type
 *     tags: [drinktype]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/drinktype'
 *     responses:
 *       200:
 *         description: The drink type was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drinktype'
 *       500:
 *         description: Some server error
 */
router.post('/types', async (req: Request, res: Response) => {
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
 * @swagger
 * /api/drinks/types/{id}:
 *   put:
 *     summary: Update a drink type
 *     tags: [drinktype]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/drinktype'
 *     responses:
 *       200:
 *         description: The drink type was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drinktype'
 *       500:
 *         description: Some server error
 */
router.put('/types/:id', async (req: Request, res: Response) => {
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
 * @swagger
 * /api/drinks/types/{id}:
 *   delete:
 *     summary: Remove the drink type entry
 *     tags: [drinktype]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The drink type id
 * 
 *     responses:
 *       200:
 *         description: The drink type was deleted
 *       404:
 *         description: The drink type was not found
 */
router.delete('/types/:id', async (req: Request, res: Response) => {
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