"use client";

import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import ModalPengampuSubkegiatan from "./ModalPengampuSubkegiatan";
import { PengampuSubkegiatanProps } from "@/types";

const ButtonPengampuSubkegiatan = (
    props: PengampuSubkegiatanProps
) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                title="Lihat Pengampu Subkegiatan"
                onClick={() => setIsOpen(true)}
                className="
                    inline-flex items-center gap-2
                    rounded-md border border-emerald-500
                    px-3 py-1.5
                    text-xs font-medium text-emerald-600
                    transition-colors
                    hover:bg-emerald-50
                    active:bg-emerald-100
                "
            >
                <FiUsers size={14} />
                Lihat Pengampu
            </button>

            {isOpen && (
                <ModalPengampuSubkegiatan
                    {...props}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default ButtonPengampuSubkegiatan;
