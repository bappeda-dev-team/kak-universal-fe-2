'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import { useRouter } from "next/navigation";
import { AlertNotification } from "@/components/global/Alert";

interface TargetOpd {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}

interface IndikatorOpd {
    id: string;
    id_tujuan_opd: number;
    indikator: string;
    rumus_perhitungan: string;
    sumber_data: string;
    target: TargetOpd[];
}

interface TujuanOpd {
    id_tujuan_opd: number;
    kode_opd: string;
    nama_opd: string;
    tujuan: string;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
    indikator: IndikatorOpd[];
}

interface Table {
    kode_opd: string;
    tahun: string;
}

const Table: React.FC<Table> = ({ kode_opd, tahun }) => {

    const { branding } = useBrandingContext();
    const [Data, setData] = useState<TujuanOpd[]>([]);
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
                } else if (result.code) {
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
    }, [kode_opd, tahun, token])


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
                            Data.map((item: TujuanOpd, index: number) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan={item.indikator ? item.indikator.length + 1 : 2} className="border-x border-b border-emerald-500 py-4 px-3 text-center">
                                            {index + 1}
                                        </td>
                                        <td rowSpan={item.indikator ? item.indikator.length + 1 : 2} className="border-r border-b border-emerald-500 px-6 py-4">
                                            urusan & bidang urusan
                                        </td>
                                        <td rowSpan={item.indikator ? item.indikator.length + 1 : 2} className="border-r border-b border-emerald-500 px-6 py-4">
                                            {item.tujuan || "-"}
                                        </td>
                                    </tr>
                                    {item.indikator ?
                                        item.indikator.map((i: IndikatorOpd, sub_index: number) => (
                                            <tr key={sub_index}>
                                                <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                    {i.indikator || "-"}
                                                </td>
                                                <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                    {i.rumus_perhitungan || "-"}
                                                </td>
                                                <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                    {i.sumber_data || "-"}
                                                </td>
                                                {i.target ?
                                                    i.target.map((t: TargetOpd, subs_index: number) => (
                                                        <React.Fragment key={subs_index}>
                                                            <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                                {t.target || "-"}
                                                            </td>
                                                            <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                                {t.satuan || "-"}
                                                            </td>
                                                        </React.Fragment>
                                                    ))
                                                    :
                                                    <>
                                                        <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                            -
                                                        </td>
                                                        <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                            -
                                                        </td>
                                                    </>
                                                }
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">-</td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">-</td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">-</td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">-</td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">-</td>
                                        </tr>
                                    }
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
