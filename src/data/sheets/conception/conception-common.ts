import type { DevSheet } from "../../schema";
import { universalSheet } from "../common";

export function conceptionSheet(data: Omit<DevSheet, "part" | "status" | "category" | "level" | "tabs">): DevSheet {
  return universalSheet("C", "Conception", data);
}
