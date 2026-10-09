import type { Order } from "../types/order";

export const mockOrders: Order[] = [
  {
    id: "1",
    customerName: "Marta Vidal",
    address: "Carrer de Mallorca 401, Barcelona",
    lat: 41.4036,
    lng: 2.1744,
    deliveryDate: "2026-10-15T17:00:00",
    category: "pastis",
    total: 38,
    status: "pendent",
  },
  {
    id: "2",
    customerName: "Jordi Puig",
    address: "Plaça de Catalunya 1, Barcelona",
    lat: 41.387,
    lng: 2.17,
    deliveryDate: "2026-10-16T11:30:00",
    category: "galetes",
    total: 15.5,
    status: "preparacio",
  },
  {
    id: "3",
    customerName: "Clara Soler",
    address: "Carrer d'Olot 5, Barcelona",
    lat: 41.4145,
    lng: 2.1527,
    deliveryDate: "2026-10-18T09:00:00",
    category: "pack",
    total: 52,
    status: "llesta",
  },
];