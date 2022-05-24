import { bookshelf } from '@models/bookshelf'
import { DrinkUser } from '@models/drink_user'
import { DrinkType} from '@models/drink_type'
import { DrinkMenu} from '@models/drink_menu'

interface IDrink {
    id: number;
    name: string;
    price: number;
    year: number;
    volume: number;
    alcohol: number;
    description: string;
    drink_type_id: number;
}

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

export { Drink, IDrink };