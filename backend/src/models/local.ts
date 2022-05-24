import { bookshelf } from '@models/bookshelf'
import { LocalUser } from './local_user';

interface ILocal {
    id: number;
    title: string;
    menuId: number;
    locationId: number;
    contactId: number;
}

const Local = bookshelf.model("Local", {
    tableName: 'locals',
    users() {
        return this.hasMany(LocalUser);
    }
});

export { Local, ILocal };