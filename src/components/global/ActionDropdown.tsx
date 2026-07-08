'use client';

import { useEffect, useRef, useState } from "react";

export type ActionItem = {
    label: string;
    onClick: () => void;
    danger?: boolean;
};

type ActionDropdownProps = {
    actions: ActionItem[];
};

export default function ActionDropdown({
    actions,
}: ActionDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div
            ref={ref}
            className="relative"
        >
            <button
                onClick={() => setOpen(!open)}
                className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-50"
            >
                Aksi ▾
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md border bg-white py-1 shadow-lg">
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => {
                                action.onClick();
                                setOpen(false);
                            }}
                            className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${action.danger
                                    ? "text-red-600"
                                    : "text-gray-700"
                                }`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
