'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull, OpdTahunNull } from "@/components/global/OpdTahunNull";
import { getToken, getUser } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";

type Target = {
    id_target: string;
    indikator_id: string;
    target: string;
    satuan: string;
};

type Indikator = {
    id_indikator: string;
    id_pokin: string;
    nama_indikator: string;
    targets: Target[];
};

type Review = {
    id_pohon: number;
    parent: number;
    nama_pohon: string;
    level_pohon: number;
    jenis_pohon: string;
    indikator: Indikator[];
    review: string;
    keterangan: string;
    created_by: string;
    created_at: string;
    updated_at: string;
};


interface table {
    tahun: number;
    kode_opd: string;
}

const Table: React.FC<table> = ({ tahun, kode_opd }) => {

    const [ReviewOpd, setReviewOpd] = useState<Review[]>([]);

    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const token = getToken();
    const { branding } = useBrandingContext();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchTujuanPemda = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${branding?.api_perencanaan}/review_pokin/opd/${kode_opd}/${tahun}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                if (data.length == 0) {
                    setDataNull(true);
                    setReviewOpd([]);
                } else if (result.code == 500) {
                    setReviewOpd([]);
                } else {
                    setDataNull(false);
                    setReviewOpd(data);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
            fetchTujuanPemda();
    }, [tahun, kode_opd, token, branding]);

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Reload Halaman, Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else if (tahun == undefined) {
        return <TahunNull />
    } else if (kode_opd == undefined) {
        return <OpdTahunNull />
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Pohon</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Indikator</th>
                            <th className="border-r border-b px-6 py-3 min-w-[120px] text-center">Target</th>
                            <th className="border-r border-b px-6 py-3 min-w-[120px] text-center">Satuan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[400px]">Review</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Keterangan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">User Pembuat</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Waktu Review</th>
                        </tr>
                        <tr className="bg-emerald-700 text-white">
                            <th className="border-r border-b px-2 py-1 text-center">1</th>
                            <th className="border-r border-b px-2 py-1 text-center">2</th>
                            <th className="border-r border-b px-2 py-1 text-center">3</th>
                            <th className="border-r border-b px-2 py-1 text-center">4</th>
                            <th className="border-r border-b px-2 py-1 text-center">5</th>
                            <th className="border-r border-b px-2 py-1 text-center">6</th>
                            <th className="border-r border-b px-2 py-1 text-center">7</th>
                            <th className="border-r border-b px-2 py-1 text-center">8</th>
                            <th className="border-r border-b px-2 py-1 text-center">9</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataNull ?
                            <tr>
                                <td className="px-6 py-3" colSpan={30}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                            :
                            ReviewOpd.map((data: Review, index: number) => {
                                const indikatorList = data.indikator?.length
                                    ? data.indikator
                                    : [{
                                        id_indikator: `kosong-${data.id_pohon}`,
                                        id_pokin: String(data.id_pohon),
                                        nama_indikator: "-",
                                        targets: [],
                                    }];

                                return indikatorList.map((indikator, indikatorIndex) => (
                                    <tr key={`${data.id_pohon}-${index}-${indikator.id_indikator}`}>
                                        {/* Kolom utama hanya ditampilkan pada baris indikator pertama */}
                                        {indikatorIndex === 0 && (
                                            <>
                                                <td
                                                    rowSpan={indikatorList.length}
                                                    className="border border-emerald-500 px-6 py-4 text-center align-middle"
                                                >
                                                    {index + 1}
                                                </td>

                                                <td
                                                    rowSpan={indikatorList.length}
                                                    className="border border-emerald-500 px-6 py-4 align-middle"
                                                >
                                                    <p>{data.nama_pohon || "-"}</p>
                                                    <p className="uppercase text-emerald-500 text-xs">
                                                        {data.jenis_pohon}
                                                    </p>
                                                </td>
                                            </>
                                        )}

                                        {/* Indikator */}
                                        <td className="border border-emerald-500 px-6 py-4 align-middle">
                                            {indikator.nama_indikator || "-"}
                                        </td>

                                        {/* Target */}
                                        <td className="border border-emerald-500 px-6 py-4 text-center align-middle">
                                            {indikator.targets?.length
                                                ? indikator.targets.map((target) => (
                                                    <p key={target.id_target}>
                                                        {target.target || "-"}
                                                    </p>
                                                ))
                                                : "-"}
                                        </td>

                                        {/* Satuan */}
                                        <td className="border border-emerald-500 px-6 py-4 text-center align-middle">
                                            {indikator.targets?.length
                                                ? indikator.targets.map((target) => (
                                                    <p key={target.id_target}>
                                                        {target.satuan || "-"}
                                                    </p>
                                                ))
                                                : "-"}
                                        </td>

                                        {/* Kolom review hanya ditampilkan sekali per data review */}
                                        {indikatorIndex === 0 && (
                                            <>
                                                <td
                                                    rowSpan={indikatorList.length}
                                                    className="border border-emerald-500 px-6 py-4 align-middle"
                                                >
                                                    {data.review || "-"}
                                                </td>

                                                <td
                                                    rowSpan={indikatorList.length}
                                                    className="border border-emerald-500 px-6 py-4 align-middle"
                                                >
                                                    {data.keterangan || "-"}
                                                </td>

                                                <td
                                                    rowSpan={indikatorList.length}
                                                    className="border border-emerald-500 px-6 py-4 align-middle"
                                                >
                                                    {data.created_by || "-"}
                                                </td>

                                                <td
                                                    rowSpan={indikatorList.length}
                                                    className="border border-emerald-500 px-6 py-4 align-middle"
                                                >
                                                    {data.created_at === data.updated_at ? (
                                                        <>
                                                            <p className="font-semibold">dibuat pada:</p>
                                                            <p>
                                                                {new Date(data.created_at).toLocaleString(
                                                                    "id-ID",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    }
                                                                )}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="font-semibold">diedit pada:</p>
                                                            <p>
                                                                {new Date(data.updated_at).toLocaleString(
                                                                    "id-ID",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    }
                                                                )}
                                                            </p>
                                                        </>
                                                    )}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ));
                            })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
