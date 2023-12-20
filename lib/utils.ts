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
