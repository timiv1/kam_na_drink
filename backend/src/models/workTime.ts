import { bookshelf } from "./bookshelf";
import { Bar } from "./bar"
import { WorkTimeBar } from "./work_time_bar"

const WorkTime = bookshelf.model("WorkTime", {
    tableName: "work_times",
    bars() {
        return this.belongsToMany(Bar, 'work_times_bars', 'bar_id', 'work_time_id')
    },
    workTimeBar() {
        return this.hasMany(WorkTimeBar)
    }
})
export {  WorkTime }