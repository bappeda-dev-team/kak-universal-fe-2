'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { OpdNull, TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";

interface Table {
    tahun: number;
}

interface Pokin {
    kode_opd: string;
    nama_opd: string;
    tematik: Tematik[];
    persentase_cascading: string;
}
interface Tematik {
    nama: string;
}

const Table: React.FC<Table> = ({ tahun }) => {

    const [Data, setData] = useState<Pokin[]>([]);
    const [Error, setError] = useState<boolean | null>(null);

    const [Loading, setLoading] = useState<boolean | null>(null);
    const token = getToken();
    const { branding } = useBrandingContext();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchIkuOpd = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`${API_URL}/pohon_kinerja_opd/leaderboard_pokin_opd/${tahun}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (result.code === 200) {
                    setData(result.data);
                } else if (result.code === 401) {
                    window.location.href = "/login";
                } else {
                    setData([]);
                    setError(true);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        if (tahun != undefined) {
            fetchIkuOpd();
        }
    }, [token, tahun]);

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
    } else if (branding?.tahun?.value === undefined) {
        return <TahunNull />
    } else {
        return (
            <>
                <div className="overflow-auto m-2 rounded-t-xl border w-full">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-orange-500 text-white">
                                <th className="border-r border-b px-6 py-3 text-center">No</th>
                                <th className="border-r border-b px-6 py-3 w-[350px]">Perangkat Daerah</th>
                                <th className="border-r border-b px-6 py-3 min-w-[200px]">Tema</th>
                                <th className="border-r border-b px-6 py-3 w-[100px]">Persentase Cascading</th>
                            </tr>
                            <tr className="bg-orange-700 text-white">
                                <th className="border-r border-b px-2 py-1 text-center">1</th>
                                <th className="border-r border-b px-2 py-1 text-center">2</th>
                                <th className="border-r border-b px-2 py-1 text-center">3</th>
                                <th className="border-r border-b px-2 py-1 text-center">4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!Data || Data.length === 0) ?
                                <tr>
                                    <td className="px-6 py-3" colSpan={30}>
                                        Data Kosong / Belum Ditambahkan
                                    </td>
                                </tr>
                                :
                                Data.map((item: Pokin, index: number) => (
                                    <tr>
                                        <td className="border-x border-b border-orange-500 py-4 px-3 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-b border-orange-500 px-6 py-4">
                                            {item.nama_opd || "-"}
                                        </td>
                                        <td className="border-r border-b border-orange-500 px-6 py-4">
                                            {item.tematik ? 
                                                item.tematik.map((t: Tematik, index_tematik: number) => (
                                                    <div key={index_tematik} className="flex items-center">
                                                        <p className="py-1 px-2 my-2 bg-orange-500 text-white rounded-lg">{t.nama || "tematik tanpa nama"}</p>
                                                    </div>
                                                ))
                                                :
                                                <p>-</p>
                                            }
                                        </td>
                                        <td className="border-r border-b border-orange-500 px-6 py-4 text-center">
                                            {item.persentase_cascading || "0%"}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Table;
