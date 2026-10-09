import { CATEGORIES, STATUSES } from "../types/order";
import type { Category, OrderData, Status } from "../types/order";

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function isBeforeToday(date: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
}

export function validateOrder(body: Record<string, unknown>, isNew: boolean): string[] {
  const errors: string[] = [];

  if (!isText(body.customerName)) errors.push("El nom del client és obligatori");
  if (!isText(body.address)) errors.push("L'adreça és obligatòria");

  if (!CATEGORIES.includes(body.category as Category)) {
    errors.push("La categoria ha de ser pastis, galetes o pack");
  }

  const lat = body.lat;
  if (typeof lat !== "number" || lat < -90 || lat > 90) {
    errors.push("La latitud ha de ser un número entre -90 i 90");
  }

  const lng = body.lng;
  if (typeof lng !== "number" || lng < -180 || lng > 180) {
    errors.push("La longitud ha de ser un número entre -180 i 180");
  }

  const date = body.deliveryDate;
  if (!isText(date) || Number.isNaN(Date.parse(date))) {
    errors.push("La data d'entrega no és vàlida");
  } else if (isNew && isBeforeToday(date)) {
    errors.push("La data d'entrega no pot ser anterior a avui");
  }

  const total = body.total;
  if (typeof total !== "number" || total < 0) {
    errors.push("El total ha de ser un número igual o superior a 0");
  }

  
  if (body.status !== undefined || !isNew) {
    if (!STATUSES.includes(body.status as Status)) {
      errors.push("L'estat no és vàlid");
    }
  }

  return errors;
}


export function pickOrderData(body: Record<string, unknown>): OrderData {
  const contact = body.contact;
  const description = body.description;

  return {
    customerName: String(body.customerName).trim(),
    contact: typeof contact === "string" ? contact.trim() : "",
    address: String(body.address).trim(),
    lat: body.lat as number,
    lng: body.lng as number,
    deliveryDate: String(body.deliveryDate),
    category: body.category as Category,
    description: typeof description === "string" ? description.trim() : "",
    total: body.total as number,
    status: (body.status as Status | undefined) ?? "pendent",
  };
}