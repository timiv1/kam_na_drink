import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { Drink } from '@models/drink';
import { DrinkType } from '@models/drink_type';
import { IDrink, IDrinkType } from '@models/schema_definitions'
import _schema from '@shared/_schema';
import validateBody from 'src/middleware/validateBody';

// Constants
const router = Router();
const { OK } = StatusCodes;
type RequestBody<T> = Request<{}, {}, T>;

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
 *         volume:
 *           type: number
 *           description: Volume of the drink
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

/** DrinkPost object
 * @swagger
 * components:
 *   schemas:
 *     DrinkPost:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the drink
 *         volume:
 *           type: number
 *           description: Volume of the drink
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

/** DrinkTypePost object
 * @swagger
 * components:
 *   schemas:
 *     DrinkTypePost:
 *       type: object
 *       required:
 *       properties:
 *         type:
 *           type: string
 *           description: Type of a drink
 */

/** Returns the list of all drinks
 * @swagger
 * /api/drinks:
 *   get:
 *     summary: Returns the list of all drinks
 *     tags: [Drinks]
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
        return res.status(200).json(drinks);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

// /** Returns the list of all drinks sorted by ascending price (lowest to highest)
//  * @swagger
//  * /api/drinks/price:
//  *   get:
//  *     summary: Returns the list of all drinks sorted by ascending price (lowest to highest)
//  *     tags: [Drinks]
//  *     responses:
//  *       200:
//  *         description: The list of the drinks ordered by price ascending
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/drinks'
//  */
// router.get('/price', async (_: Request, res: Response) => {
//     try {
//         const drinks = await new Drink().fetchAll({ withRelated: "drink_type" });
//         drinks.orderBy('price', 'ASC');
//         return res.status(200).json(drinks);
//     } catch (error) {
//         if (error.message === "EmptyResponse")
//             return res.sendStatus(404)
//         else
//             return res.status(500).send(error)
//     }
// });

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
 *     tags: [Drinks]
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
        return res.status(200).json(drink);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Create a new drink
 * @swagger
 * /api/drinks:
 *   post:
 *     summary: Create a new drink
 *     tags: [Drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DrinkPost'
 *     responses:
 *       200:
 *         description: The drink was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DrinkPost'
 *       500:
 *         description: Some server error
 */
router.post('/', validateBody(_schema.IDrink), async (req: RequestBody<IDrink>, res: Response) => {
    try {
        const newEntry = await new Drink().save({
            name: req.body.name,
            volume: req.body.volume,
            alcohol: req.body.alcohol,
            description: req.body.description,
            drink_type_id: req.body.drink_type_id
        });
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Update a drink
 * @swagger
 * /api/drinks/{id}:
 *   put:
 *     summary: Update a drink
 *     tags: [Drinks]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The drink id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DrinkPost'
 *     responses:
 *       200:
 *         description: The drink was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DrinkPost'
 *       500:
 *         description: Some server error
 */
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser = req.body;
        const id = req.params.id
        if (!updatedUser) {
            throw new ParamMissingError();
        }
        const newEntry = await new Drink({ id }).save(updatedUser);
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Remove the drinks entry
 * @swagger
 * /api/drinks/{id}:
 *   delete:
 *     summary: Remove the drinks entry
 *     tags: [Drinks]
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
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Returns the list of drink types
 * @swagger
 * /api/drinks/types:
 *   get:
 *     summary: Returns the list of drink types
 *     tags: [DrinkTypes]
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
        const drink_types = await new DrinkType().fetchAll();//{ withRelated: "drinks" }
        return res.status(200).json(drink_types);
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
    else
        return res.status(500).send(error)
    }
});

/** Create a new drink type
 * @swagger
 * /api/drinks/types:
 *   post:
 *     summary: Create a new drink type
 *     tags: [DrinkTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DrinkTypePost'
 *     responses:
 *       200:
 *         description: The drink type was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DrinkTypePost'
 *       500:
 *         description: Some server error
 */
router.post('/types', validateBody(_schema.IDrinkType), async (req: RequestBody<IDrinkType>, res: Response) => {
    try {
        const newEntry = await new DrinkType().save({
            type: req.body.type
        });
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Update a drink type
 * @swagger
 * /api/drinks/types/{id}:
 *   put:
 *     summary: Update a drink type
 *     tags: [DrinkTypes]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The drink type id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DrinkTypePost'
 *     responses:
 *       200:
 *         description: The drink type was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DrinkTypePost'
 *       500:
 *         description: Some server error
 */
router.put('/types/:id', async (req: Request, res: Response) => {
    try {
        const updatedDrinkType = req.body;
        const id = req.params.id
        if (!updatedDrinkType) {
            throw new ParamMissingError();
        }
        const newEntry = await new DrinkType({ id }).save(updatedDrinkType);
        return res.status(OK).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Remove the drink type entry
 * @swagger
 * /api/drinks/types/{id}:
 *   delete:
 *     summary: Remove the drink type entry
 *     tags: [DrinkTypes]
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
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

// Export default
export default router;