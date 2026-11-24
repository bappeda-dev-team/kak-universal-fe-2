'use client'

import { AlertNotification } from "@/components/global/Alert";
import { LoadingClip } from "@/components/global/Loading";
import { useState, useEffect } from "react";
import { getToken } from "@/components/lib/Cookie";

interface indikatorProgram {
    id: number;
    kode_indikator: string;
    kode: string;
    indikator: string;
}

interface program {
    id: string;
    kode_program: string;
    nama_program: string;
    kode_opd: kode_opd;
    tahun: string;
    is_active: boolean;
    indikator: indikatorProgram[];
}

interface kode_opd {
    kode_opd: string;
    nama_opd: string;
}

const Table = () => {

    const [Program, setProgram] = useState<program[]>([]);
    const [Error, setError] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);
    const token = getToken();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchOpd = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/program_kegiatan/findall/v2`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                if (data == null) {
                    setDataNull(true);
                    setProgram([]);
                } else if (result.code === 401) {
                    setError(true);
                } else {
                    setError(false);
                    setDataNull(false);
                    setProgram(data);
                }
                setProgram(data);
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        fetchOpd();
    }, [token]);

    const hapusProgram = async (id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/program_kegiatan/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                alert("cant fetch data")
            }
            setProgram(Program.filter((data) => (data.id !== id)))
            AlertNotification("Berhasil", "Data program Berhasil Dihapus", "success", 1000);
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#99CEF5] text-white">
                            <th className="border-r border-b px-6 py-3 min-w-[50px]">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[500px]">Nama Program</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Kode Program</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</th>
                            {/* <th className="border-r border-b px-6 py-3 min-w-[200px]">Aksi</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {DataNull ? (
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={13}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        ) : (
                            Program.map((data, index) => (
                                <tr key={data.id} className="align-top">
                                    <td className="border-r border-b px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="border-r border-b px-6 py-4">
                                        {data.nama_program || "-"}
                                    </td>

                                    <td className="border-r border-b px-6 py-4">
                                        {data.kode_program || "-"}
                                    </td>

                                    {/* Indikator Program */}
                                    <td className="border-r border-b px-6 py-4 min-w-[300px]">
                                        {data.indikator?.length > 0 ? (
                                            <div className="flex flex-col divide-y divide-slate-600">
                                                {data.indikator.map((ind, idx) => (
                                                    <div
                                                        key={ind.id}
                                                        className="flex gap-2 py-3 first:pt-0 last:pb-0"
                                                    >
                                                        <span className="leading-relaxed">
                                                            {ind.indikator || "-"}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
