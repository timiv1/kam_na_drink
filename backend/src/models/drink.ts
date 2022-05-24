import { bookshelf } from '@models/bookshelf'
import { DrinkUser } from './drink_user';

interface IDrink {
    id: number;
    title: string;
    price: number;
    netoAmount: number;
    alcoholPercentage: number;
    year: number;
    ingredients: string;
    originId: number;
    typeOfDrinkId: number;
}

const Drink = bookshelf.model("Drink", {
    tableName: 'drinks',
    users() {
        return this.hasMany(DrinkUser);
    }
});

export { Drink, IDrink };