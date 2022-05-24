import { bookshelf } from '@models/bookshelf'
import { Bar } from './bar';
import { User } from './user';

interface IBarUser {
    id: number;
    bar_id: number;
    user_id: number;
}

const BarUser = bookshelf.model("BarsUser", {
    tableName: 'bars_users',
    bar() {
        return this.belongsTo(Bar);
    },
    user() {
        return this.belongsTo(User);
    },
});

export { BarUser, IBarUser };