import { bookshelf } from "@models/bookshelf";
import { Bar } from "@models/bar"

interface IWorkTime {
    id: number,
    day: string,
    from: string,
    to: string,
}

const WorkTime = bookshelf.model("WorkTime", {
    tableName: "work_times",
    bars() {
        return this.belongsToMany(Bar, 'work_times_bars', 'bar_id', 'work_time_id')
    },
    workTimeBar() {
        return this.hasMany('WorkTimeBar')
    }
})
export { IWorkTime, WorkTime }