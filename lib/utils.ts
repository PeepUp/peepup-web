import { ClassValue } from "tailwind-variants";
import { twMerge as twM } from "tailwind-merge";
import clsx from "clsx";

export function cn(...input: ClassValue[]) {
  return twM(clsx(input));
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getGreeting(): string {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Rise and shine";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 24) {
    return "Good evening";
  } else {
    return "Night Night";
  }
}

export function base64Encode(str: string): string {
  // Using the built-in btoa function for encoding
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    ),
  );
}

export function base64Decode(str: string): string {
  // Using the built-in atob function for decoding
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2),
      )
      .join(""),
  );
}
