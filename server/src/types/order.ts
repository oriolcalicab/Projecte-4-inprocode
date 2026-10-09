export interface Order {
  id: string;
  customerName: string;
  address: string;
  lat: number;
  lng: number;
  deliveryDate: string;
  category: "pastis" | "galetes" | "pack";
  total: number;
  status: "pendent" | "preparacio" | "llesta" | "entregada" | "cancelada";
}