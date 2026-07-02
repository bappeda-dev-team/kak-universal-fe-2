'use client'

import { FiHome } from "react-icons/fi";
import { getOpdTahun, getUser } from "@/components/lib/Cookie";
import { useEffect, useState } from "react";
import { OpdTahunNull, TahunNull } from "@/components/global/OpdTahunNull";
import { IsLoadingBranding } from "@/components/global/Loading";
import { useBrandingContext } from "@/context/BrandingContext";
import Table from "./comp/Table";

const LaporanKakPage = () => {

    const { branding, LoadingBranding } = useBrandingContext();

    const [User, setUser] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        try {
            const fetchUser = getUser();
            const fetchOpdtahun = getOpdTahun();

            if (fetchOpdtahun?.opd) {
                const valueOpd = {
                    value: fetchOpdtahun.opd.value,
                    label: fetchOpdtahun.opd.label,
                };

                setSelectedOpd(valueOpd);
            }

            if (fetchUser) {
                setUser(fetchUser.user);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const kode_opd = (User?.roles == 'super_admin' || User?.roles == 'reviewer') ? SelectedOpd?.value : User?.kode_opd
    const nama_opd = (User?.roles == 'super_admin' || User?.roles == 'reviewer') ? SelectedOpd?.label : User?.nama_opd
    const tahun = branding?.tahun?.value || 0;

    if (Loading || LoadingBranding) {
        return <IsLoadingBranding />;
    }

    if (tahun === null || tahun === 0) {
        return <TahunNull />;
    }

    if (
        (User?.roles === "super_admin" || User?.roles === "reviewer") &&
        (kode_opd === undefined || kode_opd === null)
    ) {
        return <OpdTahunNull />;
    }

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Laporan</p>
                <p className="mr-1">/ Rencana Kinerja KAK</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-wrap items-end">
                        <h1 className="uppercase font-bold">Laporan KAK</h1>
                        <h1 className="uppercase font-bold ml-1">{nama_opd || "Unknown OPD"}</h1>
                        <h1 className="uppercase font-bold ml-1">Tahun {tahun || "-"}</h1>
                    </div>
                </div>
                <Table tahun={tahun} kode_opd={kode_opd} nama_opd={nama_opd} />
            </div>
        </>
    )
}

export default LaporanKakPage;