import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import { User, IUser } from '@models/user';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';
import signJWT from '../functions/signJWT';
import extractJWT from 'src/middleware/extractJWT';

const router = Router();
const NAMESPACE = 'Auth';
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/',
    add: '/',
    update: '/',
    delete: '/',
} as const;

/** User object
 * @swagger
 * components:
 *   schemas:
 *     userToken:
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


/** Validates the Token
 * @swagger
 * /api/auth/validateToken:
 *   get:
 *     summary: Validates the Token
 *     tags: [userToken]
 *     responses:
 *       200:
 *         description: Validates the Token
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/userToken'
 */
 router.get('/validateToken', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
     logging.info(NAMESPACE, 'Token validated, user authorized.');
     return res.status(200).json({
         message: 'Token(s) validated'
     });
 });
 
 /** Create a new user
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [userToken]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userToken'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userToken'
 *       500:
 *         description: Some server error
 */
 router.post('/register', async (req: Request, res: Response) => {
     let { password } = req.body;
     bcryptjs.hash(password, 10, async (hashError, hash) => {
         if (hashError) {
             return res.status(401).json({
                 message: hashError.message,
                 error: hashError
             });
         }        
 
         try {                        
            const newUser: IUser = req.body;
            newUser.password = hash;
   
            if (!newUser && !hash) {
               throw new ParamMissingError();
            }

            const newEntry = await new User().save(newUser);
            logging.info(NAMESPACE, `User with id ${newEntry.id} inserted.`);
            return res.status(201).json(newEntry);

         } catch (error) {
            logging.error(NAMESPACE, error.message, error);
 
            return res.status(500).json({
                message: error.message,
                error
            });
         }
     })
});

 /** Login a new user
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a new user
 *     tags: [userToken]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userToken'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userToken'
 *       500:
 *         description: Some server error
 */

 router.post('/login', async (req: Request, res: Response) => {
    let password = req.body.password; 
    let email = req.body.email

    const users = await new User().where({ email: email }).fetchAll();
    const usersJSON = users.toJSON();

    await bcryptjs.compare(password, usersJSON[0].password, (error, result) => {
        if (result.valueOf() === false || result.valueOf() === null) {
            return res.status(401).json({
                message: 'Password Mismatch'
            });
        } else if (result) {
            signJWT(usersJSON[0], (_error, token) => {
                if (_error) {
                    return res.status(401).json({
                        message: 'Unable to Sign JWT',
                        error: _error
                    });
                } else if (token) {
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token,
                        user: usersJSON[0]
                    });
                }
            });
        }       
    });
});

export default router