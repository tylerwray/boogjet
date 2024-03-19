import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ValueOf } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashMapBy<T>(objects: T[], key: keyof T) {
  const hashTable: Map<ValueOf<T>, T> = new Map();

  for (const obj of objects) {
    hashTable.set(obj[key], obj);
  }

  return hashTable;
}

export function formatMoney(num: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

export const amountIntToFloat = (num: number) =>
  Math.round(num + Number.EPSILON) / 100;

export const amountFloatToInt = (num: number) =>
  Math.round((num + Number.EPSILON) * 100);
