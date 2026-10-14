'use client'

import { useEffect, useState } from "react";
import React from "react";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";
import { LoadingClip } from "@/components/global/Loading";

interface Table {
    kode_opd: string;
    nama_opd: string;
    tahun: number;
}

interface ReviewItem {
    id: number;
    id_tujuan_opd: number;
    id_pohon_kinerja: number;
    review: string;
    keterangan: string;
    catatan: string;
    nama_pegawai: string | null;
    tahun: number;
}

interface Review {
    id: number;
    kode_opd: string;
    nama_opd: string;
    kode_bidang_urusan: string;
    nama_bidang_urusan: string;
    tujuan: string;
    review: {
        validasi: ReviewItem;
        kesesuaian: ReviewItem;
        kelengkapan: ReviewItem;
        catatan: ReviewItem;
    };
}

const keteranganStyle = (keterangan: string): string => {
    if (!keterangan) return "bg-gray-100 text-gray-500";
    const value = keterangan.toLowerCase();
    if (value.includes("tidak") || value.includes("belum")) {
        return "bg-red-100 text-red-600";
    }
    if (value.includes("sesuai") || value.includes("ideal") || value.includes("lengkap")) {
        return "bg-green-100 text-green-600";
    }
    return "bg-gray-100 text-gray-500";
};

const Table: React.FC<Table> = ({ tahun, kode_opd, nama_opd }) => {

    const [Data, setData] = useState<Review[]>([]);
    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);

    const { branding } = useBrandingContext();
    const token = getToken();

    const Dummy = [
        {
            "id": 1,
            "kode_opd": "1.01.2.22.0.00.01.0000",
            "nama_opd": "Dinas Pendidikan dan Kebudayaan",
            "kode_bidang_urusan": "1.01",
            "nama_bidang_urusan": "URUSAN PEMERINTAHAN BIDANG PENDIDIKAN",
            "tujuan": "Terwujudnya sumber daya manusia Mahakam Ulu yang maju melalui kualitas pendidikan",
            "review": {
                "validasi": {
                    "id": 14759,
                    "id_tujuan_opd": 1,
                    "id_pohon_kinerja": 0,
                    "review": "VALIDASI",
                    "keterangan": "Tidak Ideal",
                    "catatan": "",
                    "created_by": "admin1",
                    "nama_pegawai": "super admin satu",
                    "tahun": 0
                },
                "kesesuaian": {
                    "id": 182429,
                    "id_tujuan_opd": 1,
                    "id_pohon_kinerja": 0,
                    "review": "KESESUAIAN",
                    "keterangan": "Tidak Sesuai",
                    "catatan": "belum sesuai",
                    "created_by": "admin1",
                    "nama_pegawai": "super admin satu",
                    "tahun": 0
                },
                "kelengkapan": {
                    "id": 295214,
                    "id_tujuan_opd": 1,
                    "id_pohon_kinerja": 0,
                    "review": "KELENGKAPAN",
                    "keterangan": "Tidak Lengkap",
                    "catatan": "kurang adanya kualitas",
                    "created_by": "admin1",
                    "nama_pegawai": "super admin satu",
                    "tahun": 0
                },
                "catatan": {
                    "id": null,
                    "id_tujuan_opd": null,
                    "id_pohon_kinerja": null,
                    "review": "CATATAN",
                    "keterangan": "",
                    "catatan": "belum sesuai, kurang adanya kualitas",
                    "created_by": null,
                    "nama_pegawai": null,
                    "tahun": null
                }
            }
        },
        {
            "id": 227,
            "kode_opd": "1.01.2.22.0.00.01.0000",
            "nama_opd": "Dinas Pendidikan dan Kebudayaan",
            "kode_bidang_urusan": "2.22",
            "nama_bidang_urusan": "URUSAN PEMERINTAHAN BIDANG KEBUDAYAAN",
            "tujuan": "Meningkatkan pelestarian dan pengembangan kebudayaan daerah",
            "review": {
                "validasi": {
                    "id": 812323,
                    "id_tujuan_opd": 227,
                    "id_pohon_kinerja": 0,
                    "review": "VALIDASI",
                    "keterangan": "Ideal",
                    "catatan": "",
                    "created_by": "admin1",
                    "nama_pegawai": "super admin satu",
                    "tahun": 0
                },
                "kesesuaian": {
                    "id": null,
                    "id_tujuan_opd": null,
                    "id_pohon_kinerja": null,
                    "review": "KESESUAIAN",
                    "keterangan": "Sesuai",
                    "catatan": "",
                    "created_by": null,
                    "nama_pegawai": null,
                    "tahun": null
                },
                "kelengkapan": {
                    "id": null,
                    "id_tujuan_opd": null,
                    "id_pohon_kinerja": null,
                    "review": "KELENGKAPAN",
                    "keterangan": "Lengkap",
                    "catatan": "",
                    "created_by": null,
                    "nama_pegawai": null,
                    "tahun": null
                },
                "catatan": null
            }
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${branding?.api_perencanaan}/laporan/review_tujuan_opd/findall/${kode_opd}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.code === 200) {
                    setData(result.data);
                } else {
                    setError(true);
                    console.log(result);
                }
            } catch (err) {
                setError(true);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [tahun, kode_opd, branding, token])

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
    }
    return (
        <div className="flex flex-col items-center gap-1 w-full">
            <div className="overflow-auto m-2 rounded-xl border w-full">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-r border-b px-4 py-3 text-center w-[60px]">No</th>
                            <th className="border-r border-b px-4 py-3 min-w-[280px] text-left">Tujuan OPD</th>
                            <th className="border-r border-b px-4 py-3 min-w-[180px] text-left">Validasi</th>
                            <th className="border-r border-b px-4 py-3 min-w-[180px] text-left">Kesesuaian</th>
                            <th className="border-r border-b px-4 py-3 min-w-[180px] text-left">Kelengkapan</th>
                            <th className="border-b px-4 py-3 min-w-[220px] text-left">Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Dummy.length === 0 ? (
                            <tr>
                                <td className="px-6 py-4 text-center text-gray-500" colSpan={6}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        ) : (
                            Dummy.map((item, index) => {
                                const valid = item.review.validasi.keterangan === "Ideal"
                                return (
                                    <tr key={item.id} className="align-top hover:bg-emerald-50 transition-colors">
                                        <td className="border-x border-b border-emerald-200 py-4 px-4 text-center text-gray-600">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-b border-emerald-200 px-4 py-4">
                                            <p className="font-bold text-gray-800">{item.tujuan || "tujuan opd unknown"}</p>
                                            <p className="mt-1 text-xs uppercase text-gray-400">
                                                {item.kode_bidang_urusan || ""} {item.nama_bidang_urusan || ""}
                                            </p>
                                        </td>
                                        <td className="border-r border-b border-emerald-200 px-4 py-4">
                                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${keteranganStyle(item.review.validasi.keterangan)}`}>
                                                {item.review.validasi.keterangan || "Belum Direview"}
                                            </span>
                                        </td>
                                        <td className="border-r border-b border-emerald-200 px-4 py-4">
                                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${keteranganStyle(item.review.kesesuaian.keterangan)}`}>
                                                {item.review.kesesuaian.keterangan || "Belum Direview"}
                                            </span>
                                            {item.review.kesesuaian.catatan && (
                                                <p className="mt-2 text-xs text-gray-500">{item.review.kesesuaian.catatan}</p>
                                            )}
                                        </td>
                                        <td className="border-r border-b border-emerald-200 px-4 py-4">
                                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${keteranganStyle(item.review.kelengkapan.keterangan)}`}>
                                                {item.review.kelengkapan.keterangan || "Belum Direview"}
                                            </span>
                                            {item.review.kelengkapan.catatan && (
                                                <p className="mt-2 text-xs text-gray-500">{item.review.kelengkapan.catatan}</p>
                                            )}
                                        </td>
                                        <td className="border-b border-emerald-200 px-4 py-4 text-gray-600">
                                            {item.review.catatan?.catatan || "-"}
                                        </td>

                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
