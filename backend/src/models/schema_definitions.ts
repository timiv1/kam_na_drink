export interface IBar {
    name: string;
    location_id: number;
    contact_id: number;
}

export interface IBarUser {
    bar_id: number;
    user_id: number;
}

export interface IContact {
    phone: string,
    email: string,
}

export interface IDrinkMenu {
    price: number;
    drink_id: number;
    menu_id: number;
}

export interface IDrinkType {
    type: string;
}

export interface IDrinkUser {
    drink_id: number;
    user_id: number;
}

export interface IDrink {
    name: string;
    price: number;
    year: number;
    volume: number;
    alcohol: number;
    description: string;
    drink_type_id: number;
}

export interface ILocation {
    street: string,
    post_number: number,
    city: string,
    country: string,
    long: number,
    lat: number
}

export interface IMenu {
    title: string;
    bar_id: number;
}

export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface IWorkTimeBar {
    bar_id: number;
    work_time_id: number;
}

export interface IWorkTime {
    day: string,
    from: string,
    to: string,
}