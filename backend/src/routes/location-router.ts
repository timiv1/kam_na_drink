import { Router, Request, Response } from 'express';
import { Location } from '@models/location'
import PythagorasEquirectangular from 'src/functions/pythagorasHelper';
import { ILocation } from '@models/schema_definitions'
import _schema from '@shared/_schema';
import validateBody from 'src/middleware/validateBody';

const router = Router()

type RequestBody<T> = Request<{}, {}, T>;

/** Location object
 * @swagger
 * components:
 *   schemas:
 *     location:
 *       type: object
 *       required:
 *         - id
 *         - street
 *         - post_number
 *         - city
 *         - country
 *         - long
 *         - lat
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the location
 *         street:
 *           type: string
 *           description: The location's street
 *         post_number:
 *           type: integer
 *           description: The location's post_number
 *         city:
 *           type: string
 *           description: The location's city
 *         country:
 *           type: string
 *           description: The location's country
 *         long:
 *           type: number
 *           description: The location's longitude's value
 *         lat:
 *           type: number
 *           description: The location's latitude's value
 */

/** LocationPost object
 * @swagger
 * components:
 *   schemas:
 *     LocationPost:
 *       type: object
 *       required:
 *         - street
 *         - post_number
 *         - city
 *         - country
 *         - long
 *         - lat
 *       properties:
 *         street:
 *           type: string
 *           description: The location's street
 *         post_number:
 *           type: integer
 *           description: The location's post_number
 *         city:
 *           type: string
 *           description: The location's city
 *         country:
 *           type: string
 *           description: The location's country
 *         long:
 *           type: number
 *           description: The location's longitude's value
 *         lat:
 *           type: number
 *           description: The location's latitude's value
 */


/** Returns the list of all locations
 * @swagger
 * /api/location:
 *   get:
 *     summary: Returns the list of all location
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: The list of the locations
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
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})

/** Get the location by id
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
 *     tags: [Locations]
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
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})

/** Create a new location
 * @swagger
 * /api/location:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationPost'
 *     responses:
 *       200:
 *         description: The location was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationPost'
 *       500:
 *         description: Some server error
 */
router.post('/', validateBody(_schema.ILocation), async (req: RequestBody<ILocation>, res: Response) => {
    try {
        const location = await new Location().save({
            street: req.body.street,
            post_number: req.body.post_number,
            city: req.body.city,
            country: req.body.country,
            long: req.body.long,
            lat: req.body.lat
        });
        return res.status(200).json(location);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }

});

/** Remove the location entry
 * @swagger
 * /api/location/{id}:
 *   delete:
 *     summary: Remove the location entry
 *     tags: [Locations]
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
        await new Location({ id }).destroy()
        return res.sendStatus(200)

    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

/** Get the closest location based on inputed latitude and longitude
 * @swagger
 * /api/location/{lat}/{long}:
 *   get:
 *     summary: Get the closest locations based on current location
 *     parameters:
 *      - in: path
 *        name: lat
 *        schema:
 *          type: number
 *        required: true
 *        description: The latitude value
 *      - in: path
 *        name: long
 *        schema:
 *          type: number
 *        required: true
 *        description: The longitude value
 *     tags: [Locations]
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
router.get('/:lat' + '/:long', async (req: Request, res: Response) => {
    try {
    const latitude = parseFloat(req.params.lat)
    const longitude = parseFloat(req.params.long)

    const locations = await new Location().fetchAll({withRelated: 'bar'})

    const locationsJSON = locations.toJSON();
    const result = locationsJSON.map(Object.values);

    for (let index = 0; index < result.length; ++index) { 
        const dif = PythagorasEquirectangular.PythagorasEquirectangular(latitude, longitude, result[index][5], result[index][6]);
        result[index].push(dif)
    }

    const citiesSortedByAsc = result.sort((a: any, b: any) => a[8] - b[8])
    const arrCitiesSorted: { id: number; title: string; lat: number; long: number; distance: number; bar: any }[] = []

    citiesSortedByAsc.forEach((element: any[]) => {
        arrCitiesSorted.push({
            'id': element[0],
            'title': element[1],
            'lat': element[5],
            'long': element[6],
            'bar': element[7],
            'distance': element[8]
        })
    });
    return res.status(200).send(arrCitiesSorted);

    } catch (error) {
            if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})

export default router