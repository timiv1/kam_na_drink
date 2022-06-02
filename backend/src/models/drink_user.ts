import { bookshelf } from './bookshelf'
import { Drink } from './drink';
import { User } from './user';
import { Bar } from './bar';

const DrinkUser = bookshelf.model("DrinksUser", {
    tableName: 'drinks_users',
    drinks() {
        return this.belongsTo(Drink);
    },
    user() {
        return this.belongsTo(User);
    },
});

export { DrinkUser };