export interface DailyMenuBreakdown {
  id: number;
  date: Date;
  totals: Totals[];
}

export interface Totals {
  group: string;
  item: string;
  sold: string;
  modifier?: string;
}
export type EntreeList = {
  item: string;
  portion: number;
  modifier?: string;
  sold?: number;
};
export type GroupEntreeList = {
  group: string;
  item: string;
  portion: number;
  description: string;
  masterId: number;
  modifier?: string;
  sold?: number;
  imageUrl?: string;
};
export interface MenuBreakdown {
  id: number;
  date: Date;
  group: string;
  item: string;
  sold: number;
  modifier?: string;
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
export interface Groups {
  [key: string]: MenuItem[];
}
export interface ItemGroup {
  group: string;
  id: string;
}
export const FoodMenuGroupGUID: ItemGroup[] = [
  { group: 'Entrees', id: 'm1-fe-01' },
  { group: 'Appetizers', id: 'm1-fa-02' },
  { group: 'Burgers', id: 'm1-fb-04' },
  { group: 'Kids Menu', id: 'm1-fk-05' },
  { group: 'Salads', id: 'm1-fs-03' },
  { group: 'Desserts', id: 'm1-fd-06' },
  { group: 'Soups', id: 'm1-fa-08' },
  { group: 'Sides', id: 'm1-fs-07' },
  { group: 'Only Meats', id: 'm1-fo-09' },
];
export const APPETIZERS: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fa-02',
    name: 'Aborrajado',
    description: 'Sweet plantains stuffed with mozarella cheese',
    masterId: '240970001',
    categories: [
      {
        category: 'Aborrajado',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/1/item-5740009378413211_1626433938.jpg?size=medium',
  },
  {
    guid: 1,
    itemGroupGuid: 'm1-fa-02',
    name: 'Arepa',
    description: 'Enriched corn meal patty.',
    masterId: '240970002',
    categories: [
      {
        category: 'Arepa',
        modifier: 'Single',
        portion: 1,
      },
      {
        category: 'Chicharron',
        modifier: 'Chicharron No Cheese',
        portion: 1,
      },
      {
        category: 'Chicharron',
        modifier: 'Chicharron & Cheese',
        portion: 1,
      },
      {
        category: 'Chorizo',
        modifier: 'Chorizo No Cheese',
        portion: 1,
      },
      {
        category: 'Chorizo',
        modifier: 'Chorizo & Cheese',
        portion: 1,
      },
      {
        category: 'Brisket',
        modifier: 'Beef & Cheese',
        portion: 0.5,
      },
      {
        category: 'Chicharron',
        modifier: 'Chicharron no arepa mas Chicharron æ',
        portion: 2,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/7/item-5740009378413207_1622891542.jpg?size=medium  ',
  },
  {
    guid: 2,
    itemGroupGuid: 'm1-fa-02',
    name: 'Bunuelos',
    description: 'Colombian sweet bread',
    masterId: '240970003',
    categories: [
      {
        category: 'Bunuelos',
        modifier: 'Single',
        portion: 1,
      },
      {
        category: 'Bunuelos',
        modifier: 'Dozen',
        portion: 12,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/3/item-5740009378413223_1630611633.jpg?size=medium',
  },
  {
    guid: 3,
    itemGroupGuid: 'm1-fa-02',
    name: 'Ceviche Peruano',
    description: 'Diced Tilapia marinated in lime juice.',
    masterId: '240970004',
    categories: [
      {
        category: 'Ceviche',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009378413215_1631462801.jpg?size=medium',
  },
  {
    guid: 4,
    itemGroupGuid: 'm1-fa-02',
    name: 'Coctel de Camarones',
    description:
      'Shrimp marinated in a house made original sauce paired with crackers.',
    masterId: '240970005',
    categories: [
      {
        category: 'Shrimp',
        modifier: 'Small',
        portion: 8,
      },
      {
        category: 'Shrimp',
        modifier: 'Large',
        portion: 16,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009378413219_1626702870.jpg?size=medium',
  },
  {
    guid: 5,
    itemGroupGuid: 'm1-fa-02',
    name: 'Empanada',
    description:
      'Fried corn meal patty stuffed with beef and potatoes \u002F or chicken',
    masterId: '240970006',
  },
  {
    guid: 6,
    itemGroupGuid: 'm1-fa-02',
    name: 'Morcilla',
    description: '',
    masterId: '240970007',
    categories: [
      {
        category: 'Morcilla',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009378413205_1624104056.jpg?size=medium',
  },
  {
    guid: 7,
    itemGroupGuid: 'm1-fa-02',
    name: 'Pandebono',
    description: 'Colombian sweet bread',
    masterId: '240970008',
    categories: [
      {
        category: 'Pandebono',
        modifier: 'Single',
        portion: 1,
      },
      {
        category: 'Pandebono',
        modifier: 'Dozen',
        portion: 12,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/1/item-5740009378413221_1631462945.jpg?size=medium',
  },
  {
    guid: 8,
    itemGroupGuid: 'm1-fa-02',
    name: 'Patacones Rellenos',
    description:
      'Fried corn meal patty stuffed with beef and potatoes \u002F or chicken',
    masterId: '240970009',
    categories: [
      {
        category: 'Brisket',
        modifier: 'Beef',
        portion: 0.25,
      },
      {
        category: 'Whole Chicken',
        modifier: 'Chicken',
        portion: 0.1,
      },
      {
        category: 'Shrimp',
        modifier: 'Shrimp æ',
        portion: 0.1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/3/item-5740009378413213_1648472065.jpg?size=medium',
  },
  {
    guid: 9,
    itemGroupGuid: 'm1-fa-02',
    name: 'Picada Colombiana',
    description: 'Assorted basket filled with fried goods',
    masterId: '240970010',
    categories: [
      {
        category: 'Picada Colombiana',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009378413209_1622891741.jpg?size=medium',
  },
  {
    guid: 10,
    itemGroupGuid: 'm1-fa-02',
    name: 'Tequenos',
    description: 'Venezuelan cheese sticks',
    masterId: '240970011',
    categories: [
      {
        category: 'Tequenos',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/7/item-5740009378413217_1622892237.jpg?size=medium',
  },
  {
    guid: 11,
    itemGroupGuid: 'm1-fa-02',
    name: 'Pandebono con Guava',
    description: '',
    masterId: '240970012',
    categories: [
      {
        category: 'Pandebono',
        portion: 3,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009378413219_1626702870.jpg?size=medium',
  },
  {
    guid: 12,
    itemGroupGuid: 'm1-fa-02',
    name: 'Empanadita',
    description: '',
    masterId: '240970013',
    categories: [
      {
        category: 'Empanadita',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009378413219_1626702870.jpg?size=medium',
  },
  {
    guid: 13,
    itemGroupGuid: 'm1-fa-02',
    name: 'Morcilla',
    description: 'Blood sausage, with a uniquely rich and staisfying flavor',
    masterId: '240970113',
    categories: [
      {
        category: 'Morcilla',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740011228040420_1631463021.jpg?size=medium',
  },
];
export const SALADS: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fs-03',
    name: 'Ensalada de la Casa',
    description:
      'Tomatoes, carrot and cucumbers laid on top of a bed of lettuce',
    masterId: '240970013',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009380417399_1631457233.jpg?size=medium',
  },
  {
    guid: 1,
    itemGroupGuid: 'm1-fs-03',
    name: 'Ensalada de Tomate y Aguacate',
    description: 'Avocado and Tomatoes served on a bed of lettuce',
    masterId: '240970014',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/1/item-5740009380418851_1631458269.jpg?size=medium',
  },
  {
    guid: 2,
    itemGroupGuid: 'm1-fs-03',
    name: 'Ensalada de Pollo',
    description:
      'Fresh lettuce topped with grilled chicken, avocado and tomatoes',
    masterId: '240970015',
    categories: [
      {
        category: 'Pechuga de Pollo',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/3/item-5740009380418853_1626702800.jpg?size=medium',
  },
  {
    guid: 3,
    itemGroupGuid: 'm1-fs-03',
    name: 'Ensalada de Salmon',
    description: 'Fresh spinach topped with grilled salmon',
    masterId: '240970016',
    categories: [
      {
        category: 'Salmon',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009380418855_1631458105.jpg?size=medium',
  },
  {
    guid: 4,
    itemGroupGuid: 'm1-fs-03',
    name: 'Ensalada de Pescado',
    description:
      'Fresh spinach topped with grilled tilapia, avocado and tomatoes',
    masterId: '240970017',
    categories: [
      {
        category: 'Tilapia',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/7/item-5740009380418857_1631458130.jpg?size=medium',
  },
  {
    guid: 5,
    itemGroupGuid: 'm1-fs-03',
    name: 'Ensalada de Camarones',
    description: 'Fresh spinach topped with shrimp',
    masterId: '240970018',
    categories: [
      {
        category: 'Shrimp',
        portion: 6,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009380418859_1648832568.jpg?size=medium',
  },
];

export const BURGERS: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fb-04',
    name: 'El Clásico',
    description: '',
    masterId: '240970019',
    categories: [
      {
        category: 'Burgers',
        portion: 1,
      },
    ],
  },
];

export const ENTREES: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fe-01',
    name: 'Arroz con Pollo',
    description:
      'Chicken rice casserole mixed with carrots, peas & green beans; served with sweet plantains on a bed of lettuce',
    masterId: '240970020',
    categories: [
      {
        category: 'Arroz con Pollo',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380424862_1626702164.jpg?size=medium',
  },
  {
    guid: 1,

    itemGroupGuid: 'm1-fe-01',
    name: 'Bandeja Paisa',
    description:
      'Authentic dish from the mountains of Colombia; Tender beef sirloin, fried pork rind, & an egg over a bed of white rice, sweet plantains, homestyle red beans, a slice of avocado and a corn meal patty.',
    masterId: '240970021',
    categories: [
      {
        category: 'Bistec Chico',
        portion: 1,
      },
      {
        category: 'Chicharron',
        portion: 1,
      },
      {
        category: 'Pechuga de Pollo',
        modifier: 'Pechuga de pollo æ',
        portion: 1,
      },
      {
        category: 'Brisket',
        modifier: 'Carne Desmechada æ',
        portion: 1,
      },
      {
        category: 'Churrasco',
        modifier: 'Churrasco æ',
        portion: 1,
      },
      {
        category: 'Chuleta a la Parrilla',
        modifier: 'Chuleta-a-la-parilla',
        portion: 2,
      },
      {
        category: 'Shrimp',
        modifier: 'Churrasco with 6 shrimp æ',
        portion: 6,
      },
      {
        category: 'Churrasco',
        modifier: 'Churrasco with 6 shrimp æ',
        portion: 1,
      },
      {
        category: 'Chorizo',
        modifier: 'Half Chorizo æ',
        portion: 0.5,
      },
      {
        category: 'Arroz con pollo',
        modifier: 'Arroz con pollo side',
        portion: 0.25,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380423680_1626702209.jpg?size=medium',
  },
  {
    guid: 2,

    itemGroupGuid: 'm1-fe-01',
    name: 'Bandeja Paisa Tipica Antioquena',
    description:
      'Authentic dish from the mountains of Colombia; Tender beef sirloin, fried pork rind, & an egg over a bed of white rice, sweet plantains, homestyle red beans, a slice of avocado and a corn meal patty. (adds Chorizo & Green plantains)',
    masterId: '240970022',
    categories: [
      {
        category: 'Bistec Chico',
        portion: 1,
      },
      {
        category: 'Chicharron',
        portion: 1,
      },
      {
        category: 'Chorizo',
        portion: 1,
      },
      {
        category: 'Pechuga de Pollo',
        modifier: 'Pechuga de pollo æ',
        portion: 1,
      },
      {
        category: 'Brisket',
        modifier: 'Carne Desmechada æ',
        portion: 1,
      },
      {
        category: 'Churrasco',
        modifier: 'Churrasco æ',
        portion: 1,
      },
      {
        category: 'Chuleta a la Parrilla',
        modifier: 'Chuleta-a-la-parilla',
        portion: 2,
      },
      {
        category: 'shrimp',
        modifier: 'Churrasco with 6 shrimp æ',
        portion: 6,
      },
      {
        category: 'Churrasco',
        modifier: 'Churrasco with 6 shrimp æ',
        portion: 1,
      },
      {
        category: 'Chorizo',
        modifier: 'Half Chorizo æ',
        portion: 0.5,
      },
      {
        category: 'Arroz con pollo',
        modifier: 'Arroz con pollo side',
        portion: 0.25,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380423696_1635097292.jpg?size=medium',
  },
  {
    guid: 3,

    itemGroupGuid: 'm1-fe-01',
    name: 'Bistec a Caballo',
    description:
      'Grilled top sirloin marinated in criolla salsa, topped with two fried eggs; served with white rice, black beans, & sweet plantains',
    masterId: '240970023',
    categories: [
      {
        category: 'Bistec Grande',
        portion: 1,
      },
      {
        category: 'Eggs',
        portion: 2,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380423690_1626702258.jpg?size=medium',
  },
  {
    guid: 4,

    itemGroupGuid: 'm1-fe-01',
    name: 'Bistec Criollo',
    description:
      'Grilled top sirloin covered in criolla sauce; served witih white rice, red beans, & green plantains',
    masterId: '240970024',
    categories: [
      {
        category: 'Bistec Grande',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380423692_1626702415.jpg?size=medium',
  },
  {
    guid: 5,

    itemGroupGuid: 'm1-fe-01',
    name: 'Bistec Encebollado',
    description:
      'Grilled top-butt sirloin topped with sauteed onions; served with white rice, red beans, & green plantains',
    masterId: '240970025',
    categories: [
      {
        category: 'Bistec Grande',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380423694_1631467602.jpg?size=medium',
  },
  {
    guid: 6,

    itemGroupGuid: 'm1-fe-01',
    name: 'Camarones a la Catalana',
    description:
      'Shrimp, "Catalana-style", served with white rice, mixed vegetables, & green plantains',
    masterId: '240970026',
    categories: [
      {
        category: 'Shrimp',
        portion: 12,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380424868_1631467639.jpg?size=medium',
  },
  {
    guid: 7,

    itemGroupGuid: 'm1-fe-01',
    name: 'Chuleta a la Parrilla',
    description:
      'Grilled porkchops marinated in our special seasoning; served with white rice, red beans, & fried yucca',
    masterId: '240970027',
    categories: [
      {
        category: 'Chuleta a la Parrilla',
        portion: 2,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380424852_1631467661.jpg?size=medium',
  },
  {
    guid: 8,

    itemGroupGuid: 'm1-fe-01',
    name: 'Chuleta Valluna',
    description:
      'Filet of pork loin breaded & fried, served with white rice, salad, & green plantains',
    masterId: '240970028',
    categories: [
      {
        category: 'Chuleta Valluna',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380424850_1630780744.jpg?size=medium',
  },
  {
    guid: 9,

    itemGroupGuid: 'm1-fe-01',
    name: 'Churrasco',
    description:
      'Grilled top sirloin marinated in Chimichurri sauce; served with green beans, fried yucca, & mashed potatoes',
    masterId: '240970029',
    categories: [
      {
        category: 'Churrasco',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380423688_1626702489.png?size=medium',
  },
  {
    guid: 10,

    itemGroupGuid: 'm1-fe-01',
    name: 'Lomo de Res',
    description:
      '10 oz Angus Center-Cut Beef Ribeye: served with salad, mashed potatoes, & green plantains',
    masterId: '240970030',
    categories: [
      {
        category: 'Lomo de Res',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380423686_1626702514.jpg?size=medium',
  },
  {
    guid: 11,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pabellon',
    description:
      'Venezuelan-style dish; shredded beef mixed with criolla sauce; served with white rice, black beans, & sweet plantains',
    masterId: '240970031',
    categories: [
      {
        category: 'Brisket',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380423696_1635097292.jpg?size=medium',
  },
  {
    guid: 12,

    itemGroupGuid: 'm1-fe-01',
    name: 'Parrillada Vegetariana',
    description:
      'Grilled vegetables: portobello, zucchini, squash, red & green peppers, marinated in chimichurri salsa; Served with white rice, fried yucca, and homemade black beans',
    masterId: '240970032',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380424874_1626702654.jpg?size=medium',
  },
  {
    guid: 13,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pechuga de Pollo',
    description:
      'Grilled chicken breast topped with our in-house butter\u002Fgarlic sauce; served with white rice, green beans, & green plantains',
    masterId: '240970033',
    categories: [
      {
        category: 'Pechuga de Pollo',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380424860_1630780953.jpg?size=medium',
  },
  {
    guid: 14,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pechuga de Pollo Empanizada',
    description:
      'Breaded chicken fried & served with salad, french fries, & green plantains',
    masterId: '240970034',
    categories: [
      {
        category: 'Pechuga de Pollo Empanizada',
        portion: 1,
      },
      {
        category: 'Pechuga de Pollo',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380424856_1630780996.jpg?size=medium',
  },
  {
    guid: 15,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pechuga Rellena',
    description:
      'Grilled chicken breast stuffed with cheese, & a Colombian-style stuffing; served with mashed potatoes, salad, and black beans',
    masterId: '240970035',
    categories: [
      {
        category: 'Pechuga de Pollo',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380424854_1626702442.jpg?size=medium',
  },
  {
    guid: 16,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pescado en Cilantro y Mayonesa',
    description:
      'Fresh grilled tilapia topped with our house made chipotle sauce; served with white rice, sweet plantains, & fried yucca',
    masterId: '240970036',
    categories: [
      {
        category: 'Tilapia',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380424870_1626702723.jpg?size=medium',
  },
  {
    guid: 17,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pescado Frito',
    description:
      'Fresh fried whole tilapia topped with sauteed bell peppers & onions; served with white rice, salad, & green plantains',
    masterId: '240970037',
    categories: [
      {
        category: 'Pescado Frito',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380424864_1626702687.jpg?size=medium',
  },
  {
    guid: 18,

    itemGroupGuid: 'm1-fe-01',
    name: 'Plato Vegetariano',
    description:
      'Sauteed Vegetables including: carrots, broccoli, squash, & zucchini; tossed in criolla sauce; served with white rice, sweet plantains & black beans',
    masterId: '240970038',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380424872_1626702620.jpg?size=medium',
  },
  {
    guid: 19,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pollo Empanizado Adultos',
    description: 'Adult chicken strips meal',
    masterId: '240970039',
    categories: [
      {
        category: 'Pollo Empanizado',
        portion: 2,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380423696_1635097292.jpg?size=medium',
  },
  {
    guid: 20,

    itemGroupGuid: 'm1-fe-01',
    name: 'Pollo Guisado',
    description:
      'Quartered Chicken stewed in our criolla sauce, served with white rice, salad & sweet plantains',
    masterId: '240970040',
    categories: [
      {
        category: 'Pollo Guisado',
        portion: 1,
        modifier: 'Pierna',
      },
      {
        category: 'Pollo Guisado',
        portion: 1,
        modifier: 'Pechuga',
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380424858_1631467712.jpg?size=medium',
  },
  {
    guid: 21,

    itemGroupGuid: 'm1-fe-01',
    name: 'Ropa Vieja',
    description:
      'Cuban-style dish; shredded beef mixed with olives, capers and a red wine sauce; served with white rice, salad, & sweet plantains',
    masterId: '240970041',
    categories: [
      {
        category: 'Brisket',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380423698_1626702585.jpg?size=medium',
  },
  {
    guid: 22,

    itemGroupGuid: 'm1-fe-01',
    name: 'Salmon En Limon y Mantequilla',
    description:
      'Fresh Salmon cooked in lemon butter; served with green beans, mashed potatoes, & sweet plantains',
    masterId: '240970042',
    categories: [
      {
        category: 'Salmon',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380424866_1626702569.jpg?size=medium',
  },
  {
    guid: 23,

    itemGroupGuid: 'm1-fe-01',
    name: 'Tamal Valluno',
    description:
      'Cooked cornmeal stuffed with pork, beef, chicken & vegetables. Wraped in plantains leaves, served with white rice, salad, & green plantains',
    masterId: '240970043',
    categories: [
      {
        category: 'Tamal Valluno',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380423684_1626702549.jpg?size=medium',
  },
  {
    guid: 23,

    itemGroupGuid: 'm1-fe-01',
    name: 'Family Meal',
    description:
      'Family Meal is served with white rice, salad, & green plantains; served with white',
    masterId: '240970043',
    categories: [
      {
        category: 'Ropa Vieja',
        portion: 4,
      },
      {
        category: 'Pabellon',
        portion: 4,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380423696_1635097292.jpg?size=medium',
  },
];

export const KIDS: MenuItem[] = [
  {
    guid: 0,

    itemGroupGuid: 'm1-fk-05',
    name: 'Pollo Empanizado de Nino',
    description: 'Chicken Strips with french fries or white rice',
    masterId: '240970044',
  },
  {
    guid: 1,

    itemGroupGuid: 'm1-fk-05',
    name: 'Pollo Guisado',
    description: 'Stewed chicken served with french fries or white rice',
    masterId: '240970045',
    categories: [
      {
        category: 'Pollo Guisado',
        portion: 1,
        modifier: 'Pierna',
      },
      {
        category: 'Pollo Guisado',
        portion: 1,
        modifier: 'Pechuga',
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380560276_1626704047.jpg?size=medium',
  },
  {
    guid: 2,

    itemGroupGuid: 'm1-fk-05',
    name: 'Carne Asada',
    description: 'Grilled beef served with french fries or white rice',
    masterId: '240970046',
    categories: [
      {
        category: 'Bistec Chico',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380560278_1626704070.jpg?size=medium',
  },
  {
    guid: 3,

    itemGroupGuid: 'm1-fk-05',
    name: 'Pechuga de Pollo Kids',
    description: 'Grilled chicken breast with french fries or white rice',
    masterId: '240970047',
    categories: [
      {
        category: 'Pechuga de Pollo',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380560280_1626704101.jpg?size=medium',
  },
];

export const DESSERTS: MenuItem[] = [
  {
    guid: 0,

    itemGroupGuid: 'm1-fd-06',
    name: "Bon Bon Bon's",
    description: 'Colombian Lolli-pops',
    categories: [
      {
        category: "Bon Bon Bon's",
        portion: 1,
      },
    ],
    masterId: '240970048',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/3/item-5740009380584453_1631463240.jpg?size=medium',
  },
  {
    guid: 1,

    itemGroupGuid: 'm1-fd-06',
    name: 'Brevas con Arequipe y Queso',
    description: 'Figs with Candy Milk',
    categories: [
      {
        category: 'Brevas con Arequipe',
        portion: 1,
      },
    ],
    masterId: '240970049',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/7/item-5740009380583637_1648831984.jpg?size=medium',
  },
  {
    guid: 2,

    itemGroupGuid: 'm1-fd-06',
    name: 'Café Sello Rojo',
    description: 'Colombian Coffee',
    categories: [
      {
        category: 'Café Sello Rojo',
        portion: 1,
      },
    ],
    masterId: '240970050',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009380584455_1630611972.jpg?size=medium',
  },
  {
    guid: 3,
    itemGroupGuid: 'm1-fd-06',
    name: 'Flan de Caramelo',
    description: 'Caramel Flan',
    categories: [
      {
        category: 'Caramel Flan',
        portion: 1,
      },
    ],
    masterId: '240970051',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009380583639_1626704166.jpg?size=medium',
  },
  {
    guid: 4,
    itemGroupGuid: 'm1-fd-06',
    name: 'Flan de Coco',
    description: 'Coconut Flan',
    categories: [
      {
        category: 'Coconut Flan',
        portion: 1,
      },
    ],
    masterId: '240970052',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/1/item-5740009380583641_1631467954.jpg?size=medium',
  },
  {
    guid: 5,
    itemGroupGuid: 'm1-fd-06',
    name: 'Ice Cream',
    description: 'Vanilla Icecream',
    categories: [
      {
        category: 'Ice Cream',
        portion: 1,
      },
    ],
    masterId: '240970053',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/7/item-5740009380583647_1631459202.jpg?size=medium',
  },
  {
    guid: 6,

    itemGroupGuid: 'm1-fd-06',
    name: 'Jumbo Bar',
    description: '',
    categories: [
      {
        category: 'Jumbo Bar',
        portion: 1,
      },
    ],
    masterId: '240970054',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740011348542792_1648831926.jpg?size=medium',
  },
  {
    guid: 7,

    itemGroupGuid: 'm1-fd-06',
    name: 'Maduros Flameados',
    description: 'Flamed Sweet plantains served with vanilla ice cream',
    categories: [
      {
        category: 'Maduros Flameados',
        portion: 1,
      },
    ],
    masterId: '240970055',
    imageUrl: '',
  },
  {
    guid: 8,

    itemGroupGuid: 'm1-fd-06',
    name: 'Manjar Blanco',
    description: '',
    categories: [
      {
        category: 'Manjar Blanco',
        portion: 1,
      },
    ],
    masterId: '240970056',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009750687096_1630611736.jpg?size=medium',
  },
  {
    guid: 9,

    itemGroupGuid: 'm1-fd-06',
    name: 'Mousse',
    description: 'Passion Fruit Mousse',
    categories: [
      {
        category: 'Mousse',
        portion: 1,
      },
    ],
    masterId: '240970057',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009380583645_1631459281.jpg?size=medium',
  },
  {
    guid: 10,

    itemGroupGuid: 'm1-fd-06',
    name: 'Super Coco',
    description: 'Colombian Candy',
    categories: [
      {
        category: 'Super Coco',
        portion: 1,
      },
    ],
    masterId: '240970058',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/7/item-5740009380584457_1630612021.jpg?size=medium',
  },
  {
    guid: 11,

    itemGroupGuid: 'm1-fd-06',
    name: 'Tres Leches',
    description: 'Three Milks',
    categories: [
      {
        category: 'Tres Leches',
        portion: 1,
      },
    ],
    masterId: '240970059',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009380583635_1631459233.jpg?size=medium',
  },
  {
    guid: 12,

    itemGroupGuid: 'm1-fd-06',
    name: 'Whole Flan',
    description: '',
    categories: [
      {
        category: 'Whole Flan',
        portion: 1,
      },
    ],
    masterId: '240970060',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/9/item-5740009380583639_1626704166.jpg?size=medium',
  },
  {
    guid: 13,
    itemGroupGuid: 'm1-fd-06',
    name: 'Whole Tres Leches',
    description: '',
    categories: [
      {
        category: 'Whole Tres Leches',
        modifier: 'Small',
        portion: 8,
      },
      {
        category: 'Whole Tres Leches',
        modifier: 'Medium',
        portion: 12,
      },
      {
        category: 'Whole Tres Leches',
        modifier: 'Large',
        portion: 16,
      },
    ],
    masterId: '240970061',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009380583635_1631459233.jpg?size=medium',
  },
  {
    guid: 14,
    itemGroupGuid: 'm1-fd-06',
    name: 'Carrot Cake',
    description: '',
    categories: [
      {
        category: 'Carrot Cake',
        portion: 1,
      },
    ],
    masterId: '240970062',
    imageUrl:
      'https://www.cookingclassy.com/wp-content/uploads/2020/04/carrot-cake-20-1-600x900.jpg',
  },
];

export const SIDES: MenuItem[] = [
  {
    guid: 1,
    itemGroupGuid: 'm1-fs-07',
    name: 'Aji in Cup to Go',
    description: '',
    // prices: {
    // 	type: ["8oz", "12oz", "16oz", "24oz"],
    // 	amount: [7, 10, 13, 16]
    // },
    masterId: '240970063',
    categories: [
      { category: 'Aji', modifier: '12oz', portion: 1 },
      { category: 'Aji', modifier: '16oz', portion: 1 },
      { category: 'Aji', modifier: '24oz', portion: 1 },
      { category: 'Aji', modifier: '32oz', portion: 1 },
    ],
    imageUrl: '',
  },
  {
    guid: 2,
    itemGroupGuid: 'm1-fs-07',
    name: '2 oz Salsa',
    description: '',
    masterId: '240970064',
    categories: [
      { category: '2oz Salsa', modifier: 'A-1', portion: 1 },
      { category: '2oz Salsa', modifier: 'Chipotle Mayo', portion: 1 },
      { category: '2oz Salsa', modifier: 'Mayo Ketchup', portion: 1 },
      { category: '2oz Salsa', modifier: 'Mojo De Ajo', portion: 1 },
      { category: '2oz Salsa', modifier: 'Panela Salsa', portion: 1 },
      { category: '2oz Salsa', modifier: 'Salsa Criolla', portion: 1 },
      { category: '2oz Salsa', modifier: 'Soy Sauce', portion: 1 },
      { category: '2oz Salsa', modifier: 'Valentina', portion: 1 },
      { category: '2oz Salsa', modifier: 'Aderezo', portion: 1 },
      { category: '2oz Salsa', modifier: 'Chimichurri', portion: 1 },
      { category: '2oz Salsa', modifier: 'Ketchup', portion: 1 },
      { category: '2oz Salsa', modifier: 'Mediterranean', portion: 1 },
      { category: '2oz Salsa', modifier: 'Olive Oil', portion: 1 },
      { category: '2oz Salsa', modifier: 'Ranch', portion: 1 },
      { category: '2oz Salsa', modifier: 'Sour Cream', portion: 1 },
      { category: '2oz Salsa', modifier: 'Tabasco', portion: 1 },
      { category: '2oz Salsa', modifier: 'Salsa de pollo', portion: 1 },
    ],
    imageUrl: '',
  },
  {
    guid: 3,
    itemGroupGuid: 'm1-fs-07',
    name: 'Avocado',
    description: "U.S Foods certified Avocado's",
    masterId: '240970065',
    categories: [
      {
        category: 'Avocado',
        portion: 0.5,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380696592_1631458414.jpg?size=medium',
  },
  {
    guid: 4,
    itemGroupGuid: 'm1-fs-07',
    name: 'Papa Criolla',
    description: 'Colombian small sized sweet potatoes',
    masterId: '240970066',
    categories: [
      {
        category: 'Papa Criolla',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380696568_1631458745.jpg?size=medium',
  },
  {
    guid: 5,

    itemGroupGuid: 'm1-fs-07',
    name: 'French Fries',
    description: '',
    masterId: '240970067',
    categories: [
      {
        category: 'French Fries',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380696566_1631458595.jpg?size=medium',
  },
  {
    guid: 6,

    itemGroupGuid: 'm1-fs-07',
    name: 'Fried Egg',
    description: 'Fried Eggs made at your favorite terms',
    masterId: '240970068',
    categories: [{ category: 'Fried Egg', portion: 1 }],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380696586_1637361246.jpg?size=medium',
  },
  {
    guid: 7,

    itemGroupGuid: 'm1-fs-07',
    name: 'Galletas Saladas',
    description: 'Saltine Crackers, Nabisco Original Premium',
    categories: [
      {
        category: 'Saltine Crackers',
        portion: 1,
      },
    ],
    masterId: '240970069',
    imageUrl: '',
  },
  {
    guid: 8,
    itemGroupGuid: 'm1-fs-07',
    name: 'Green Beans',
    description:
      'Green beans mixed with our Ajo sauce, made on demand, and made to eat',
    categories: [
      {
        category: 'Green Beans',
        portion: 1,
      },
    ],
    masterId: '240970070',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380696570_1637361138.jpg?size=medium',
  },
  {
    guid: 9,

    itemGroupGuid: 'm1-fs-07',
    name: 'Mashed Potatoes',
    description:
      'Colombian style mashed potatoes, made fresh daily.  Better than a mashed potato, eaten plane with no gravy!',
    categories: [
      {
        category: 'Mashed Potatoes',
        portion: 1,
      },
    ],
    masterId: '240970071',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380696590_1631467870.jpg?size=medium',
  },
  {
    guid: 10,
    itemGroupGuid: 'm1-fs-07',
    name: 'Mixed Vegetables',
    description:
      'Sauteed Vegetables mixed with Criolla sauce and all made from scratch',
    masterId: '240970072',
    categories: [
      {
        category: 'Mixed Vegetables',
        portion: 1,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380696594_1631467917.jpg?size=medium',
  },
  {
    guid: 11,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Chicharron',
    description: 'Colombian style pork belly, pre-cut, and fried to perfection',
    masterId: '240970073',
    categories: [{ category: 'Chicharron', portion: 1 }],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380696580_1631458634.jpg?size=medium',
  },
  {
    guid: 12,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Chorizo',
    description: 'Colombian Sausage',
    masterId: '240970074',
    categories: [{ category: 'Chorizo', portion: 1 }],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380696576_1631458656.jpg?size=medium',
  },
  {
    guid: 13,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Ensalada de la Casa',
    description:
      'Side Salad with lettuce, tomatoes, and a dash of shredded carrots',
    categories: [
      {
        category: 'House Salad Side',
        portion: 1,
      },
    ],
    masterId: '240970075',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380696584_1631458703.jpg?size=medium',
  },
  {
    guid: 14,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Frijoles Negros',
    description: 'Black beans made in-house, fresh, daily',
    categories: [
      {
        category: 'Black Beans',
        portion: 1,
      },
    ],
    masterId: '240970076',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380696574_1631458726.jpg?size=medium',
  },
  {
    guid: 15,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Frijoles Pintos',
    description: 'Pinto beans made in-house, fresh, daily',
    categories: [
      {
        category: 'Pinto Beans',
        portion: 1,
      },
    ],
    masterId: '240970077',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380696572_1631458612.jpg?size=medium',
  },
  {
    guid: 16,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Maduros',
    description: 'Colombian style fried sweet-plantains',
    categories: [
      {
        category: 'Maduros',
        portion: 4,
      },
    ],
    masterId: '240970078',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/8/item-5740009380696558_1631458813.jpg?size=medium',
  },
  {
    guid: 17,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side of Arroz con Pollo',
    description: '',
    masterId: '240970079',
    categories: [{ category: 'Arroz Con Pollo Side', portion: 0.5 }],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380696564_1631458763.jpg?size=medium',
  },
  {
    guid: 18,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side of Rice',
    description: '',
    categories: [
      {
        category: 'Rice',
        portion: 1,
      },
    ],
    masterId: '240970080',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740009380696562_1631458896.jpg?size=medium',
  },
  {
    guid: 19,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Queso Rallado',
    description: '',
    categories: [
      {
        category: 'Stringed Cheese',
        portion: 1,
      },
    ],
    masterId: '240970081',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/4/item-5740009380696584_1631458703.jpg?size=medium',
  },
  {
    guid: 20,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Tostones',
    description: '',
    categories: [
      {
        category: 'Tostones',
        portion: 3,
      },
    ],
    masterId: '240970082',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/0/item-5740009380696560_1637360962.jpg?size=medium',
  },
  {
    guid: 21,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side Yuca',
    description: '',
    categories: [
      {
        category: 'Yuca',
        portion: 5,
      },
    ],
    masterId: '240970083',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740009380696556_1630782634.jpg?size=medium',
  },
  {
    guid: 22,
    itemGroupGuid: 'm1-fs-07',
    name: 'Small Arepita',
    description: '',
    categories: [
      {
        category: 'Arepita',
        portion: 1,
      },
    ],
    masterId: '240970084',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/2/item-5740015075294432_1648832142.jpg?size=medium',
  },
  {
    guid: 23,
    itemGroupGuid: 'm1-fs-07',
    name: 'Limes',
    description: '',
    categories: [
      {
        category: 'Limes',
        portion: 2,
      },
    ],
    masterId: '240970085',
  },
  {
    guid: 24,
    itemGroupGuid: 'm1-fs-07',
    name: 'Cebolla Asada',
    description: '',
    categories: [
      {
        category: 'Sauteed Onions',
        portion: 1,
      },
    ],
    masterId: '240970086',
  },
  {
    guid: 25,
    itemGroupGuid: 'm1-fs-07',
    name: 'Solo Morcilla',
    description: '',
    categories: [
      {
        category: 'Morcilla',
        portion: 1,
      },
    ],
    masterId: '240970087',
  },
  {
    guid: 26,
    itemGroupGuid: 'm1-fs-07',
    name: 'Side of queso de cabra',
    description: '',
    categories: [
      {
        category: 'Cabra Cheese',
        portion: 1,
      },
    ],
    masterId: '240970088',
  },
];

export const WEEKENDSPECIALS: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fw-08',
    name: 'Cazuela De Mariscos',
    description: '',
    masterId: '240970088',
  },
  {
    guid: 1,

    itemGroupGuid: 'm1-fw-08',
    name: "Chef's Special",
    description: '',
    masterId: '240970089',
    categories: [
      { category: 'Churrasco', portion: 1 },
      { category: 'Chorizo', portion: 1 },
    ],
  },
  {
    guid: 2,

    itemGroupGuid: 'm1-fw-08',
    name: 'Pechuga de Pollo de Champiñeones',
    description: '',
    masterId: '240970090',
    categories: [{ category: 'Pechuga de Pollo', portion: 1 }],
  },
  {
    guid: 3,
    itemGroupGuid: 'm1-fw-08',
    name: 'Sancocho De Costilla',
    description: '',
    masterId: '240970091',
  },
  {
    guid: 4,

    itemGroupGuid: 'm1-fw-08',
    name: 'Sancocho De Gallina',
    description: '',
    masterId: '240970092',
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/6/item-5740013037035286_1676741874.jpg?size=medium',
  },
  {
    guid: 5,
    itemGroupGuid: 'm1-fw-08',
    name: 'Sopa de Mondongo',
    description: '',
    masterId: '240970093',
  },
  {
    guid: 6,
    itemGroupGuid: 'm1-fw-08',
    name: 'Sobrebarriga Criolla',
    description: '',
    masterId: '240970094',
  },
  {
    guid: 7,

    itemGroupGuid: 'm1-fw-08',
    name: 'Surf and Turf',
    description: '',
    masterId: '240970095',
    categories: [
      { category: 'Shrimp', portion: 6 },
      { category: 'Churrasco', portion: 1 },
    ],
  },
];

export const ONLYMEATS: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Bistec Grande',
    description: '',
    masterId: '240970096',
    categories: [
      {
        category: 'Bistec Grande',
        portion: 1,
      },
    ],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Camarones(6 Count)',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Shrimp', portion: 6 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Carne Desmechada',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Brisket', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Chuleta-a-la-Parilla',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Chuleta a la Parrilla', portion: 2 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Bistec Grande',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Bistec Grande', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Chuleta',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Chuleta Valluna', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Churrasco',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Churrasco', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Pechuga de Pollo',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Pechuga de Pollo', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Pechuga de Pollo Empanizada',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Pechuga de Pollo Empanizada', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Pescado Frito',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Pescado Frito', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Salmon',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Salmon', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Tilapia',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Tilapia', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Tamal',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Tamal', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Solo Lomo De Res',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Lomo de Res', portion: 1 }],
  },
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Only Pechuga Rellena',
    description: '',
    masterId: '240970096',
    categories: [{ category: 'Pechuga de Pollo', portion: 1 }],
  },
];

export const SOUPS: MenuItem[] = [
  {
    guid: 0,
    itemGroupGuid: 'm1-fo-09',
    name: 'Sopa de Patacones',
    description: 'Plaintain Soup with Beef',
    masterId: '240970096',
    categories: [
      { category: 'Brisket', modifier: 'Small', portion: 4 },
      { category: 'Brisket', modifier: 'Meduim', portion: 8 },
      { category: 'Brisket', modifier: 'Large', portion: 12 },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/3/item-5740009380389293_1631467543.jpg?size=medium',
  },
  {
    guid: 1,
    itemGroupGuid: 'm1-fo-09',
    name: 'Sopa de Ajiaco',
    description: 'Three potato cream and chicken soup',
    masterId: '240970097',
    categories: [
      {
        category: 'Whole Chicken',
        modifier: 'Small',
        portion: 0.5,
      },
      {
        category: 'Whole Chicken',
        modifier: 'Meduim',
        portion: 1,
      },
      {
        category: 'Whole Chicken',
        modifier: 'Large',
        portion: 2,
      },
    ],
    imageUrl:
      'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-71219000000000000/menu/items/5/item-5740009380389295_1631456648.jpg?size=medium',
  },
];
export interface MenuItem {
  guid: number;
  itemGroupGuid: string;
  name: string;
  description: string;
  masterId: string;
  categories?: MenuItemGroups[];
  imageUrl?: string;
}
export const MenuGroups: Groups[] = [
  { ['Entrees']: [...ENTREES] },
  { ['Appetizers']: [...APPETIZERS] },
  { ['Soups']: [...SOUPS] },
  { ['Burgers']: [...BURGERS] },
  { ['Kids Menu']: [...KIDS] },
  { ['Desserts']: [...DESSERTS] },
  { ['Sides']: [...SIDES] },
  { ['Only Meats']: [...ONLYMEATS] },
  { ['Salads']: [...SALADS] },
];
export type MenuItemGroups = {
  category: string;
  portion: number;
  modifier?: string;
};
export type CategoryMap = {
  [key: string]: EntreeList[];
};
