import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formSchema = z.object({
  email: z.string().email(
      {
          message: "Invalid email address"
      }
  ),
  password: z.string().min(6, {
      message: "Password must be at least 6 characters"
  })
})
