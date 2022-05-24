import { bookshelf } from '@models/bookshelf'
import { Local } from './local';
import { User } from './user';

interface ILocalUser {
    id: number;
    localId: number;
    userId: number;
}

const LocalUser = bookshelf.model("LocalsUser", {
    tableName: 'locals_users',
    local() {
        return this.belongsTo(Local);
    },
    user() {
        return this.belongsTo(User);
    },
});

export { LocalUser, ILocalUser };