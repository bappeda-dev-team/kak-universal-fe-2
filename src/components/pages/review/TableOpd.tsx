'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { TahunNull, OpdTahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import { TbCheck, TbAlertCircle } from "react-icons/tb";

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

type ReviewItem = {
    review: string;
    catatan: string;
    substansi: string;
    keterangan: string;
    created_by: string;
    created_at: string;
    updated_at: string;
};

type Review = {
    id_pohon: number;
    parent: number;
    nama_pohon: string;
    level_pohon: number;
    jenis_pohon: string;
    indikator: Indikator[];
    review: ReviewItem[];
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
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Nama Pohon</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Indikator</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[120px] text-center">Target</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[120px] text-center">Satuan</th>
                            <th colSpan={3} className="border-r border-b px-6 py-3 min-w-[400px]">Review</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Keterangan Lainnya</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">User Pembuat</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Waktu Review</th>
                        </tr>
                        <tr className="bg-emerald-700 text-white">
                            <th className="border-r border-b px-6 py-3 min-w-[250px]">Kelengkapan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[250px]">Kesesuaian Level</th>
                            <th className="border-r border-b px-6 py-3 min-w-[250px]">Substansi</th>
                        </tr>
                        <tr className="bg-emerald-900 text-white">
                            {[...Array(11)].map((_, index) => (
                                <td key={index} className="border-x border-b font-semibold py-1 text-center">{index + 1}</td>
                            ))}
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
                            ReviewOpd.map((data: Review, index: number) => {
                                const indikatorList = data.indikator?.length
                                    ? data.indikator
                                    : [
                                        {
                                            id_indikator: `kosong-${data.id_pohon}`,
                                            id_pokin: String(data.id_pohon),
                                            nama_indikator: "-",
                                            targets: [],
                                        },
                                    ];

                                // Sesuaikan dengan struktur DTO review kamu.
                                const reviewList: ReviewItem[] = data.review ?? [];

                                const jumlahBaris = Math.max(
                                    indikatorList.length,
                                    reviewList.length,
                                    1
                                );

                                const badgeReview = (name: string) => {
                                    if (name === "Sesuai" || name === "Lengkap") {
                                        return "border border-emerald-200 bg-emerald-50 text-emerald-700";
                                    }

                                    return "border border-red-200 bg-red-50 text-red-700";
                                };

                                const formatTanggal = (tanggal: string) =>
                                    tanggal
                                        ? new Date(tanggal).toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "-";

                                return Array.from({ length: jumlahBaris }, (_, rowIndex) => {
                                    const indikator = indikatorList[rowIndex];
                                    const review = reviewList[rowIndex];

                                    // Hanya baris terakhir grup yang lebih pendek
                                    // memanjang hingga akhir seluruh baris.
                                    const indikatorRowSpan =
                                        indikator && rowIndex === indikatorList.length - 1
                                            ? jumlahBaris - rowIndex
                                            : 1;

                                    const reviewRowSpan =
                                        review && rowIndex === reviewList.length - 1
                                            ? jumlahBaris - rowIndex
                                            : 1;

                                    const lengkap = review?.review === "Lengkap";
                                    const sesuai = review?.catatan === "Sesuai";

                                    return (
                                        <tr key={`${data.id_pohon}-${rowIndex}`}>
                                            {/* Kolom utama */}
                                            {rowIndex === 0 && (
                                                <>
                                                    <td
                                                        rowSpan={jumlahBaris}
                                                        className="border border-emerald-500 px-6 py-4 text-center align-middle"
                                                    >
                                                        {index + 1}
                                                    </td>

                                                    <td
                                                        rowSpan={jumlahBaris}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        <p>{data.nama_pohon || "-"}</p>
                                                        <p className="uppercase text-emerald-500 text-xs">
                                                            {data.jenis_pohon}
                                                        </p>
                                                    </td>
                                                </>
                                            )}

                                            {/* Kolom indikator: mengikuti jumlah indikator */}
                                            {indikator && (
                                                <>
                                                    <td
                                                        rowSpan={indikatorRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        {indikator.nama_indikator || "-"}
                                                    </td>

                                                    <td
                                                        rowSpan={indikatorRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 text-center align-middle"
                                                    >
                                                        {indikator.targets?.length
                                                            ? indikator.targets.map((target) => (
                                                                <p key={target.id_target}>
                                                                    {target.target || "-"}
                                                                </p>
                                                            ))
                                                            : "-"}
                                                    </td>

                                                    <td
                                                        rowSpan={indikatorRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 text-center align-middle"
                                                    >
                                                        {indikator.targets?.length
                                                            ? indikator.targets.map((target) => (
                                                                <p key={target.id_target}>
                                                                    {target.satuan || "-"}
                                                                </p>
                                                            ))
                                                            : "-"}
                                                    </td>
                                                </>
                                            )}

                                            {/* Kolom review: mengikuti jumlah review */}
                                            {review && (
                                                <>
                                                    <td
                                                        rowSpan={reviewRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        <span
                                                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeReview(review.review || "")}`}
                                                        >
                                                            {lengkap ? (
                                                                <TbCheck />
                                                            ) : (
                                                                <TbAlertCircle />
                                                            )}
                                                            {review.review || "Kelengkapan Kosong"}
                                                        </span>
                                                    </td>

                                                    <td
                                                        rowSpan={reviewRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        <span
                                                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeReview(review.catatan || "")}`}
                                                        >
                                                            {sesuai ? (
                                                                <TbCheck />
                                                            ) : (
                                                                <TbAlertCircle />
                                                            )}
                                                            {review.catatan || "Kesesuaian Kosong"}
                                                        </span>
                                                    </td>

                                                    <td
                                                        rowSpan={reviewRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        {review.substansi || "-"}
                                                    </td>

                                                    <td
                                                        rowSpan={reviewRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        {review.keterangan || "-"}
                                                    </td>

                                                    <td
                                                        rowSpan={reviewRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        {review.created_by || "-"}
                                                    </td>

                                                    <td
                                                        rowSpan={reviewRowSpan}
                                                        className="border border-emerald-500 px-6 py-4 align-middle"
                                                    >
                                                        {review.created_at === review.updated_at ? (
                                                            <>
                                                                <p className="font-semibold">
                                                                    dibuat pada:
                                                                </p>
                                                                <p>
                                                                    {formatTanggal(review.created_at)}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="font-semibold">
                                                                    diedit pada:
                                                                </p>
                                                                <p>
                                                                    {formatTanggal(review.updated_at)}
                                                                </p>
                                                            </>
                                                        )}
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                });
                            })
                        )}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default Table;
