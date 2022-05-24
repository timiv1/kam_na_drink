import { bookshelf } from '@models/bookshelf'

interface IWorkTimeBar {
    bar_id: number;
    work_time_id: number;
}

const WorkTimeBar = bookshelf.model("WorkTimeBar", {
    tableName: 'work_times_bars',
    bar() {
        return this.belongsTo('Bar')
    },
    workTime() {
        return this.belongsTo('WorkTime')
    }
});

export { WorkTimeBar, IWorkTimeBar };