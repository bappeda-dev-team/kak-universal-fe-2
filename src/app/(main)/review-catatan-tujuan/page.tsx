'use client'

import { useEffect, useState } from "react";
import { getUser } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import { TahunNull, OpdNull } from "@/components/global/OpdTahunNull";
import { FiHome } from "react-icons/fi";
import Table from "./comp/Table";
import { getToken } from "@/components/lib/Cookie";
import { ButtonBlackBorder } from "@/components/global/Button";
import { TbPrinter } from "react-icons/tb";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";

const ReviewCatatanTujuan = () => {

    const { branding } = useBrandingContext();
    const [User, setUser] = useState<any>(null);
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const data = getUser();
        if (data) {
            setUser(data.user);
        }
    }, []);

    const kode_opd = (User?.roles == "super_admin" || User?.roles == "reviewer") ? branding?.opd?.value : User?.kode_opd;
    const nama_opd = (User?.roles == "super_admin" || User?.roles == "reviewer") ? branding?.opd?.label : User?.nama_opd;
    const tahun = branding?.tahun?.value;
    const token = getToken();

    const cetakReview = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${branding?.api_perencanaan}/cetak/laporan/review_tujuan_opd/${kode_opd}`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Gagal mencetak");
            }

            const blob = await response.blob();

            const disposition = response.headers.get("Content-Disposition");

            let filename = `Review_Tujuan_OPD_${nama_opd}.pdf`;

            if (disposition) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match) {
                    filename = match[1];
                }
            }

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            AlertNotification("Gagal", `terdapat kesalahan pada backend / server ketika mencetak`, "error", 2000);
        } finally {
            setLoading(false);
        }
    }

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
                    <p className="mr-1">/ Review Pokin</p>
                    <p className="mr-1">/ Review Tujuan OPD</p>
                </div>
                <div className="mt-3 rounded-xl shadow-lg border">
                    <div className="flex items-center justify-between border-b px-5 py-5">
                        <div className="flex flex-wrap items-end">
                            <h1 className="uppercase font-bold">Review Tujuan OPD</h1>
                            <h1 className="uppercase font-bold ml-1">Tahun {tahun || "-"}</h1>
                        </div>
                        <ButtonBlackBorder
                            className="flex items-center gap-1"
                            onClick={cetakReview}
                            disabled={Loading}
                        >
                            {Loading ? 
                                <LoadingButtonClip />
                            :
                                <TbPrinter />
                            }
                            Cetak
                        </ButtonBlackBorder>
                    </div>
                    <div className="px-2">
                        <Table
                            kode_opd={kode_opd}
                            nama_opd={nama_opd}
                            tahun={tahun}
                        />
                    </div>
                </div>
            </>
        )
    }

}

export default ReviewCatatanTujuan;