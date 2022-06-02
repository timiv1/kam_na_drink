import { bookshelf } from './bookshelf'
import { Drink } from './drink';
import { Menu } from './menu';

const DrinkMenu = bookshelf.model("DrinkMenu", {
    tableName: 'drinks_menus',
    drink() {
        return this.belongsTo(Drink);
    },
    menu() {
        return this.belongsTo(Menu);
    },
});

export { DrinkMenu };