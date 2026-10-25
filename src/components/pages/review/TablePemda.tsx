'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { TbArrowBadgeDownFilled } from "react-icons/tb";
import { TbAlertCircle, TbCheck } from "react-icons/tb";

interface data {
    id_tematik: number;
    nama_pohon: string;
    level_pohon: string;
    review: review[];
}

interface review {
    id_pohon: number;
    parent: number;
    nama_pohon: string;
    level_pohon: number;
    jenis_pohon: string;
    review: string;
    catatan: string;
    substansi: string;
    keterangan: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

interface table {
    tahun: string;
}

const TablePemda: React.FC<table> = ({ tahun }) => {

    const [Data, setData] = useState<data[]>([]);

    const token = getToken();

    const [IsError, setIsError] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean>(false);

    const [Show, setShow] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchSasaran = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/review_pokin/tematik/${tahun}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                // console.log(data);
                if (data == null) {
                    setDataNull(true);
                    setData([]);
                } else {
                    setDataNull(false);
                    setData(data);
                }
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        if (tahun != undefined) {
            fetchSasaran();
        }
    }, [token, tahun]);

    const handleShow = (id: number) => {
        setShow((prev) => ({
            [id]: !prev[id],
        }));
    }

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (IsError) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else if (tahun == undefined) {
        return <TahunNull />
    }

    return (
        <>
            {DataNull ?
                <div className="px-6 py-3 border w-full rounded-xl">
                    Data Kosong / Belum Ditambahkan
                </div>
                :
                Data.map((data: data) => {
                    const isShown = Show[data.id_tematik] || false;

                    return (
                        <div className="flex flex-col m-2" key={data.id_tematik}>
                            <div
                                className={`flex justify-between border items-center p-5 rounded-xl text-emerald-500 cursor-pointer border-emerald-500 hover:bg-emerald-500 hover:text-white ${isShown ? "bg-emerald-500 text-white" : ""}`}
                                onClick={() => handleShow(data.id_tematik)}
                            >
                                <h1 className="font-semibold">Tematik - {data.nama_pohon}</h1>
                                <div className="flex items-center">
                                    <TbArrowBadgeDownFilled className={`transition-all duration-200 ease-in-out text-3xl ${isShown ? "" : "-rotate-90"}`} />
                                </div>
                            </div>
                            <div className={`transition-all duration-300 ease-in-out border-x border-b border-emerald-500 ${isShown ? "opacity-100 mx-4 p-5" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                <div className="overflow-auto m-2 rounded-t-xl border">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-emerald-500 text-white">
                                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px] text-center">Nama Pohon</th>
                                                <th colSpan={3} className="border-r border-b px-6 py-3 min-w-[750px] text-center">Review</th>
                                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[350px] text-center">Keterangan Lainnya</th>
                                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px] text-center">User Pembuat</th>
                                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px] text-center">Waktu Review</th>
                                            </tr>
                                            <tr className="bg-emerald-700 text-white">
                                                <th className="border-r border-b px-6 py-3 min-w-[250px] text-center">Kelengkapan</th>
                                                <th className="border-r border-b px-6 py-3 min-w-[250px] text-center">Kesesuaian Level</th>
                                                <th className="border-r border-b px-6 py-3 min-w-[350px] text-center">Substansi</th>
                                            </tr>
                                            <tr className="bg-emerald-900 text-white">
                                                {[...Array(8)].map((_, index) => (
                                                    <td key={index} className="border-x border-b font-semibold py-1 text-center italic">{index + 1}</td>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!data.review ?
                                                <tr>
                                                    <td className="px-6 py-3" colSpan={30}>
                                                        Data Kosong / Belum Ditambahkan
                                                    </td>
                                                </tr>
                                                :
                                                data.review.map((data: review, index: number) => {
                                                    const badgeReview = (name: string) => {
                                                        if (name === "Sesuai" || name === "Lengkap") {
                                                            return "border border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        } else {
                                                            return "border border-red-200 bg-red-50 text-red-700";
                                                        }
                                                    }
                                                    const Lengkap = data.review === "Lengkap";
                                                    const Sesuai = data.catatan === "Sesuai";

                                                    return (
                                                        <tr key={index}>
                                                            <td className="border border-emerald-500 px-6 py-4 text-center align-middle">
                                                                {index + 1}
                                                            </td>

                                                            <td className="border border-emerald-500 px-6 py-4 align-middle">
                                                                <p>{data.nama_pohon || "-"}</p>
                                                                <p className="uppercase text-emerald-500 text-xs">
                                                                    {data.jenis_pohon}
                                                                </p>
                                                            </td>
                                                            <td className="border border-emerald-500 px-6 py-4 align-middle">
                                                                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeReview(data.review)}`}>
                                                                    {Lengkap ? <TbCheck /> : <TbAlertCircle />}
                                                                    {data.review || "Kelengkapan Kosong"}
                                                                </span>
                                                            </td>
                                                            <td className="border border-emerald-500 px-6 py-4 align-middle">
                                                                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeReview(data.catatan)}`}>
                                                                    {Sesuai ? <TbCheck /> : <TbAlertCircle />}
                                                                    {data.catatan || "Kesesuaian Kosong"}
                                                                </span>
                                                            </td>
                                                            <td className="border border-emerald-500 px-6 py-4 align-middle break-all">
                                                                {data.substansi || "-"}
                                                            </td>

                                                            <td className="border border-emerald-500 px-6 py-4 align-middle break-all">
                                                                {data.keterangan || "-"}
                                                            </td>

                                                            <td className="border border-emerald-500 px-6 py-4 align-middle">
                                                                {data.created_by || "-"}
                                                            </td>

                                                            <td className="border border-emerald-500 px-6 py-4 align-middle">
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
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div >
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}

export default TablePemda;
