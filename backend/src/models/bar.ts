import { bookshelf } from '@models/bookshelf'
import { WorkTime } from "@models/workTime"
import { Contact } from "@models/contact"
import { Location } from "@models/location"
import { Menu } from "@models/menu"
import { BarUser } from "@models/bar_user"

interface IBar {
    id: number;
    name: string;
    menu_id: number;
    location_id: number;
    contact_id: number;
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
        
    },
    menu() {
        return this.belongsTo(Menu);
    },
    users() {
        return this.hasMany(BarUser);
    }
    
});

export { Bar, IBar };