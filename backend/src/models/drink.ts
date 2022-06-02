import { bookshelf } from './bookshelf'
import { DrinkUser } from './drink_user'
import { DrinkType} from './drink_type'
import { DrinkMenu} from './drink_menu'

const Drink = bookshelf.model("Drink", {
    tableName: 'drinks',
    users() {
        return this.hasMany(DrinkUser);
    },
    drink_type() {
        return this.belongsTo(DrinkType);
    },
    drinkmenus() {
        return this.hasMany(DrinkMenu);
    }
});

export { Drink };