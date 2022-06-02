import { bookshelf } from './bookshelf'
import { Bar } from './bar';
import { User } from './user';

const BarUser = bookshelf.model("BarsUser", {
    tableName: 'bars_users',
    bars() {
        return this.belongsTo(Bar);
    },
    user() {
        return this.belongsTo(User);
    },
});

export { BarUser };