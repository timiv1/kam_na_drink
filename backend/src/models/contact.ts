import { bookshelf } from "@models/bookshelf";
import { Bar } from "@models/bar"

interface IContact {
    id: number,
    phone: string,
    email: string,
}

const Contact = bookshelf.model("Contact", {
    tableName: "contacts",
    bar() {
        return this.hasOne(Bar)
    }
})
export { IContact, Contact }