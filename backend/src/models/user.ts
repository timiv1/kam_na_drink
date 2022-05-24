import { bookshelf } from '@models/bookshelf'
import { DrinkUser } from './drink_user';
import { LocalUser } from './local_user';

interface IUser {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

const User = bookshelf.model("User", {
    tableName: 'users',
    drinks() {
        return this.hasMany(DrinkUser);
    },
    locals() {
        return this.hasMany(LocalUser);
    }
});

export { User, IUser };