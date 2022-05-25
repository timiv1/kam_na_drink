import { bookshelf } from "@models/bookshelf"
import { Bar } from "@models/bar"

interface ILocation {
    id: number,
    title: string,
    street: string,
    post_number: number,
    city: string,
    country: string,
    long: number,
    lat: number
}
const Location = bookshelf.model("Location", {
    tableName: 'locations',
    bar() {
        this.hasOne(Bar)
    }
})
export { ILocation, Location }