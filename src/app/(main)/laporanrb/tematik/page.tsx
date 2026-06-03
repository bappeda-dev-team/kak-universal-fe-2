'use client'

import { FiHome } from "react-icons/fi";
import { Table } from "./comp/Table";
import { useBrandingContext } from "@/context/BrandingContext";
import { IsLoadingBranding } from "@/components/global/Loading";

const LaporanRbTematik = () => {

    const { LoadingBranding, branding } = useBrandingContext();

    if(LoadingBranding){
        return <IsLoadingBranding />
    } else {
        return (
            <>
                <div className="flex items-center">
                    <a href="/" className="mr-1"><FiHome /></a>
                    <p className="mr-1">/ Laporan</p>
                    <p className="mr-1">/ RB Tematik</p>
                </div>
                <div className="mt-3 rounded-xl shadow-lg border">
                    <div className="flex items-center justify-between border-b px-5 py-5">
                        <div className="flex flex-wrap items-end">
                            <h1 className="uppercase font-bold">Laporan RB Tematik</h1>
                            <h1 className="uppercase font-bold ml-1">{branding?.tahun?.label}</h1>
                        </div>
                    </div>
                    <div className="m-2 bg-white">
                        <Table />
                    </div>
                </div>
            </>
        )
    }
}

export default LaporanRbTematik;