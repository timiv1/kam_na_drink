import { Router, Request, Response } from 'express';
import { Bar } from '@models/bar'
import { WorkTimeBar } from '@models/work_time_bar'
import { IBar } from '@models/schema_definitions'
import _schema from '@shared/_schema';
import validateBody from 'src/middleware/validateBody';

const router = Router();
type RequestBody<T> = Request<{}, {}, T>;

/** Bar object
 * @swagger
 * components:
 *   schemas:
 *     Bar:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the bar
 *         name:
 *           type: string
 *           description: Name of the bar
 *         location_id:
 *           type: number
 *           description: Location_id of the bar
 *         contact_id:
 *           type: number
 *           description: Contact_id of the bar
 */

/** BarPost object
 * @swagger
 * components:
 *   schemas:
 *     BarPost:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the bar
 *         location_id:
 *           type: number
 *           description: Location_id of the bar
 *         contact_id:
 *           type: number
 *           description: Contact_id of the bar
 */

/** Work_time_bar object
 * @swagger
 * components:
 *   schemas:
 *     work_time_bar:
 *       type: object
 *       required:
 *         - bar_id
 *         - work_time_id
 *       properties:
 *         bar_id:
 *           type: integer
 *           description: id of Bar
 *         work_time_id:
 *           type: integer
 *           description: id of work_time
 */

/** Returns the list of all bars
 * @swagger
 * /api/bars:
 *   get:
 *     summary: Returns the list of all bars
 *     tags: [Bars]
 *     responses:
 *       200:
 *         description: The list of the bars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bar'
 */
router.get('/', async (_: Request, res: Response) => {
  try {
    const bars = await new Bar().fetchAll({ withRelated: "location" })
    return res.status(200).send(bars)
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

/** Get the bar by id
 * @swagger
 * /api/bars/{id}:
 *   get:
 *     summary: Get the bar by id
 *     tags: [Bars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bar id
 *     responses:
 *       200:
 *         description: The Bar by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bar'
 *       404:
 *         description: The bar was not found
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const bar = await new Bar({ id }).fetch({ withRelated: ["location", "contact", "work_times_bars.workTime", "menu.drinks.drink"] })
    console.log('bar')
    return res.status(200).send(bar)
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

/** Get the work_time by bar_id
 * @swagger
 * /api/bars/{id}/work_time:
 *   get:
 *     summary: Get the work_time by bar_id
 *     tags: [Bars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bar id
 *     responses:
 *       200:
 *         description: The worktimes
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/work_time_bar'
 *       404:
 *         description: The bar was not found
 */
router.get('/:id/work_time', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const workTimeBar = await new WorkTimeBar().where({ bar_id: id }).fetchAll({ withRelated: ["workTime"], omitPivot: false }
    )
    console.log('bar')
    return res.status(200).send(workTimeBar)
  } catch (error) {
    console.log(error)
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

/** Create a new Bar
 * @swagger
 * /api/bars:
 *   post:
 *     summary: Create a new bar
 *     tags: [Bars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarPost'
 *     responses:
 *       200:
 *         description: The Bar was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarPost'
 *       500:
 *         description: Some server error
 */
router.post('/', validateBody(_schema.IBar), async (req: RequestBody<IBar>, res: Response) => {
  try {
    const newBar = await new Bar().save({
      name: req.body.name,
      location_id: req.body.location_id,
      contact_id: req.body.contact_id
    });
    return res.status(200).json(newBar);
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

/** Connect work_time to bar
 * @swagger
 * /api/bars/barworktime:
 *   post:
 *     summary: Connect work_time to bar
 *     tags: [Bars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/work_time_bar'
 *     responses:
 *       200:
 *         description: The work_time_bar was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/work_time_bar'
 *       500:
 *         description: Some server error
 */
router.post('/barworktime', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(500).send("missing parameter")
    }
    const workTimeBar = await new WorkTimeBar().save(data);
    console.log(workTimeBar)
    return res.status(200).json(workTimeBar);
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }

});

/** Update the bar by the id
 * @swagger
 * /api/bars/{id}:
 *  put:
 *    summary: Update the bar by the id
 *    tags: [Bars]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The bar id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BarPost'
 *    responses:
 *      200:
 *        description: The Bar was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BarPost'
 *      404:
 *        description: The Bar was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedBar = req.body;
    const id = req.params.id
    if (!updatedBar) {
      return res.status(500).send("missing parameter")
    }
    const newEntry = await new Bar({ id }).save(updatedBar);
    return res.status(200).json(newEntry);
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

/** Delete connection between work_time and bar
 * @swagger
 * /api/bars/{barId}/work_time/{workTimeBarId}:
 *   delete:
 *     summary: Delete connection between work_time and bar
 *     tags: [Bars]
 *     parameters:
 *      - in: path
 *        name: barId
 *        schema:
 *          type: integer
 *        required: true
 *        description: The bar id
 *      - in: path
 *        name: workTimeBarId
 *        schema:
 *          type: integer
 *        required: true
 *        description: The workTimeBar id
 *     responses:
 *       200:
 *         description: The work_time_bar was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/work_time_bar'
 *       500:
 *         description: Some server error
 */
// TODO:??? delete worktimes for bar bar/1/work_times odstrani worktime maping
router.delete('/:barId/work_time/:workTimeBarId', async (req: Request, res: Response) => {
  try {
    // ??? const barId = req.params.barId
    const id = req.params.workTimeBarId
    const data = req.body;
    if (!data) {
      return res.status(500).send("missing parameter")
    }
    const workTimeBar = await new WorkTimeBar({ id }).destroy()
    return res.status(200).json(workTimeBar);
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

/** Remove the bar by id
 * @swagger
 * /api/bars/{id}:
 *   delete:
 *     summary: Remove the bar by id
 *     tags: [Bars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bar id
 * 
 *     responses:
 *       200:
 *         description: The bar was deleted
 *       404:
 *         description: The bar was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(500).send("missing parameter")

    }
    await new Bar({ id }).destroy()
    return res.sendStatus(200)
  } catch (error) {
    if (error.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(error)
  }
});

export default router