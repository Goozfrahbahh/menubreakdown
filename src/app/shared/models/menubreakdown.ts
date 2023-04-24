export interface DailyMenuBreakdown {
  id: number;
  date: Date;
  totals: Totals[];
  file?: string;
}

export interface Totals {
  item: string;
  quantity: number;
}

export interface MenuBreakdown {
  id: number;
  date: Date;
  item: string;
  quantity: number;
  category?: string;
}

export type StateWithoutMenuBreakdowns = OptionalNullable<string>;
type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P];
};

type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};
type OptionalNullable<T> = T extends object
  ? {
      [K in keyof PickNullable<T>]?: OptionalNullable<Exclude<T[K], null>>;
    } & {
      [K in keyof PickNotNullable<T>]: OptionalNullable<T[K]>;
    }
  : T;

export const entreeLists: (string | number)[][] = [
  ['Aborrajado', 0],
  ['Arepa', 0],
  ['Bunuelos', 0],
  ['Ceviche Peruano', 0],
  ['Coctel de Camarones', 0],
  ['Empanadas', 0],
  ['Morcilla', 0],
  ['Pandebono', 0],
  ['Patacones Rellenos', 0],
  ['Picada Colombiana', 0],
  ['Tequenos', 0],
  ['Sopa de Patacones', 0],
  ['Sopa de Ajiaco', 0],
  ['Ensalada de la Casa', 0],
  ['Ensalada de Tomate y Aguate', 0],
  ['Ensalada de Pollo', 0],
  ['Ensalada de Salmon', 0],
  ['Ensalada de Pescado', 0],
  ['Ensalada de Camarones', 0],
  ['Arroz con Pollo', 0],
  ['Bandeja Paisa', 0],
  ['Bandeja Paisa Tipica Antioquena', 0],
  ['Bistec a Caballo', 0],
  ['Bistec Criollo', 0],
  ['Bistec Encebollado', 0],
  ['Camarones a la Catalana', 0],
  ['Chuleta a la Parrilla', 0],
  ['Chuleta Valluna', 0],
  ['Churrasco', 0],
  ['Lomo de Res', 0],
  ['Pabellon', 0],
  ['Parillada Vegetariana', 0],
  ['Pechuga de Pollo', 0],
  ['Pechuga de Pollo Empanizada', 0],
  ['Pechuga Rellena', 0],
  ['Pescado en Cilantro y Mayonesa', 0],
  ['Pescado Frito', 0],
  ['Plato Vegetariano', 0],
  ['Pollo Empanizado Adultos', 0],
  ['Pollo Guisado', 0],
  ['Ropa Vieja', 0],
  ['Salmon En Limon Y Mantequilla', 0],
  ['Tamal Valluno', 0],
  ['Pollo Empanizado', 0],
  ['Pollo Guisado', 0],
  ['Carne Asada', 0],
  ['Pechuga de Pollo Kids', 0],
  ['Side Chicharron', 0],
  ['Side Chorizo', 0],
  ['Only Bistec Grande', 0],
  ['Only Camarones(6 Count)', 0],
  ['Only Carne Desmechada', 0],
  ['Only Chuleta-a-la-Parilla', 0],
  ['Only Chuleta', 0],
  ['Only Churrasco', 0],
  ['Only Pechuga de Pollo', 0],
  ['Only Pechuga de Pollo Empanizado', 0],
  ['Only Pescado Frito', 0],
  ['Only Pollo Guisado', 0],
  ['Only Salmon', 0],
  ['Only Tilapia', 0],
  ['Only Tamal', 0],
  ['Solo Lomo De Res', 0],
  ['Only Pechuga Rellena', 0],
  ["Chef's Special", 0],
  ['Lechon Asado', 0],
  ['Pechuga de Pollo de Champineones', 0],
  ['Surf and Turf', 0],
  ['Cazuela De Mariscos', 0],
  ['Sancocho De Gallina', 0],
  ['Sudado De Res', 0],
];
