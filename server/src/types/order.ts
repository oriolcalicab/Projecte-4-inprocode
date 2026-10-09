export const CATEGORIES = ["pastis", "galetes", "pack"] as const;
export const STATUSES = [
  "pendent",
  "preparacio",
  "llesta",
  "entregada",
  "cancelada",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type Status = (typeof STATUSES)[number];

export interface Order {
  id: string;
  customerName: string;
  contact: string;
  address: string;
  lat: number;
  lng: number;
  deliveryDate: string; 
  category: Category;
  description: string;
  total: number;
  status: Status;
}


export type OrderData = Omit<Order, "id">;