import { bookshelf } from "./bookshelf"
import { Bar } from "./bar"

const Location = bookshelf.model("Location", {
    tableName: 'locations',
    bar() {
        return this.hasOne(Bar)
    }
})
export { Location }