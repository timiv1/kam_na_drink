import { Router, Request, Response } from 'express';
import { WorkTime, IWorkTime } from '@models/workTime'
const router = Router()

/**
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

/**
 * @swagger
 * /api/work_times:
 *   get:
 *     summary: Returns the list of all work_times
 *     tags: [work_time]
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
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

/**
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
 *     tags: [work_time]
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
    } catch (err: any) {
        if (err?.message === "EmptyResponse")
            return res.sendStatus(404)
        else
            return res.status(500).send(err)
    }
})


// TODO: ???
// add work time (day hours) to bar

/**
 * @swagger
 * /api/work_times:
 *   post:
 *     summary: Create a new work_time
 *     tags: [work_time]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Work_time'
 *     responses:
 *       200:
 *         description: The work_time was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work_time'
 *       500:
 *         description: Some server error
 */

router.post('/', async (req: Request, res: Response) => {
    try {
        let data = req.body;
        if (!data) {
            return res.status(500).send("missing parameter")
        }
        const workTime = await new WorkTime().save(data);
        return res.status(200).json(workTime);
    } catch (error) {
        return res.status(500).send(error)
    }

});

/**
 * @swagger
 * /api/work_times/{id}:
 *   delete:
 *     summary: Remove the work_time entry
 *     tags: [work_time]
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
        console.log(error)
        return res.status(500).send(error)
    }
});


//TODO: ???

// put worktimes for bar  work_times/1 edit worktime with id
// delete worktime for bar  work_times/1 odstrani worktime iz worktime tabele in mapinge
// or disable deleting until all the mapings are removed
// get worktimes/1/bars get bars with specific worktime

export default router