import { bookshelf } from '@models/bookshelf'
import { DrinkMenu } from '@models/drink_menu'
import { Bar } from '@models/bar'

interface IMenu {
    id: number;
    title: string;
}

const Menu = bookshelf.model("Menu", {
    tableName: 'menus',
    drinks() {
        return this.hasMany(DrinkMenu);
    },
    bars() {
        return this.hasMany(Bar)
    }
});

export { Menu, IMenu };