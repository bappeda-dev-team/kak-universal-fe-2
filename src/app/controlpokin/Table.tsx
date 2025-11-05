'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";

const Table = () => {

    const { branding } = useBrandingContext();
    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);

    const [Loading, setLoading] = useState<boolean | null>(null);
    const [Tahun, setTahun] = useState<any>(null);
    const token = getToken();


    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else if (branding?.tahun?.value == undefined) {
        return <TahunNull />
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border w-full">
                <table className="w-full">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="border-r border-b px-6 py-3 text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Level Pohon Kinerja</th>
                            <th className="border-r border-b px-6 py-3 w-[200px]">Jumlah Pokin</th>
                            <th className="border-r border-b px-6 py-3 w-[200px]">Jumlah Pelaksana</th>
                            <th className="border-l border-b px-6 py-3 w-[200px]">Jumlah Pokin tanpa Pelaksana</th>
                            <th className="border-l border-b px-6 py-3 w-[200px]">
                                <div className="flex flex-col gap-1">
                                    <p>Persentase</p>
                                    <p className="text-sm">(Kolom 5 / Kolom 3)</p>
                                </div>
                            </th>
                        </tr>
                        <tr className="bg-orange-700 text-white">
                            <th className="border-r border-b px-2 py-1 text-center">1</th>
                            <th className="border-r border-b px-2 py-1 min-w-[300px]">2</th>
                            <th className="border-r border-b px-2 py-1 w-[200px]">3</th>
                            <th className="border-r border-b px-2 py-1 w-[200px]">4</th>
                            <th className="border-l border-b px-2 py-1 w-[200px]">5</th>
                            <th className="border-l border-b px-2 py-1 w-[200px]">6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-x border-b border-orange-500 py-4 px-3 text-center">
                                1
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-red-400 font-bold">
                                Strategic
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td className="border-x border-b border-orange-500 py-4 px-3 text-center">
                                2
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-blue-500 font-bold">
                                Tactical
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td className="border-x border-b border-orange-500 py-4 px-3 text-center">
                                3
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-green-500 font-bold">
                                Operational
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td className="border-x border-b border-orange-500 py-4 px-3 text-center">
                                4
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-emerald-400 font-bold">
                                Operational N
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                -
                            </td>
                            <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                0%
                            </td>
                        </tr>
                        <tr className="bg-orange-500 text-white">
                            <td colSpan={2} className="border-r border-l border-r-white border-l-orange-500 px-6 py-4 font-bold">
                                Total
                            </td>
                            <td className="text-center border-r border-white px-6 py-4 font-bold">
                                -
                            </td>
                            <td className="text-center border-r border-white px-6 py-4 font-bold">
                                -
                            </td>
                            <td className="text-center border-r border-white px-6 py-4 font-bold">
                                -
                            </td>
                            <td className="text-center border-r border-orange-500 px-6 py-4 font-bold">
                                0%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
