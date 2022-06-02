import { Router, Request, Response } from 'express';
import { WorkTime } from '@models/workTime'
import { IWorkTime } from '@models/schema_definitions'
import _schema from '@shared/_schema';
import validateBody from 'src/middleware/validateBody';

const router = Router()

type RequestBody<T> = Request<{}, {}, T>;

/** Work_time object
 * @swagger
 * components:
 *   schemas:
 *     Work_time:
 *       type: object
 *       required:
 *         - id
 *         - day
 *         - from
 *         - to
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the bar
 *         day:
 *           type: string
 *           description: Day of the week
 *         from:
 *           type: string
 *           description: opneing hour
 *         to:
 *           type: string
 *           description: closing hour
 */

/** Work_timePost object
 * @swagger
 * components:
 *   schemas:
 *     Work_timePost:
 *       type: object
 *       required:
 *         - day
 *         - from
 *         - to
 *       properties:
 *         day:
 *           type: string
 *           description: Day of the week
 *         from:
 *           type: string
 *           description: opneing hour
 *         to:
 *           type: string
 *           description: closing hour
 */

/** Returns the list of all work_times
 * @swagger
 * /api/work_times:
 *   get:
 *     summary: Returns the list of all work_times
 *     tags: [WorkTimes]
 *     responses:
 *       200:
 *         description: The list of the workTimes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Work_time'
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const workTimes = await new WorkTime().fetchAll()
        return res.status(200).send(workTimes)
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})

/** Get the worktime by id
 * @swagger
 * /api/work_times/{id}:
 *   get:
 *     summary: Get the worktime by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The work_time id
 *     tags: [WorkTimes]
 *     responses:
 *       200:
 *         description: work_time by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Work_time'
 *       404:
 *         description: The work_time was not found
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const workTimes = await new WorkTime({ id }).fetch()
        return res.status(200).send(workTimes)
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
})

// TODO: ???
// add work time (day hours) to bar

/** Create a new work_time
 * @swagger
 * /api/work_times:
 *   post:
 *     summary: Create a new work_time
 *     tags: [WorkTimes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Work_timePost'
 *     responses:
 *       200:
 *         description: The work_time was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work_timePost'
 *       500:
 *         description: Some server error
 */
router.post('/', validateBody(_schema.IWorkTime), async (req: RequestBody<IWorkTime>, res: Response) => {
    try {
        const workTime = await new WorkTime().save({
            day: req.body.day,
            from: req.body.from,
            to: req.body.from
        });
        return res.status(200).json(workTime);
    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }

});

/** Remove the work_time entry
 * @swagger
 * /api/work_times/{id}:
 *   delete:
 *     summary: Remove the work_time entry
 *     tags: [WorkTimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The work_time id
 * 
 *     responses:
 *       200:
 *         description: The work_time was deleted
 *       404:
 *         description: The work_time was not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(500).send("missing parameter")
        }
        const workTime = await new WorkTime({ id }).destroy()
        return res.sendStatus(200)

    } catch (error) {
        if (error.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(error)
    }
});

//TODO: ???
// put worktimes for bar  work_times/1 edit worktime with id
// delete worktime for bar  work_times/1 odstrani worktime iz worktime tabele in mapinge
// or disable deleting until all the mapings are removed
// get worktimes/1/bars get bars with specific worktime

export default router