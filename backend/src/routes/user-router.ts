import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { User } from '@models/user';
import { DrinkUser } from '@models/drink_user';
import { BarUser } from '@models/bar_user';
import extractJWT from 'src/middleware/extractJWT';
import { IDrinkUser, IBarUser } from '@models/schema_definitions'
import _schema from '@shared/_schema';
import validateBody from 'src/middleware/validateBody';

const router = Router();
const { OK } = StatusCodes;

type RequestBody<T> = Request<{}, {}, T>;

/** User object
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - id
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         first_name:
 *           type: string
 *           description: first_name of the user
 *         last_name:
 *           type: string
 *           description: last_name of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password of the user
 */

/** UserPost object
 * @swagger
 * components:
 *   schemas:
 *     UserPost:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: first_name of the user
 *         last_name:
 *           type: string
 *           description: last_name of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password of the user
 */

/** UsersDrinks object
 * @swagger
 * components:
 *   schemas:
 *     usersdrinks:
 *       type: object
 *       required:
 *        - user_id
 *        - drink_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user drink
 *         drink_id:
 *           type: integer
 *           description: Drink id key
 *         user_id:
 *           type: integer
 *           description: User id key
 */

/** UsersDrinksPost object
 * @swagger
 * components:
 *   schemas:
 *     UsersDrinksPost:
 *       type: object
 *       required:
 *        - user_id
 *        - drink_id
 *       properties:
 *         drink_id:
 *           type: integer
 *           description: Drink id key
 *         user_id:
 *           type: integer
 *           description: User id key
 */

/** UsersBar object
 * @swagger
 * components:
 *   schemas:
 *     userbar:
 *       type: object
 *       required:
 *        - id
 *        - bar_id
 *        - drink_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user bar
 *         bar_id:
 *           type: integer
 *           description: Bar id key
 *         user_id:
 *           type: integer
 *           description: User id key
 */

/** UsersBarPost object
 * @swagger
 * components:
 *   schemas:
 *     UsersBarPost:
 *       type: object
 *       required:
 *        - bar_id
 *        - drink_id
 *       properties:
 *         bar_id:
 *           type: integer
 *           description: Bar id key
 *         user_id:
 *           type: integer
 *           description: User id key
 */

/** Returns the list of all users
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
router.get('/', async (_: Request, res: Response) => {
    try {
        const users = await new User().fetchAll({});
        return res.status(200).send(users);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/**Get the user by id
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The users id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: user by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await new User({ id }).fetch({ withRelated: ["drinks.drink", "bars.bar"] });
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

// /** Create a new user
//  * @swagger
//  * /api/users:
//  *   post:
//  *     summary: Create a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/user'
//  *     responses:
//  *       200:
//  *         description: The user was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/user'
//  *       500:
//  *         description: Some server error
//  */
// router.post(p.add, async (req: Request, res: Response) => {
//     try {
//         const newUser = req.body;
//         if (!newUser) {
//             throw new ParamMissingError();
//         }
//         const newEntry = await new User().save(newUser);
//         return res.status(CREATED).json(newEntry);
//     } catch (error) {
//         console.log(error);
//     }
// });

/** Update a user
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPost'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPost'
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
        const newEntry = await new User({ id }).save(updatedUser);
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Remove the user entry
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove the user entry
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new User({ id }).destroy();
        return res.status(200).end();
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Returns the list of all user drinks
 * @swagger
 * /api/users/userdrinks/all:
 *   get:
 *     summary: Returns the list of all user drinks
 *     tags: [UserDrinks]
 *     responses:
 *       200:
 *         description: The list of the user drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usersdrinks'
 */
router.get('/userdrinks/all', extractJWT, async (_: Request, res: Response) => {
    try {
        const drinks_users = await new DrinkUser().fetchAll({});
        return res.status(200).json({ drinks_users: drinks_users });
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Get all users drinks by user Id
 * @swagger
 * /api/users/{id}/userdrinks:
 *   get:
 *     summary: Get all users drinks by user Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: All users drinks by user Id
 *     tags: [UserDrinks]
 *     responses:
 *       200:
 *         description: drink by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usersdrinks'
 *       404:
 *         description: The user drink was not found
 */
router.get('/:id/userdrinks', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user_drinks = await new DrinkUser().where({ user_id: id }).fetchAll({ withRelated: "drink" });
        return res.status(200).json(user_drinks);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Create a user drink
 * @swagger
 * /api/users/userdrinks:
 *   post:
 *     summary: Create a user drink
 *     tags: [UserDrinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersDrinksPost'
 *     responses:
 *       200:
 *         description: The User drink was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersDrinksPost'
 *       500:
 *         description: Some server error
 */
router.post('/userdrinks', validateBody(_schema.IDrinkUser), async (req: RequestBody<IDrinkUser>, res: Response) => {
    try {
        const newEntry = await new DrinkUser().save({
            drink_id: req.body.drink_id,
            user_id: req.body.user_id
        });
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Delete a user's drink
 * @swagger
 * /api/users/userdrinks/{id}:
 *   delete:
 *     summary: Delete a user's drink
 *     tags: [UserDrinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The UserDrink id
 * 
 *     responses:
 *       200:
 *         description: The user drink was deleted
 *       404:
 *         description: The user drink was not found
 */
router.delete('/userdrinks/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new DrinkUser({ id }).destroy();
        return res.status(200).end();
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Returns the list of all user bars
 * @swagger
 * /api/users/userbars/all:
 *   get:
 *     summary: Returns the list of all user bars
 *     tags: [UserBars]
 *     responses:
 *       200:
 *         description: The list of the bars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/userbar'
 */
router.get('/userbars/all', async (_: Request, res: Response) => {
    try {
        const bars_users = await new BarUser().fetchAll({ withRelated: "bar" });
        return res.status(OK).json({ bars_users: bars_users });
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Get all users bars by user Id
 * @swagger
 * /api/users/{id}/userbars:
 *   get:
 *     summary: Get all users bars by user Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: All users bars by user Id
 *     tags: [UserBars]
 *     responses:
 *       200:
 *         description: user bar by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/userbar'
 *       404:
 *         description: The user bar was not found
 */
router.get('/:id/userbars', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const users_bars = await new BarUser().where({ user_id: id }).fetchAll({ withRelated: "bar" });
        return res.status(OK).json(users_bars);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Create a user bar
 * @swagger
 * /api/users/userbars:
 *   post:
 *     summary: Create a user bar
 *     tags: [UserBars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersBarPost'
 *     responses:
 *       200:
 *         description: The User bar was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersBarPost'
 *       500:
 *         description: Some server error
 */
router.post('/userbars', validateBody(_schema.IBarUser), async (req: RequestBody<IBarUser>, res: Response) => {
    try {
        const newEntry = await new BarUser().save({
            bar_id: req.body.bar_id,
            user_id: req.body.user_id
        });
        return res.status(200).json(newEntry);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Delete a user's bar
 * @swagger
 * /api/users/{id}/userbars:
 *   delete:
 *     summary: Delete a user's bar
 *     tags: [UserBars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user bar was deleted
 *       404:
 *         description: The user bar was not found
 */
router.delete('/:id/userbars', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            throw new ParamMissingError();
        }
        await new BarUser({ id }).destroy();
        return res.status(OK).end();
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

// Export default
export default router