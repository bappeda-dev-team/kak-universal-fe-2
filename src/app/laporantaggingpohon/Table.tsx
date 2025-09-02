'use client'

import { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { TbCircleCheckFilled } from "react-icons/tb";

interface Table {
    tahun: number;
}

interface PohonKinerja {
    id_pohon: number;
    tahun: number;
    nama_pohon: string;
    kode_opd: string;
    nama_opd: string;
    jenis_pohon: string;
    keterangan_tagging: string;
}

interface TaggingData {
    nama_tagging: string;
    tahun: number;
    pohon_kinerjas: PohonKinerja[];
}

export const Table: React.FC<Table> = ({ tahun }) => {

    
    const [DataTagging, setDataTagging] = useState<TaggingData | null>(null);
    
    const [NamaTagging, setNamaTagging] = useState<string>('');
    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchDataTagging = async () => {
            setLoading(true)
            const API_URL_TAGGING = process.env.NEXT_PUBLIC_API_URL_TAGGING;
            try {
                const response = await fetch(`${API_URL_TAGGING}/laporan/tagging_pokin?nama_tagging=${encodeURIComponent(NamaTagging)}&tahun=${tahun}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                const data = result.data[0];
                if (result.status === 200 || result.status === 201) {
                    setDataTagging(data);
                    console.log(data);
                    setError(false);
                } else {
                    setError(true);
                    setDataTagging(null);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        if (NamaTagging) {
            fetchDataTagging();
        }
    }, [tahun, NamaTagging]);

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl w-full">
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
        <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex items-center gap-2">
                <button
                    className={`flex items-center gap-1 p-2 border ${NamaTagging === "Program Unggulan Bupati" ? 'bg-sky-500 text-white' : 'border-sky-500 text-sky-500'} rounded-lg hover:bg-sky-500 hover:text-white
                        `}
                    onClick={() => setNamaTagging("Program Unggulan Bupati")}
                >
                    <TbCircleCheckFilled />
                    Program Unggulan Bupati
                </button>
                <button
                    className={`flex items-center gap-1 p-2 border ${NamaTagging === "100 Hari Kerja Bupati" ? 'bg-sky-500 text-white' : 'border-sky-500 text-sky-500'} rounded-lg hover:bg-sky-500 hover:text-white
                        `}
                    onClick={() => setNamaTagging("100 Hari Kerja Bupati")}
                >
                    <TbCircleCheckFilled />
                    100 Hari Kerja Bupati
                </button>
                <button
                    className={`flex items-center gap-1 p-2 border ${NamaTagging === "Program Unggulan Pemerintah Pusat" ? 'bg-sky-500 text-white' : 'border-sky-500 text-sky-500'} rounded-lg hover:bg-sky-500 hover:text-white
                        `}
                    onClick={() => setNamaTagging("Program Unggulan Pemerintah Pusat")}
                >
                    <TbCircleCheckFilled />
                    Program Unggulan Pemerintah Pusat
                </button>
            </div>
            {NamaTagging === "" ?
                <h1 className="p-3 border rounded-lg">Pilih Tagging Terlebih Dahulu</h1>
                :
                <div className="overflow-auto rounded-t-xl border">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-emerald-500 text-white">
                                <th rowSpan={2} className="border-r border-b px-6 py-3 w-[50px]">No</th>
                                <th rowSpan={2} className="border-l border-b px-6 py-3 min-w-[200px]">{DataTagging?.nama_tagging || "Tagging"}</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Perangkat Daerah</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Nama Pohon</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Level Pohon</th>

                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Pelaksana</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Rencana Kinerja</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Sub Kegiatan</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Pagu Anggaran</th>
                                <th colSpan={4} className="border-r border-b px-6 py-3 min-w-[100px]">Waktu Pelaksanaan</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Keterangan</th>
                            </tr>
                            <tr className="bg-emerald-700 text-white">
                                <th className="border-r border-b px-3 py-1 min-w-[100px]">TW I</th>
                                <th className="border-r border-b px-3 py-1 min-w-[100px]">TW II</th>
                                <th className="border-r border-b px-3 py-1 min-w-[100px]">TW III</th>
                                <th className="border-r border-b px-3 py-1 min-w-[100px]">TW IV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(DataTagging?.pohon_kinerjas?.length === 0 || DataTagging?.pohon_kinerjas === null) ?
                                <tr>
                                    <td className="px-6 py-3 uppercase" colSpan={13}>
                                        Data Kosong / Belum Ditambahkan
                                    </td>
                                </tr>
                                :
                                DataTagging?.pohon_kinerjas.map((p: PohonKinerja, index: number) => (
                                    <tr className="hover:bg-emerald-50" key={index}>
                                        <td className="border-r border-b px-6 py-4">{index + 1}</td>
                                        <td className="border-r border-b px-6 py-4">{p.keterangan_tagging || "-"}</td>
                                        <td className="border-r border-b px-6 py-4">{p.nama_opd || "-"}</td>
                                        <td className="border-r border-b px-6 py-4">
                                            <p>{p.nama_pohon || "-"} </p>
                                            <p className="font-semibold">({p.id_pohon || "-"})</p>
                                        </td>
                                        <td className="border-r border-b px-6 py-4">{p.jenis_pohon || "-"}</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                        <td className="border-r border-b px-6 py-4">-</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}