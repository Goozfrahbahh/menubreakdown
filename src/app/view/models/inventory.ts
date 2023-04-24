export interface InventoryItems {
  name: string;
  portion: number;
  modifier?: string;
}
export const BistecChicoList: InventoryItems[] = [
  { name: 'Bandeja Paisa', portion: 1 },
  { name: 'Bandeja Paisa Tipica Antioquena', portion: 1 },
  { name: 'Carne Asada', portion: 1 },
  { name: 'Picada Colombiana', portion: 0.5 },
];

export const BistecGrandeList: InventoryItems[] = [
  { name: 'Bistec Criollo', portion: 1 },
  { name: 'Bistec a Caballo', portion: 1 },
  { name: 'Bistec Encebollado', portion: 1 },
  { name: 'Only Bistec Grande', portion: 1 },
];

///Churrasco//
export const ChurrascoList: InventoryItems[] = [
  { name: 'Churrasco', portion: 1 },
  { name: 'Only Churrasco', portion: 1 },
  { name: 'Churrasco æ', portion: 1 },
];

///Chicharron///
export const ChicarronList: InventoryItems[] = [
  { name: 'Bandeja Paisa', portion: 1 },
  { name: 'Bandeja Paisa Antioquena', portion: 1 },
  { name: 'Picada Colombiana', portion: 1 },
  { name: 'Side Chicharron', portion: 1 },
  { name: 'Chicharron & Cheese', portion: 1.5 },
  { name: 'Chicarron No Cheese', portion: 1.5 },
];
export const ChorizoList: InventoryItems[] = [
  { name: 'Side Chorizo', portion: 1 },
  { name: 'Bandeja Paisa Antioquena', portion: 0.5 },
  { name: 'Chorizo No Cheese', portion: 1 },
];

//Chorizo//
export const ChuletaParillaList: InventoryItems[] = [
  { name: 'Chuleta a la Parrilla', portion: 1 },
  { name: 'Only Chuleta-a-la-Parilla', portion: 1 },
];

export const ChuletaVallunaList: InventoryItems[] = [
  { name: 'Chuleta Valluna', portion: 1 },
  { name: 'Only Chuleta', portion: 1 },
];

export const CamaronesCatalanaList: InventoryItems[] = [
  { name: 'Camarones a la Catalana', portion: 6 },
  { name: 'Only Camarones(6 Count)', portion: 6 },
  { name: 'Coctel de Camarones', portion: 12, modifier: 'Large' },
  { name: 'Coctel de Camarones', portion: 3 },
];

export const SalmonList: InventoryItems[] = [
  { name: 'Salmon en Limon y Mantequilla', portion: 1 },
  { name: 'Ensalada de Salmon', portion: 1 },
  { name: 'Only Salmon', portion: 1 },
];

export const PescadoFritoList: InventoryItems[] = [
  { name: 'Pescado Frito', portion: 1 },
  { name: 'Only Pescado Frito', portion: 1 },
];

export const PescadoCilantroMayonesaList: InventoryItems[] = [
  { name: 'Pescado en Cilantro y Mayonesa', portion: 1 },
  { name: 'Ensalada de Pescado', portion: 1 },
  { name: 'Only Tilapia', portion: 1 },
];

export const TamalList: InventoryItems[] = [
  { name: 'Tamal Valluno', portion: 1 },
  { name: 'Only Tamal', portion: 1 },
];

export const BrisketList: InventoryItems[] = [
  { name: 'Pabellon', portion: 1 },
  { name: 'Ropa Vieja', portion: 1 },
  { name: 'Arepa', portion: 0.5, modifier: 'Beef' },
  { name: 'Patacones Rellenos', portion: 0.25, modifier: 'Beef' },
];

export const SopaPataconesList: InventoryItems[] = [
  { name: 'Sopa de Patacones', portion: 4, modifier: 'Small' },
  { name: 'Sopa de Patacones', portion: 8, modifier: 'Medium' },
  { name: 'Sopa de Patacones', portion: 12, modifier: 'Large' },
];

export const LomoResParillaList: InventoryItems[] = [
  { name: 'Lomo de Res a la Parrilla', portion: 1 },
  { name: 'Solo Lomo de Res', portion: 1 },
];

export const PechugaPolloList: InventoryItems[] = [
  { name: 'Pechuga de Pollo', portion: 1 },
  { name: 'Pechuga Rellena', portion: 1 },
  { name: 'Pechuga de Pollo Empanizada', portion: 1 },
  { name: 'Only Pechuga de Pollo', portion: 1 },
  { name: 'Only Pechuga Rellena', portion: 1 },
  { name: 'Only Pechuga de Pollo Empanizada', portion: 1 },
  { name: 'Picada Colombiana', portion: 0.5 },
];

export const PechugaEmpanizadaList: InventoryItems[] = [
  { name: 'Pechuga de Pollo Empanizada', portion: 1 },
  { name: 'Only Pechuga de Pollo Empanizada', portion: 1 },
];

//Pollo Guisado Pierna//
export const PolloGuisadoPiernaList: InventoryItems[] = [
  { name: 'Pollo Guisado', portion: 1, modifier: 'Pierna' },
  { name: 'Only Pollo Guisado', portion: 1 },
];

export const PolloGuisadoPechugaList: InventoryItems[] = [
  { name: 'Pollo Guisado', portion: 1, modifier: 'Pechuga' },
  { name: 'Only Pollo Guisado', portion: 1 },
];

export const AborrajadoList: InventoryItems[] = [
  { name: 'Aborrajado', portion: 1 },
];

export const EmpanadaBeefList: InventoryItems[] = [
  { name: 'Empanada', portion: 1, modifier: 'Beef' },
];

export const EmpanadaChickenList: InventoryItems[] = [
  { name: 'Empanada', portion: 1, modifier: 'Chicken' },
];

export const EmpanadaVegetableList: InventoryItems[] = [
  { name: 'Empanada', portion: 1, modifier: 'Vegetable' },
];

export const CevicheList: InventoryItems[] = [{ name: 'Ceviche', portion: 1 }];

export const PandebonoList: InventoryItems[] = [
  { name: 'Pandebono', portion: 1, modifier: 'Single' },
  { name: 'Pandebono', portion: 12, modifier: 'Dozen' },
];

export const BunueloList: InventoryItems[] = [
  { name: 'Bunuelo', portion: 1, modifier: 'Single' },
  { name: 'Bunuelo', portion: 12, modifier: 'Dozen' },
];

export const TequenosList: InventoryItems[] = [
  { name: 'Tequenos', portion: 5 },
];

export const PicadaColombianaList: InventoryItems[] = [
  { name: 'Picada Colombiana', portion: 1 },
];

export const EntreeList = [
  BistecChicoList,
  BistecGrandeList,
  ChurrascoList,
  ChicarronList,
  ChorizoList,
  ChuletaParillaList,
  ChuletaVallunaList,
  CamaronesCatalanaList,
  SalmonList,
  PescadoFritoList,
  PescadoCilantroMayonesaList,
  TamalList,
  BrisketList,
  SopaPataconesList,
  LomoResParillaList,
  PechugaPolloList,
  PechugaEmpanizadaList,
  PolloGuisadoPiernaList,
  PolloGuisadoPechugaList,
  AborrajadoList,
  EmpanadaBeefList,
  EmpanadaChickenList,
  EmpanadaVegetableList,
  CevicheList,
  PandebonoList,
  BunueloList,
  TequenosList,
  PicadaColombianaList,
];
export const inventory = [
  'CAB Top-Butt Sirloin',
  'CAB Top-Butt Sirloin',
  'CAB Top-Butt Sirloin',
  'Pork Belly',
  'Colombia Import',
  'Pork Chop',
  'Pork Loin',
  'Shrimp, White',
  'Salmon Skinless',
  'Whole Tilapia',
  'Tilapia Frozen',
  'Combination',
  'CAB Beef Brisket',
  'CAB Beef Brisket',
  'USDA Rib-eye',
  'Chicken Breast',
  'Chicken Breast',
  'Whole Chicken',
  'Whole Chicken',
  'Combination',
  'CAB Top-Butt Sirloin',
  'Whole Chicken',
  'Vegetable Mix',
  'Tilapia Filet 2-3oz',
  'Colombia Import',
  'Colombia Import',
  'Local Labels, Austin, Tx',
  'Combination',
];
export const EntreeKey = [
  'Pechuga de Pollo',
  'Pechuga de Pollo Empanizada',
  'Pabellon',
  'Bandeja Paisa Tipica Antioquena',
  'Chuleta Valluna',
  'Pollo Guisado',
  'BistecCriollo',
  'Bandeja Paisa',
  'Churrasco',
  'Pescado Frito',
  'Bistec Encebollado',
  'Lomo de Res a la Parilla',
  'Plato Vegetariano',
  'Parillada Vegetariano',
  'Chuleta a la Parilla',
  'Pechuga Rellena',
  'Camarones a la Catalana',
  'Pescado en Cilantro y Mayonesa',
  'Ropa Vieja',
  'Bistec a Caballo',
  'Salmon en Limon y Mantequilla',
  'Arroz con Pollo',
  'Tamal Valluno',
  'Pollo Empanizado',
  'Pollo Guisado',
  'Carne Asada',
];
export const InventoryKey = [
  'Bistec Chico',
  'Bistec Grande',
  'Churrasco',
  'Chicharron',
  'Chorizo',
  'Pork Chop',
  'Pork Loin',
  'Shrimp',
  'Salmon En Limon Y Mantequilla',
  'Whole Fish',
  'Frozen Tilapia',
  'Tamal Valluno',
  'Brisket',
  'Patacones Soup',
  'Rib-Eye',
  'Pechuga de Pollo',
  'Pechuga Empanizada',
  'Guisado Pierna',
  'Guisado Pechuga',
  'Aborrajado',
  'Beef Empanada',
  'Chicken Empanada',
  'Vegetable Empanada',
  'Ceviche',
  'Pandebono',
  'Bunuelo',
  'Tequenos',
  'Picada Colombiana',
];
export interface TableInventory {
  [key: string]: InventoryTableData;
}

export interface InventoryTableData {
  category: string;
  totalQuantity: number;
  individualPlates: {
    name: string;
    portion: number;
    modifier?: string;
    quantity: number;
  }[];

  selected?: any;
}
