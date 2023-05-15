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
  { group: 'Entrees', id: 'Entrees' },
  { group: 'Appetizers', id: 'Appetizers' },
  { group: 'Burgers', id: 'Burgers' },
  { group: 'Kids Menu', id: 'Kids Menu' },
  { group: 'Salads', id: 'Salads' },
  { group: 'Desserts', id: 'Desserts' },
  { group: 'Soups', id: 'Soups' },
  { group: 'Sides', id: 'Sides' },
  { group: 'Only Meats', id: 'Only Meats' },
];
export interface MenuItem {
  masterId: string;
  group: string;
  name: string;
  description: string;
  categories: MenuItemGroups[];
  imageUrl?: string;
}

export type MenuItemGroups = {
  category: string;
  portion: number;
  modifier?: string;
};
export type CategoryMap = {
  [key: string]: EntreeList[];
};
