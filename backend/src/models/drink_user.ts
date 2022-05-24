import { bookshelf } from '@models/bookshelf'
import { Drink } from '@models/drink';
import { User } from '@models/user';

interface IDrinkUser {
    id: number;
    drink_id: number;
    user_id: number;
}

const DrinkUser = bookshelf.model("DrinksUser", {
    tableName: 'drinks_users',
    drink() {
        return this.belongsTo(Drink);
    },
    user() {
        return this.belongsTo(User);
    },
});

export { DrinkUser, IDrinkUser };