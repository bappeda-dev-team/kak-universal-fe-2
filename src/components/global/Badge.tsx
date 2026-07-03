import { ReactNode } from "react";

type BadgeColor =
    | "green"
    | "gray"
    | "blue"
    | "yellow"
    | "red";

interface BadgeProps {
    children: ReactNode;
    color?: BadgeColor;
    className?: string;
}

const colors: Record<BadgeColor, string> = {
    green: "border-green-200 bg-green-50 text-green-700",
    gray: "border-gray-200 bg-gray-50 text-gray-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    red: "border-red-200 bg-red-50 text-red-700",
};

export default function Badge({
    children,
    color = "gray",
    className = "",
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[color]} ${className}`}
        >
            {children}
        </span>
    );
}
