import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// function for comibine classes and use conditional classes 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}