import { Router, Request, Response } from 'express';
import { Location, ILocation } from '@models/location'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     location:
 *       type: object
 *       required:
 *         - title
 *         - street
 *         - post_number
 *         - city
 *         - country
 *         - GPS_coordinates
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the location
 *         title:
 *           type: string
 *           description: The location title
 *         street:
 *           type: string
 *           description: The location title
 *         post_number:
 *           type: integer
 *           description: The auto-generated id of the location
 *         city:
 *           type: string
 *           description: The location title
 *         country:
 *           type: string
 *           description: The location title
 *         GPS_coordinates:
 *           type: string
 *           description: The auto-generated id of the location
 */

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: Returns the list of all location
 *     tags: [location]
 *     responses:
 *       200:
 *         description: The list of the location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/location'
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        const location = await new Location().fetchAll()
        return res.status(200).send(location)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

/**
 * @swagger
 * /api/location/{id}:
 *   get:
 *     summary: Get the location by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The location id
 *     tags: [location]
 *     responses:
 *       200:
 *         description: location by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/location'
 *       404:
 *         description: The location was not found
 */

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const location = await new Location({ id }).fetch()
        return res.status(200).send(location)
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
 * /api/location:
 *   post:
 *     summary: Create a new location
 *     tags: [location]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/location'
 *     responses:
 *       200:
 *         description: The location was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/location'
 *       500:
 *         description: Some server error
 */

router.post('/', async (req: Request, res: Response) => {
    try {
        let data = req.body;
        if (!data) {
            return res.status(500).send("missing parameter")
        }
        const location = await new Location().save(data);
        return res.status(200).json(location);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

});

/**
 * @swagger
 * /api/location/{id}:
 *   delete:
 *     summary: Remove the location entry
 *     tags: [location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The location id
 * 
 *     responses:
 *       200:
 *         description: The location was deleted
 *       404:
 *         description: The location was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(500).send("missing parameter")
        }
        const location = await new Location({ id }).destroy()
        return res.sendStatus(200)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
});

export default router