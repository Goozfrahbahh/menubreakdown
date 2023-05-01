export interface MenuItems {
  category: string;
  name: string;
  image?: string;
}

export type MenuCategories = {
  id: string;
  name: string;
  items: Array<MenuItems>;
};

export type MenuCategory = {
  group: string;
  selected?: boolean;
};
