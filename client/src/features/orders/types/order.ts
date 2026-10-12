export type Category = "pastis" | "galetes" | "pack";
export type Status = "pendent" | "preparacio" | "llesta" | "entregada" | "cancelada";

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