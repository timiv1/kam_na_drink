import { bookshelf } from './bookshelf'
import { WorkTime } from "./workTime"
import { Contact } from "./contact"
import { Location } from "./location"
import { Menu } from "./menu"
import { BarUser } from "./bar_user"


const Bar = bookshelf.model("Bar", {
    tableName: 'bars',
    work_times() {
        return this.belongsToMany(WorkTime, 'work_times_bars', 'work_time_id', 'bar_id');
    },
    contact() {
        return this.belongsTo(Contact);
    },
    location() {
        return this.belongsTo(Location);    
    },
    users() {
        return this.hasMany(BarUser);
    },
    menu() {
        return this.hasMany(Menu);
    }
    
});

export { Bar };