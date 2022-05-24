import { Router, Request, Response } from 'express';
import { Bar, IBar } from '@models/bar'
import { WorkTimeBar, IWorkTimeBar } from '@models/work_time_bar'

const router = Router();

/**
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
 *           description: The bar title
 */

/**
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
 *           description: id of Bra
 *         work_time_id:
 *           type: integer
 *           description: id of work_time
 */

/**
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

router.get('/', async (req: Request, res: Response) => {
  try {
    const bars = await new Bar().fetchAll()
    return res.status(200).send(bars)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
});

/**
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
    const bar = await new Bar({ id }).fetch()
    console.log('bar')
    return res.status(200).json({ bar })
  } catch (err: any) {
    if (err?.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(err)
  }
});


/**
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
    return res.status(200).json({ workTimeBar })
  } catch (err: any) {
    console.log(err)
    if (err?.message === "EmptyResponse")
      return res.sendStatus(404)
    else
      return res.status(500).send(err)
  }
});


/**
 * @swagger
 * /api/bars:
 *   post:
 *     summary: Create a new Bar
 *     tags: [Bars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bar'
 *     responses:
 *       200:
 *         description: The Bar was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bar'
 *       500:
 *         description: Some server error
 */

router.post('/', async (req: Request, res: Response) => {
  try {
    let data = req.body;
    console.log(data)

    if (!data) {
      return res.status(500).send("missing parameter")
    }
    const newBar = await new Bar().save(data);
    return res.status(200).json(newBar);
  } catch (error) {
    return res.status(500).send(error)
  }

});


/**
 * @swagger
 * /api/bars/{id}/work_time:
 *   post:
 *     summary: connect work_time to bar
 *     tags: [Bars]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The bar id
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

// get worktimes for bar  bar/1/work_times
// put worktimes for bar  bar/1/work_times/1 add worktime to bar
// delete worktimes for bar  bar/1/work_times odstrani worktime maping


router.post('/:id/work_time', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    let data: IWorkTimeBar = req.body;
    if (!data) {
      return res.status(500).send("missing parameter")
    }
    const workTimeBar = await new WorkTimeBar().save(data);
    console.log(workTimeBar)
    return res.status(200).json(workTimeBar);
    // res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }

});






/**
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
 *            $ref: '#/components/schemas/Bar'
 *    responses:
 *      200:
 *        description: The Bar was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bar'
 *      404:
 *        description: The Bar was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedBar: IBar = req.body;
    const id = req.params.id
    if (!updatedBar) {
      return res.status(500).send("missing parameter")

    }
    const newEntry = await new Bar({ id }).save(updatedBar);
    return res.status(200).json(newEntry);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
});



/**
 * @swagger
 * /api/bars/{barId}/work_time/{workTimeBarId}:
 *   delete:
 *     summary: delete connection between work_time and Bar
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

// delete worktimes for bar  bar/1/work_times odstrani worktime maping
router.delete('/:barId/work_time/:workTimeBarId', async (req: Request, res: Response) => {
  try {
    const barId = req.params.barId
    const id = req.params.workTimeBarId
    let data: IWorkTimeBar = req.body;
    if (!data) {
      return res.status(500).send("missing parameter")
    }
    const workTimeBar = await new WorkTimeBar({ id }).destroy()
    return res.status(200).json(workTimeBar);
    // res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }

});


/**
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
    return res.status(500).send(error)
  }
});


export default router
