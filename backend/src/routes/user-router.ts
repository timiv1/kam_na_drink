import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { User, IUser } from '@models/user';
import { DrinkUser, IDrinkUser } from '@models/drink_user';
import { BarUser } from '@models/bar_user';

const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/',
    add: '/',
    update: '/',
    delete: '/',
} as const;

const drinks: string = "/drinks";
const bars: string = "/bars";
const users: string = "/users";

/**
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

/**
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

/**
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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [user]
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
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const users = await new User().fetchAll({});
        return res.status(OK).send(users);
    } catch (error) {
        console.log(error);
    }
});

/**
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
 *     tags: [user]
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
router.get(p.update + ":id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await new User({ id }).fetch({ withRelated: "drinks" });
        return res.status(OK).json(user);
    } catch (error) {
        console.log(error);
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */
router.put(p.update + ":id", async (req: Request, res: Response) => {
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

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove the user entry
 *     tags: [user]
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
router.delete(p.delete + ":id", async (req: Request, res: Response) => {
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

/**
 * @swagger
 * /api/users/drinks/all:
 *   get:
 *     summary: Returns the list of all user drinks
 *     tags: [usersdrinks]
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

// It doesn't woork with just /drinks for get, that is why /all is added
router.get('/drinks/all', async (_: Request, res: Response) => {
    try {
        const drinks_users = await new DrinkUser().fetchAll({});
        return res.status(OK).json({ drinks_users: drinks_users });
    } catch (error) {
        console.log(error);
    }
});

/**
 * @swagger
 * /api/users/{id}/drinks:
 *   get:
 *     summary: Get all users drinks by user Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: All users drinks by user Id
 *     tags: [usersdrinks]
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
router.get('/:id' + '/drinks', async (req: Request, res: Response) => {
    const id = req.params.id
    const user_drinks = await new DrinkUser().where({ user_id: id }).fetchAll({});
    return res.status(OK).json(user_drinks);
});

/**
 * @swagger
 * /api/users/drinks:
 *   post:
 *     summary: Create a user drink
 *     tags: [usersdrinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usersdrinks'
 *     responses:
 *       200:
 *         description: The User drink was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usersdrinks'
 *       500:
 *         description: Some server error
 */
router.post('/drinks', async (req: Request, res: Response) => {
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

/**
 * @swagger
 * /api/users/{id}/drinks:
 *   delete:
 *     summary: Delete a drink
 *     tags: [usersdrinks]
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
 *         description: The user drink was deleted
 *       404:
 *         description: The user drink was not found
 */
router.delete("/:id" + '/drinks', async (req: Request, res: Response) => {
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

/**
 * @swagger
 * /api/users/bars:
 *   get:
 *     summary: Returns the list of all user bars
 *     tags: [userbar]
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
router.get('/bars', async (_: Request, res: Response) => {
    try {
        const bars_users = await new BarUser().fetchAll({});
        return res.status(OK).json({ bars_users: bars_users });
    } catch (error) {
        console.log(error);
    }
});

/**
 * @swagger
 * /api/users/{id}/bars:
 *   get:
 *     summary: Get all users bars by user Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: All users bars by user Id
 *     tags: [userbar]
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
router.get("/:id" + '/bars', async (req: Request, res: Response) => {
    const id = req.params.id
    const users_bars = await new BarUser().where({ user_id: id }).fetchAll({});
    return res.status(OK).json(users_bars);
});

/**
 * @swagger
 * /api/users/bars:
 *   post:
 *     summary: Create a user bar
 *     tags: [userbar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userbar'
 *     responses:
 *       200:
 *         description: The User bar was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userbar'
 *       500:
 *         description: Some server error
 */
router.post('/bars', async (req: Request, res: Response) => {
    try {
        let newUserBar: IDrinkUser = req.body;
        if (!newUserBar) {
            throw new ParamMissingError();
        }
        const newEntry = await new BarUser().save(newUserBar);
        return res.status(CREATED).json(newEntry);
    } catch (error) {
        console.log(error);
    }
});


/**
 * @swagger
 * /api/users/{id}/bars:
 *   delete:
 *     summary: Delete a bar
 *     tags: [userbar]
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
router.delete("/:id" + '/bars', async (req: Request, res: Response) => {
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