import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number) {
  return `₦${(amount / 1000000).toFixed(1)}M`;
}

export function getRiskBadgeVariant(riskLevel: string) {
  switch (riskLevel) {
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    case "Low":
      return "default";
    default:
      return "default";
  }
}

export function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Current":
      return "default";
    case "Late":
      return "secondary";
    case "Overdue":
      return "destructive";
    default:
      return "default";
  }
}

export function getRiskBadgeColor(riskLevel: string) {
  switch (riskLevel) {
    case "High":
      return "bg-red-500 text-white";
    case "Medium":
      return "bg-yellow-500 text-white";
    case "Low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export function getRiskProgressColor(riskScore: number) {
  if (riskScore < 30) {
    return "green";
  } else if (riskScore < 70) {
    return "yellow";
  } else {
    return "red";
  }
}
