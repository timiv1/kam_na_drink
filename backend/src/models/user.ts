import { bookshelf } from './bookshelf'
import { DrinkUser } from './drink_user';
import { BarUser } from './bar_user';

export interface IAuth {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}


const User = bookshelf.model("User", {
    tableName: 'users',
    drinks() {
        return this.hasMany(DrinkUser);
    },
    bars() {
        return this.hasMany(BarUser);
    }
});

export { User };