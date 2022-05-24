import { bookshelf } from '@models/bookshelf'
import { DrinkUser } from '@models/drink_user';
import { BarUser } from '@models/bar_user';

interface IUser {
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

export { User, IUser };