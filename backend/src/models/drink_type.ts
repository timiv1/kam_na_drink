import { bookshelf } from './bookshelf'
import { Drink } from './drink'


const DrinkType = bookshelf.model("Drink_type", {
    tableName: 'drink_types',
    drinks() {
        return this.hasMany(Drink)
    }

});

enum DrinkTypes {
    topli_napitki,
    brezalkoholni_napitki,
    pivo,
    vino,
    zganje,
    mesanice,
    cocktails
}

export { DrinkType, DrinkTypes };