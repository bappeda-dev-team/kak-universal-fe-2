'use client'

import Table from "./comp/Table";
import { useBrandingContext } from "@/context/BrandingContext";
import { IsLoadingBranding } from "@/components/global/Loading";
import { TahunNull, OpdTahunNull } from "@/components/global/OpdTahunNull";
import { useEffect, useState } from "react";

const JabatanOpd = () => {
    const [KodeOpd, setKodeOpd] = useState<string>("");
    const [NamaOpd, setNamaOpd] = useState<string>("");
    const [Tahun, setTahun] = useState<number>(0);

    const { LoadingBranding, branding } = useBrandingContext();

    useEffect(() => {
        // Tunggu branding selesai dimuat
        if (LoadingBranding || !branding) return;

        const isSuperAdmin = branding.user?.roles?.includes("super_admin");

        if (isSuperAdmin) {
            setKodeOpd(branding.opd?.value ?? "");
            setNamaOpd(branding.opd?.label ?? "");
        } else {
            setKodeOpd(branding.user?.kode_opd);
            setNamaOpd(branding.user?.nama_opd);
        }

        setTahun(Number(branding.tahun ?? 0));
    }, [LoadingBranding, branding]);

    if (LoadingBranding) {
        return <IsLoadingBranding />
    }
    else if (Tahun === 0) {
        return <TahunNull />
    }
    else if (KodeOpd === "" || NamaOpd === "") {
        return (
            <>
                <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                    <OpdTahunNull />
                </div>
            </>
        )
    }

    return (
        <>
            <Table
                kode_opd={KodeOpd}
                nama_opd={NamaOpd}
                tahun={Tahun}
            />
        </>
    )
}
export default JabatanOpd;
