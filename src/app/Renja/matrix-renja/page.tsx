'use client'

import { useState, useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { TableRenja } from "./Table";
import Maintenance from "@/components/global/Maintenance";
import { getOpdTahun } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";

const MatrixRenja = () => {

    const { branding } = useBrandingContext();
    const opd = (branding?.user?.roles == 'super_admin' || branding?.user?.roles == 'reviewer') ? branding?.opd?.value : branding?.user?.kode_opd

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan OPD</p>
                <p className="mr-1">/ Renja</p>
                <p className="mr-1">/ Matrix Renja</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex flex-wrap items-center justify-between border-b px-5 py-5">
                    <h1 className="font-bold text-lg uppercase">Matrix Renja {branding?.tahun?.label || ''}</h1>
                    {(branding?.user?.roles == 'super_admin' || branding?.user?.roles == 'reviewer') ?
                        <h1 className="text-sm">{branding?.opd?.label || ''}</h1>
                        :
                        <div className="">
                            <h1 className="text-sm">{branding?.user?.nama_opd || ''}</h1>
                        </div>
                    }
                </div>
                <TableRenja tahun={String(branding?.tahun?.value)} jenis="opd" kode_opd={opd} />
                {/* <Maintenance /> */}
            </div>
        </>
    )
}

export default MatrixRenja;