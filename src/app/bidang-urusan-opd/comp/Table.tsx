'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";

interface Pokin {
    kode_opd: string;
    nama_opd: string;
    tematik: Tematik[];
    persentase_cascading: string;
}
interface Tematik {
    nama: string;
}

const Table = () => {

    const [Data, setData] = useState<Pokin[]>([]);
    const [Error, setError] = useState<boolean | null>(null);

    const [Loading, setLoading] = useState<boolean | null>(null);
    const token = getToken();
    const { branding } = useBrandingContext();
    const opd = branding?.user?.roles == "super_admin" ? branding?.opd?.value : branding?.user?.kode_opd;

    useEffect(() => {
        const fetchIkuOpd = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch(`${branding?.api_perencanaan}/bidang_urusan_opd/findall/${opd}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                console.log(result);
                // if (result.code === 200) {
                //     setData(result.data);
                // } else if (result.code === 401) {
                //     window.location.href = "/login";
                // } else {
                //     setData([]);
                //     setError(true);
                // }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
            fetchIkuOpd();
    }, [branding, opd]);

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    // } else if (Error) {
    //     return (
    //         <div className="border p-5 rounded-xl shadow-xl">
    //             <h1 className="text-red-500 font-bold mx-5 py-5">Periksa koneksi internet atau database server</h1>
    //         </div>
    //     )
    } else {
        return (
            <>
                <div className="overflow-auto m-2 rounded-t-xl border w-full">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border-r border-b px-6 py-3 text-center w-[50px]">No</th>
                                <th className="border-r border-b px-6 py-3 text-center">Bidang Urusan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {(!Data || Data.length === 0) ?
                                <tr>
                                    <td className="px-6 py-3" colSpan={30}>
                                        Data Kosong / Belum Ditambahkan
                                    </td>
                                </tr>
                                :
                                Data.map((item: Pokin, index: number) => (
                                    <tr key={index}>
                                        <td className="border-x border-b border-blue-500 py-4 px-3 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-b border-blue-500 px-6 py-4">
                                            {item.nama_opd || "-"}
                                        </td>
                                        <td className="border-r border-b border-blue-500 px-6 py-4">
                                            {item.tematik ? 
                                                item.tematik.map((t: Tematik, index_tematik: number) => (
                                                    <div key={index_tematik} className="flex items-center">
                                                        <p className="py-1 px-2 my-2 bg-emerald-600 text-white rounded-lg">{t.nama || "tematik tanpa nama"}</p>
                                                    </div>
                                                ))
                                                :
                                                <p>-</p>
                                            }
                                        </td>
                                        <td className="border-r border-b font-bold border-blue-500 px-6 py-4 text-center">
                                            {item.persentase_cascading || "0%"}
                                        </td>
                                    </tr>
                                ))
                            } */}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Table;
