'use client'

import { FiHome } from "react-icons/fi";
import { useBrandingContext } from "@/context/BrandingContext";
// import Table from "@/components/pages/tujuanopd/Table";

const RenjaPenetapanTujuanPage = () => {

    const {branding} = useBrandingContext();

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan OPD</p>
                <p className="mr-1">/ Renja</p>
                <p className="mr-1">/ Penetapan</p>
                <p className="mr-1">/ Tujuan OPD</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-wrap items-end">
                        <h1 className="uppercase font-bold">Renja Penetapan Tujuan OPD</h1>
                        <h1 className="uppercase font-bold ml-1">{branding?.tahun?.label || ""}</h1>
                    </div>
                </div>
            
            </div>
        </>
    )
}

export default RenjaPenetapanTujuanPage;