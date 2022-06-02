import { bookshelf } from './bookshelf'
import { WorkTime } from "./workTime"
import { Contact } from "./contact"
import { Location } from "./location"
import { Menu } from "./menu"
import { BarUser } from "./bar_user"
import { WorkTimeBar } from './work_time_bar'


const Bar = bookshelf.model("Bar", {
    tableName: 'bars',
    work_times_bars() {
        return this.hasMany(WorkTimeBar);
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