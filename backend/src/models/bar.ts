import { bookshelf } from '@models/bookshelf'
import { WorkTime } from "@models/workTime"
import { Contact } from "@models/contact"
import { Location } from "@models/location"

interface IBar {
    id: number;
    name: string;
}

const Bar = bookshelf.model("Bar", {
    tableName: 'bars',
    work_times() {
        return this.belongsToMany(WorkTime, 'work_times_bars', 'work_time_id', 'bar_id')
    },
    contact() {
        return this.belongsTo(Contact)
    },
    location() {
        return this.belongsTo(Location)
    }
});

export { Bar, IBar };