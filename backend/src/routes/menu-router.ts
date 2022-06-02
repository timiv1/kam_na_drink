import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { Menu } from '@models/menu'
import { DrinkMenu } from '@models/drink_menu';
import { IMenu, IDrinkMenu } from '@models/schema_definitions'
import _schema from '@shared/_schema';
import validateBody from 'src/middleware/validateBody';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

const menudrinks: string = "/menudrinks";

type RequestBody<T> = Request<{}, {}, T>;

/** Menu object
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - id
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the menu
 *         title:
 *           type: string
 *           description: Name of the menu
 *         bar_id:
 *           type: integer
 *           description: Id of the bar
 */

/** MenuPost object
 * @swagger
 * components:
 *   schemas:
 *     MenuPost:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Name of the menu
 *         bar_id:
 *           type: integer
 *           description: Id of the bar
 */

/** MenuDrink object
 * @swagger
 * components:
 *   schemas:
 *     MenuDrink:
 *       type: object
 *       required:
 *         - id
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the menu drink
 *         price:
 *           type: number
 *           description: Price of the menu Drink
 *         drink_id:
 *           type: number
 *           description: Id of the drink
 *         menu_id:
 *           type: number
 *           description: Id of the menu
 */

/** MenuDrinkPost object
 * @swagger
 * components:
 *   schemas:
 *     MenuDrinkPost:
 *       type: object
 *       required:
 *         - price
 *       properties:
 *         price:
 *           type: number
 *           description: Price of the menu Drink
 *         drink_id:
 *           type: number
 *           description: Id of the drink
 *         menu_id:
 *           type: number
 *           description: Id of the menu
 */


/** Returns the list of all menus
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Returns the list of all menus
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: The list of the menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get('/', async (_: Request, res: Response) => {
    try {
        const menus = await new Menu().fetchAll({ withRelated: "drinks" });
        return res.status(200).json({ menus });
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }
});

/** Get the menu by id
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Get the menu by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The menu id
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: menu by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: The menu was not found
 */
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const menu = await new Menu({ id }).fetch({ withRelated: "drinks" });
        return res.status(200).json(menu);
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }

});

/** Create a new menu
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuPost'
 *     responses:
 *       200:
 *         description: The menu was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuPost'
 *       500:
 *         description: Some server error
 */
router.post('/', validateBody(_schema.IMenu), async (req: RequestBody<IMenu>, res: Response) => {
    try {
        const newEntry = await new Menu().save({
            title: req.body.title,
            bar_id: req.body.bar_id
        });
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }
});

/** Remove the menu entry
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Remove the menu entry
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The menu id
 * 
 *     responses:
 *       200:
 *         description: The menu was deleted
 *       404:
 *         description: The menu was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new Menu({ id }).destroy();
        return res.status(200).end();
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }

});


/** Returns the list of all menu drinks
 * @swagger
 * /api/menus/menudrinks:
 *   get:
 *     summary: Returns the list of all menu drinks
 *     tags: [MenuDrinks]
 *     responses:
 *       200:
 *         description: The list of the menu drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuDrink'
 */
router.get(menudrinks, async (_: Request, res: Response) => {
    try {
        const menus_drinks = await new DrinkMenu().fetchAll();
        return res.status(200).json({ menu_drinks: menus_drinks });
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }

});

/** Get all menu drinks by menu_id
 * @swagger
 * /api/menus/{id}/menudrinks/:
 *   get:
 *     summary: Get the drinks by menu_id
 *     parameters:
 *      - in: path
 *        name: menu_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The menu id
 *     tags: [MenuDrinks]
 *     responses:
 *       200:
 *         description: drinks by menu_id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuDrink'
 *       404:
 *         description: The drinks were not found
 */
router.get("/:id"+ menudrinks, async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const menu_drinks = await new DrinkMenu().where({ menu_id: id }).fetchAll({ withRelated: "drink" });
        return res.status(200).json(menu_drinks);
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }
});

/** Get all menu drinks by menu_id and drink_type_id
 * @swagger
 * /api/menus/menudrinks/{id}/types/{drink_type_id}:
 *   get:
 *     summary: Get the menu drinks by drink_type_id and menu_id
 *     parameters:
 *      - in: path
 *        name: drink_type_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The menu drink_type id
 *     tags: [MenuDrinks]
 *     responses:
 *       200:
 *         description: drinks by menu_id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuDrink'
 *       404:
 *         description: The drinks were not found
 */
router.get(menudrinks + "/:id/types/:drink_type_id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const drink_type_id = req.params.drink_type_id
        const menu_drinks = await new DrinkMenu().where({ menu_id: id }).fetchAll({
            withRelated:
            {
                drink: (query: any) => query.where('drink_type_id', drink_type_id)
            }
        });
        return res.status(200).json(menu_drinks.toJSON().filter((x: any) => Object.keys(x.drink).length > 0)); //filter empty drink objects
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }

});

/** Create a new menu drink
 * @swagger
 * /api/menus/menudrinks:
 *   post:
 *     summary: Create a new menu drink
 *     tags: [MenuDrinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuDrinkPost'
 *     responses:
 *       200:
 *         description: The menu drink was successfuly created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuDrinkPost'
 *       500:
 *         description: Some server error
 */
router.post(menudrinks, validateBody(_schema.IDrinkMenu), async (req: RequestBody<IDrinkMenu>, res: Response) => {
    try {
        const newEntry = await new DrinkMenu().save({
            price: req.body.price,
            drink_id: req.body.drink_id,
            menu_id: req.body.menu_id
        });
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }
});

/** Update a menu drink
 * @swagger
 * /api/menus/menudrinks/{id}:
 *   put:
 *     summary: Update a menu drink by menu drink id
 *     tags: [MenuDrinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuDrink'
 *     responses:
 *       200:
 *         description: The menu drink was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuDrink'
 *       500:
 *         description: Some server error
 */
router.put(menudrinks + "/:id", async (req: Request, res: Response) => {
    try {
        const updatedMenuItem = req.body;
        const id = req.params.id
        if (!updatedMenuItem) {
            throw new ParamMissingError();
        }
        const newEntry = await new DrinkMenu({ id }).save(updatedMenuItem);
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }
});

/** Remove the menu drink by id
 * @swagger
 * /api/menus/menudrinks/{id}:
 *   delete:
 *     summary: Remove the menu drink
 *     tags: [MenuDrinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The menu drink id
 * 
 *     responses:
 *       200:
 *         description: The menu drink was deleted
 *       404:
 *         description: The menu drink was not found
 */
router.delete(menudrinks + "/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new DrinkMenu({ id }).destroy();

        return res.status(200).end();
    } catch (error) {
        if (error.message === "EmptyResponse")
        return res.sendStatus(404)
      else
        return res.status(500).send(error)
    }
});

export default router;
