export interface Company {
  id: number;
  name: string;
  employees: number;
  valuation: number;
}
export interface CompanyList {
  data: Array<Company>;
}
export interface Sort {
  active: string;
  direction: string;
}
