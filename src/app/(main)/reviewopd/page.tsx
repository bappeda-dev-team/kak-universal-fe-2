'use client'

import { FiHome } from "react-icons/fi";
import TableOpd from "@/components/pages/review/TableOpd";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull, OpdNull } from "@/components/global/OpdTahunNull";
import { useState, useEffect } from "react";
import Maintenance from "@/components/global/Maintenance";
import { useBrandingContext } from "@/context/BrandingContext";
import { getUser } from "@/components/lib/Cookie";
import { getToken } from "@/components/lib/Cookie";


const ReviewOpd = () => {

    const [Tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const { branding } = useBrandingContext();
    const [User, setUser] = useState<any>(null);
    

    useEffect(() => {
            const data = getUser();
            if (data) {
                setUser(data.user);
            }
        }, []);

    useEffect(() => {
        const data = getOpdTahun();
        if (data.tahun) {
            const tahun = {
                value: data.tahun.value,
                label: data.tahun.label,
            }
            setTahun(tahun);
        }
        if (data.opd) {
            const opd = {
                value: data.opd.value,
                label: data.opd.label,
            }
            setSelectedOpd(opd);
        }
    }, []);

    const kode_opd = (User?.roles == "super_admin" || User?.roles == "reviewer") ? branding?.opd?.value : User?.kode_opd;
    const nama_opd = (User?.roles == "super_admin" || User?.roles == "reviewer") ? branding?.opd?.label : User?.nama_opd;
    const tahun = branding?.tahun?.value;
    // const token = getToken();

    const handleCetakPDF = async () => {
        if (!kode_opd || !tahun) {
        alert("OPD dan tahun belum tersedia");
        return;
        }

        try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = getToken();

        const response = await fetch(
            `${API_URL}/review_pokin/opd/${kode_opd}/${tahun}/download-pdf`,
            {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
            },
        );

        if (!response.ok) {
            throw new Error(`Gagal mencetak PDF: ${response.status}`);
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        window.open(url, "_blank");

        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 1000);
        } catch (error) {
        console.error("Gagal mencetak PDF:", error);
        alert("Gagal mencetak PDF");
        }
    };

    if (tahun === undefined) {
        return <TahunNull />
    } else if (kode_opd === null || kode_opd === undefined) {
        return <OpdNull />
    } else {

        return (
            <>
                <div className="flex items-center">
                    <a href="/" className="mr-1"><FiHome /></a>
                    <p className="mr-1">/ Laporan</p>
                    <p className="mr-1">/ Review OPD</p>
                </div>
                <div className="mt-3 rounded-xl shadow-lg border">
                    <div className="flex items-center justify-between border-b px-5 py-5">
                        <div className="flex flex-wrap items-end gap-1">
                            <h1 className="uppercase font-bold">Review Pohon Kinerja OPD || </h1>
                            <h1 className="uppercase font-bold">{nama_opd || "-"} ||</h1>
                            <h1 className="uppercase font-bold">{tahun || "-"}</h1>
                        </div>
                        <button
                            type="button"
                            onClick={handleCetakPDF}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
                        >
                            Cetak PDF
                        </button>
                    </div>
                    <div className="mx-3 mb-3">
                        {/* <Maintenance /> */}
                        <TableOpd
                            tahun={tahun}
                            kode_opd={kode_opd}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default ReviewOpd;