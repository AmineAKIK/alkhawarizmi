import type { DevSheet } from "../../schema";
import { universalSheet } from "../common";

export function cultureSheet(data: Omit<DevSheet, "part" | "category" | "level" | "tabs">): DevSheet {
  return universalSheet("F", "Culture", data);
}
