import { bookshelf } from './bookshelf'
import { DrinkMenu } from './drink_menu'
import { Bar } from './bar'

const Menu = bookshelf.model("Menu", {
    tableName: 'menus',
    drinks() {
        return this.hasMany(DrinkMenu);
    },
    bars() {
        return this.belongsTo(Bar);
    }
});

export { Menu };