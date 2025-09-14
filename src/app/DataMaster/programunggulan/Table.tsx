'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { TbCircleX, TbCircleCheck, TbMistOff, TbMist } from "react-icons/tb";
import { ButtonBlackBorder } from "@/components/global/Button";
import { AlertQuestion, AlertNotification } from "@/components/global/Alert";
import { useBrandingContext } from "@/context/BrandingContext";

interface Table {
    id: number;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
}

const Table: React.FC<Table> = ({ id, tahun_akhir, tahun_awal, jenis_periode }) => {
    const {branding} = useBrandingContext();
    const Tahun = branding?.tahun ? branding?.tahun?.value : 0;
    
    const [Loading, setLoading] = useState<boolean>(false);
    const [DataNull, setDataNull] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Error, Periksa koneksi internet atau database server, jika error berlanjut silakan hubungi tim developer</h1>
            </div>
        )
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="border-r border-b px-6 py-3 text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[400px]">Program Unggulan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Rencana Implementasi</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Kode</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Tahun Awal</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Tahun Akhir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataNull ? (
                            <tr>
                                <td className="px-6 py-3" colSpan={30}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        ) : (
                                <tr>
                                    <td className="border-x border-b border-orange-500 py-4 px-3 text-center">1</td>
                                    <td className="border-r border-b border-orange-500 px-6 py-4">-</td>
                                    <td className="border-r border-b border-orange-500 px-6 py-4">-</td>
                                    <td className="border-r border-b border-orange-500 px-6 py-4">-</td>
                                    <td className="border-r border-b border-orange-500 px-6 py-4">-</td>
                                    <td className="border-r border-b border-orange-500 px-6 py-4">-</td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
