import { bookshelf } from '@models/bookshelf'
import { Drink } from '@models/drink'

interface IDrinkType {
    id: number;
    type: string;
}

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

export { DrinkType, IDrinkType, DrinkTypes };