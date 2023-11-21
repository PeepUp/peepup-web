import { ClassValue } from "tailwind-variants";
import { twMerge as twM } from "tailwind-merge";
import clsx from "clsx";

export function cn(...input: ClassValue[]) {
  return twM(clsx(input));
}
