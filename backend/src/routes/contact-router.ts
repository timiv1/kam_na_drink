import { Router, Request, Response } from 'express';
import { Contact, IContact } from '@models/contact'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     contact:
 *       type: object
 *       required:
 *         - id
 *         - phone
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the contact
 *         phone:
 *           type: string
 *           description: Contact's phone number
 *         email:
 *           type: string
 *           description: Contact's email
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Returns the list of all contact
 *     tags: [contact]
 *     responses:
 *       200:
 *         description: The list of the contact
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/contact'
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        const contact = await new Contact().fetchAll()
        return res.status(200).send(contact)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get the contact by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The contact id
 *     tags: [contact]
 *     responses:
 *       200:
 *         description: contact by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/contact'
 *       404:
 *         description: The contact was not found
 */

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const contact = await new Contact({ id }).fetch()
        return res.status(200).send(contact)
    } catch (error: any) {
        console.log(error)
        if (error?.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})


/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/contact'
 *     responses:
 *       200:
 *         description: The contact was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contact'
 *       500:
 *         description: Some server error
 */

router.post('/', async (req: Request, res: Response) => {
    try {
        let data = req.body;
        if (!data) {
            return res.status(500).send("missing parameter")
        }
        const contact = await new Contact().save(data);
        return res.status(200).json(contact);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Remove the contact entry
 *     tags: [contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact id
 * 
 *     responses:
 *       200:
 *         description: The contact was deleted
 *       404:
 *         description: The contact was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(500).send("missing parameter")
        }
        const contact = await new Contact({ id }).destroy()
        return res.sendStatus(200)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
});

export default router