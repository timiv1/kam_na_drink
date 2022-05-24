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

// try like this if it doesn't work try with examle in docs

export { WorkTimeBar, IWorkTimeBar };