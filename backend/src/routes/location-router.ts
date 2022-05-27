import { Router, Request, Response } from 'express';
import { Location, ILocation } from '@models/location'

const router = Router()

/** Location object
 * @swagger
 * components:
 *   schemas:
 *     location:
 *       type: object
 *       required:
 *         - id
 *         - title
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
 *         title:
 *           type: string
 *           description: The location's title
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

/** Returns the list of all location
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
        console.log(location)
        return res.status(200).send(location)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
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

/** Create a new location
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

/** Remove the location entry
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
 router.get('/:lat' + '/:long', async (req: Request, res: Response) => {      
    try {        
    NearestCity(parseInt(req.params.lat), parseInt(req.params.long));    
    async function NearestCity(latitude: any, longitude: any) {
    const locationsJSON = await new Location().fetchAll()     
        
    const x = locationsJSON.toJSON();
    const result = x.map(Object.values);

    var minDif = Number.MAX_SAFE_INTEGER;
    let closest: any;

    for (let index = 0; index < result.length; ++index) {
      var dif = PythagorasEquirectangular(latitude, longitude, result[index][6], result[index][7]);
      if (dif < minDif) {
        closest = index;
        minDif = dif;
      }
    }  
        //We return lat and long of the closest location
        var lat = result[closest][6];
        var long = result[closest][7];

        return res.status(200).send({latitude: lat, longitude: long});    
        //return res.status(200).send(result);
    }   
    } catch (error: any) {
        console.log(error)
        if (error?.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})

// Calculate from Degrees to Radians
function Deg2Rad(deg: any) {
    return deg * Math.PI / 180;
}

// Calculate Pythagoras equation
function PythagorasEquirectangular(lat1: any, lon1: any, lat2: any, lon2: any) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

export default router