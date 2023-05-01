import { EntreeList } from '../../shared/models/menubreakdown';

export interface InventoryItems {
  name: string;
  portion: number;
  modifier?: string;
}
export interface TableInventory {
  [key: string]: InventoryTableData;
}

export interface InventoryTableData {
  category: string;
  total: number;
  entreeLists: {
    item: string;
    portion: number;
    modifier?: string;
    sold: number;
  }[];

  selected?: any;
}

export type ModifiersEntrees = {
  item: string;
  modifier: string;
};

export type Category = {
  [key: string]: EntreeList[];
};
