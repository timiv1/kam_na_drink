import { bookshelf } from '@models/bookshelf'
import { Drink } from '@models/drink';
import { Menu } from '@models/menu';


interface IDrinkMenu {
    id: number;
    price: number;
    drink_id: number;
    menu_id: number;
}

const DrinkMenu = bookshelf.model("DrinkMenu", {
    tableName: 'drinks_menus',
    drink() {
        return this.belongsTo(Drink);
    },
    menu() {
        return this.belongsTo(Menu);
    },
});

export { DrinkMenu, IDrinkMenu };