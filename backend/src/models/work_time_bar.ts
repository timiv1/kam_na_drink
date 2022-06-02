import { bookshelf } from './bookshelf'

const WorkTimeBar = bookshelf.model("WorkTimeBar", {
    tableName: 'work_times_bars',
    bar() {
        return this.belongsTo('Bar')
    },
    workTime() {
        return this.belongsTo('WorkTime')
    }
});

export { WorkTimeBar };