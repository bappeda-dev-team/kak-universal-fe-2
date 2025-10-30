'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { TahunNull, OpdTahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import { useRouter } from "next/navigation";
import { AlertNotification } from "@/components/global/Alert";

interface Target {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}

interface Indikator {
    id: string;
    id_tujuan_opd: number;
    indikator: string;
    rumus_perhitungan: string;
    sumber_data: string;
    target: Target[];
}

interface TujuanOpd {
    id_tujuan_opd: number;
    tujuan: string;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
    indikator: Indikator[];
}

interface Tujuan {
    kode_urusan: string;
    urusan: string;
    kode_bidang_urusan: string;
    nama_bidang_urusan: string;
    kode_opd: string;
    nama_opd: string;
    tujuan_opd: TujuanOpd[];
}

interface Table {
    kode_opd: string;
    tahun: string;
}

const Table: React.FC<Table> = ({ kode_opd, tahun }) => {

    const { branding } = useBrandingContext();
    const [Data, setData] = useState<Tujuan[]>([]);
    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);

    const [Loading, setLoading] = useState<boolean | null>(null);
    const token = getToken();
    const router = useRouter();

    useEffect(() => {
        const fetchRenja = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/tujuan_opd/renja/${kode_opd}/${tahun}/RPJMD`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (result.code === 200) {
                    setData(result.data);
                    setError(false);
                } else if (result.code === 401) {
                    AlertNotification("Login Kembali", "", "warning", 2000);
                    router.push('/login');
                } else {
                    setData([]);
                    setError(true);
                    AlertNotification("Error", `${result.data || "error saat mengambil data renja tujuan opd"}`, "warning", 2000);
                }
            } catch (err) {
                AlertNotification("Error", `${err}`, "warning", 2000);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchRenja();
    }, [kode_opd, tahun, token, router])


    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Error, Periksa koneksi internet atau database server, jika error masih berlanjut hubungi tim developer</h1>
            </div>
        )
    } else if (branding?.tahun?.value == undefined) {
        return <TahunNull />
    } else if (branding?.user?.roles == 'super_admin' || branding?.user?.roles == 'reviewer') {
        if (branding?.opd?.value == undefined) {
            return (
                <>
                    <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                        <OpdTahunNull />
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="text-xm bg-emerald-500 text-white">
                            <td rowSpan={2} className="border-r border-b px-6 py-3 max-w-[100px] text-center">No</td>
                            <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Urusan & Bidang Urusan</td>
                            <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[400px] text-center">Tujuan OPD</td>
                            <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</td>
                            <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Rumus Perhitungan</td>
                            <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Sumber Data</td>
                            <th colSpan={2} className="border-l border-b px-6 py-3 min-w-[100px]">{branding?.tahun?.value}</th>
                        </tr>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-l border-b px-6 py-3 min-w-[50px]">Target</th>
                            <th className="border-l border-b px-6 py-3 min-w-[50px]">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.length == 0 ?
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={13}>
                                    Tidak ada User / Belum Ditambahkan
                                </td>
                            </tr>
                            :
                            Data.map((item: Tujuan, index: number) => {
                                const TotalRow = item.tujuan_opd.reduce((total, item) => total + (item.indikator.length === 0 ? 1 : item.indikator.length), 0) + item.tujuan_opd.length + 1;
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td rowSpan={TotalRow} className="border-x border-b border-emerald-500 py-4 px-3 text-center">
                                                {index + 1}
                                            </td>
                                            <td rowSpan={TotalRow} className="border-r border-b border-emerald-500 px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <p className="border-b border-emerald-500 pb-2">{item.urusan ? `${item.kode_urusan} - ${item.urusan}` : "-"}</p>
                                                    <p>{item.kode_bidang_urusan ? `${item.kode_bidang_urusan} - ${item.nama_bidang_urusan}` : "-"}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        {item.tujuan_opd.map((item: TujuanOpd) => (
                                            <React.Fragment key={item.id_tujuan_opd}>
                                                <tr>
                                                    <td className="border-x border-b border-emerald-500 px-6 py-6 h-full" rowSpan={item.indikator.length !== 0 ? item.indikator.length + 1 : 2}>
                                                        <p className="flex min-h-[100px] bg-white items-center">
                                                            {item.tujuan || "-"}
                                                        </p>
                                                    </td>
                                                </tr>
                                                {/* INDIKATOR */}
                                                {item.indikator.length === 0 ? (
                                                    <React.Fragment>
                                                        <tr>
                                                            <td colSpan={30} className="border-x border-b border-emerald-500 px-6 py-6 bg-yellow-500 text-white">indikator tujuan opd belum di tambahkan</td>
                                                        </tr>
                                                    </React.Fragment>
                                                ) : (
                                                    item.indikator.map((i: Indikator) => (
                                                        <tr key={i.id}>
                                                            <td className="border-x border-b border-emerald-500 px-6 py-6">{i.indikator || "-"}</td>
                                                            <td className="border-x border-b border-emerald-500 px-6 py-6">{i.rumus_perhitungan || "-"}</td>
                                                            <td className="border-x border-b border-emerald-500 px-6 py-6">{i.sumber_data || "-"}</td>
                                                            {i.target.map((t: Target) => (
                                                                <React.Fragment key={t.id}>
                                                                    <td className="border-x border-b border-emerald-500 px-6 py-6 text-center">{t.target || "-"}</td>
                                                                    <td className="border-x border-b border-emerald-500 px-6 py-6 text-center">{t.satuan || "-"}</td>
                                                                </React.Fragment>
                                                            ))}
                                                        </tr>
                                                    ))
                                                )}
                                            </React.Fragment>
                                        ))}

                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
