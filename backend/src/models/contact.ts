import { bookshelf } from "./bookshelf";
import { Bar } from "./bar"


const Contact = bookshelf.model("Contact", {
    tableName: "contacts",
    bar() {
        return this.hasOne(Bar)
    }
})
export { Contact }