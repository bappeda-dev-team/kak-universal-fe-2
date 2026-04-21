'use client'

import { ButtonRed, ButtonGreen, ButtonSky } from "@/components/global/Button";
import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken, getUser } from "@/components/lib/Cookie";
import { TbPencil, TbArrowBadgeDownFilled, TbTrash, TbCirclePlus } from "react-icons/tb";


interface Target {
    id: string;
    target: string;
    satuan: string;
    tahun: string;
}

interface Indikator {
    id: string;
    indikator: string;
    rumus_perhitungan: string;
    definisi_operational: string;
    sumber_data: string;
    target: Target[];
}

interface SasaranPemda {
    id_sasaran_pemda: number;
    sasaran_pemda: string;
    indikator: Indikator[];
}

interface SubTematik {
    subtematik_id: number;
    nama_subtematik: string;
    jenis_pohon: string;
    level_pohon: number;
    is_active: boolean;
    tahun: string;
    sasaran_pemda: SasaranPemda[];
}

interface Sasaran {
    tematik_id: number;
    nama_tematik: string;
    tahun: string;
    subtematik: SubTematik[];
}

interface table {
    tahun: number;
    menu: "ranwal" | "rankhir" | "penetapan";
}

const TableSasaran: React.FC<table> = ({ tahun, menu }) => {

    const [Data, setData] = useState<Sasaran[]>([]);

    const [User, setUser] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [Tahun, setTahun] = useState<any>(null);
    const token = getToken();

    const [PeriodeNotFound, setPeriodeNotFound] = useState<boolean | null>(null);
    const [Error, setError] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [DataNull, setDataNull] = useState<boolean>(false);

    const [isOpenNewSasaran, setIsOpenNewSasaran] = useState<boolean>(false);
    const [isOpenEditSasaran, setIsOpenEditSasaran] = useState<boolean>(false);
    const [IdSasaran, setIdSasaran] = useState<number>(0);
    const [IdSubTema, setIdSubTema] = useState<number>(0);
    const [NamaPohon, setNamaPohon] = useState<string>('');
    const [JenisPohon, setJenisPohon] = useState<string>('');

    const [Show, setShow] = useState<{ [key: string]: boolean }>({});

    // useEffect(() => {
    //     const API_URL = process.env.NEXT_PUBLIC_API_URL;
    //     const fetchSasaran = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await fetch(`${API_URL}/sasaran_pemda/findall/tahun_awal/${tahun_awal}/tahun_akhir/${tahun_akhir}/jenis_periode/${jenis}`, {
    //                 headers: {
    //                     Authorization: `${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const result = await response.json();
    //             const data = result.data;
    //             if (data == null) {
    //                 setDataNull(true);
    //                 setData([]);
    //             } else if (result.code == 200 || result.code == 201) {
    //                 setDataNull(false);
    //                 setData(data);
    //                 setError(false);
    //             } else {
    //                 setDataNull(false);
    //                 setData([]);
    //                 setError(true);
    //                 console.log(data);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     if (User?.roles !== undefined && Tahun?.value != undefined) {
    //         fetchSasaran();
    //     }
    // }, [token, User, Tahun, SelectedOpd, FetchTrigger, tahun, menu]);

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
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Error, Periksa koneksi internet atau database server, jika error berlanjut silakan hubungi tim developer</h1>
            </div>
        )
    }

    return (
        <>
            {Data.length === 0 ?
                <div className="px-6 py-3 border w-full rounded-xl">
                    Data Kosong / Belum Ditambahkan
                </div>
                :
                Data.map((data: Sasaran) => {
                    const isShown = Show[data.tematik_id] || false;
                    const isActiveTematik = data?.subtematik[0]?.is_active;
                    return (
                        <div className="flex flex-col m-2" key={data.tematik_id}>
                            <div
                                className={`flex justify-between border items-center p-5 rounded-xl text-emerald-500 cursor-pointer border-emerald-500 hover:bg-emerald-500 hover:text-white ${isShown ? "bg-emerald-500 text-white" : ""}`}
                                onClick={() => handleShow(data.tematik_id)}
                            >
                                {isActiveTematik ?
                                    <h1 className="font-semibold">Tematik - {data.nama_tematik} ({data.tahun})</h1>
                                    :
                                    <h1 className="font-semibold text-red-400">Tematik - {data.nama_tematik} ({data.tahun}) - NON AKTIF</h1>
                                }
                                <div className="flex items-center">
                                    <TbArrowBadgeDownFilled className={`transition-all duration-200 ease-in-out text-3xl ${isShown ? "" : "-rotate-90"}`} />
                                </div>
                            </div>
                            <div className={`transition-all duration-300 ease-in-out border-x border-b border-emerald-500 ${isShown ? "opacity-100 mx-4 p-5" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                <div className="overflow-auto rounded-t-xl border">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-xm bg-emerald-500 text-white">
                                                <td rowSpan={2} className="border-r border-b px-6 py-3 max-w-[100px] text-center">No</td>
                                                <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Strategic Pemda</td>
                                                <td rowSpan={2} colSpan={2} className="border-r border-b px-6 py-3 min-w-[400px] text-center">Sasaran Pemda</td>
                                                <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</td>
                                                <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Definisi operational</td>
                                                <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Rumus Perhitungan</td>
                                                <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Sumber Data</td>
                                                <th colSpan={2} className="border-l border-b px-6 py-3 min-w-[100px]">{tahun}</th>
                                            </tr>
                                            <tr className="bg-emerald-500 text-white">
                                                <th className="border-l border-b px-6 py-3 min-w-[50px]">Target</th>
                                                <th className="border-l border-b px-6 py-3 min-w-[50px]">Satuan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.subtematik.length == 0 ?
                                                <tr>
                                                    <td className="px-6 py-3" colSpan={30}>
                                                        Data Kosong / Belum Ditambahkan
                                                    </td>
                                                </tr>
                                                :
                                                data.subtematik.map((item: SubTematik, index: number) => {
                                                    // Cek apakah item.tujuan_pemda ada
                                                    const hasSasaran = item.sasaran_pemda.length != 0;
                                                    // const hasSasaranPemda = item.sasaranpemda != "";
                                                    const [sasaranLength, indikatorLength] = hasSasaran
                                                        ? [
                                                            item.sasaran_pemda.length + 1,
                                                            item.sasaran_pemda.reduce((total, sasaran) => total + (sasaran.indikator.length === 0 ? 1 : sasaran.indikator.length), 0),
                                                        ]
                                                        : [1, 1];
                                                    return (
                                                        <React.Fragment key={item.subtematik_id}>
                                                            {/* NO & POHON */}
                                                            <tr>
                                                                <td className="border border-emerald-500 px-4 py-4 text-center" rowSpan={sasaranLength + (indikatorLength === 0 ? 1 : indikatorLength)}>
                                                                    {index + 1}
                                                                </td>
                                                                <td className="border border-emerald-500 px-6 py-4" rowSpan={sasaranLength + (indikatorLength === 0 ? 1 : indikatorLength)}>
                                                                    <p>{item.nama_subtematik} ({item.tahun})</p>
                                                                    <div className="flex flex-col justify-between gap-2 h-full">
                                                                        <p className="uppercase text-emerald-500 text-xs">{item.jenis_pohon}</p>
                                                                        {item.is_active === false ?
                                                                            <button
                                                                                className="flex justify-between gap-1 rounded-full p-1 bg-red-500 text-white cursor-not-allowed"
                                                                                // onClick={() => handleModalNewSasaran(item.subtematik_id, item.nama_subtematik, item.jenis_pohon)}
                                                                                disabled
                                                                            >
                                                                                <div className="flex gap-1">
                                                                                    <TbCirclePlus />
                                                                                    <p className="text-xs">Tematik NON-AKTIF</p>
                                                                                </div>
                                                                                <TbArrowBadgeDownFilled className="-rotate-90" />
                                                                            </button>
                                                                            :
                                                                            <button
                                                                                className="flex justify-between gap-1 rounded-full p-1 bg-sky-500 text-white border border-sky-500 hover:bg-white hover:text-sky-500 hover:border hover:border-sky-500"
                                                                                // onClick={() => handleModalNewSasaran(item.subtematik_id, item.nama_subtematik, item.jenis_pohon)}
                                                                            >
                                                                                <div className="flex gap-1">
                                                                                    <TbCirclePlus />
                                                                                    <p className="text-xs">Tambah Sasaran Baru</p>
                                                                                </div>
                                                                                <TbArrowBadgeDownFilled className="-rotate-90" />
                                                                            </button>
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {/* SASARAN */}
                                                            {hasSasaran ?
                                                                item.sasaran_pemda.map((s: SasaranPemda) => (
                                                                    <React.Fragment key={s.id_sasaran_pemda}>
                                                                        <tr>
                                                                            <td className="border-b border-emerald-500 px-6 py-4 h-[150px]" rowSpan={s.indikator.length === 0 ? 2 : s.indikator.length + 1}>
                                                                                {s.sasaran_pemda || "-"}
                                                                            </td>
                                                                            <td className="border-b border-r border-emerald-500 px-6 py-4" rowSpan={s.indikator.length === 0 ? 2 : s.indikator.length + 1}>
                                                                                <div className="flex flex-col justify-center items-center gap-1">
                                                                                    <>
                                                                                        <ButtonGreen
                                                                                            className="flex items-center gap-1 w-full"
                                                                                            // onClick={() => handleModalEditSasaran(s.id_sasaran_pemda, item.subtematik_id, item.nama_subtematik, item.jenis_pohon)}
                                                                                        >
                                                                                            <TbPencil />
                                                                                            Edit
                                                                                        </ButtonGreen>
                                                                                        <ButtonRed
                                                                                            className="flex items-center gap-1 w-full"
                                                                                            onClick={() => {
                                                                                                AlertQuestion("Hapus?", "Hapus Tujuan Pemda yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                                                                    if (result.isConfirmed) {
                                                                                                        // hapusSasaranPemda(s.id_sasaran_pemda);
                                                                                                    }
                                                                                                });
                                                                                            }}
                                                                                        >
                                                                                            <TbTrash />
                                                                                            Delete
                                                                                        </ButtonRed>
                                                                                    </>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        {/* INDIKATOR */}
                                                                        {s.indikator.length == 0 ?
                                                                            <td className="border-r border-b border-emerald-500 px-6 py-4 bg-yellow-500 text-white" colSpan={30}>
                                                                                Indikator Kosong / Belum di Inputkan
                                                                            </td>
                                                                            :
                                                                            s.indikator.map((i: Indikator) => (
                                                                                <tr key={i.id}>
                                                                                    <td className="border-b border-r border-emerald-500 px-6 py-4">{i.indikator || "-"}</td>
                                                                                    <td className="border-b border-r border-emerald-500 px-6 py-4">{i.definisi_operational || "-"}</td>
                                                                                    <td className="border-b border-r border-emerald-500 px-6 py-4">{i.rumus_perhitungan || "-"}</td>
                                                                                    <td className="border-b border-r border-emerald-500 px-6 py-4">{i.sumber_data || "-"}</td>
                                                                                    {i.target.map((t: Target) => (
                                                                                        <React.Fragment key={t.id}>
                                                                                            <td className="border-b border-r border-emerald-500 px-6 py-4 text-center">{t.target || "-"}</td>
                                                                                            <td className="border-b border-r border-emerald-500 px-6 py-4 text-center">{t.satuan || "-"}</td>
                                                                                        </React.Fragment>
                                                                                    ))}
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </React.Fragment>
                                                                ))
                                                                :
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4 bg-red-400 text-white" colSpan={30}>
                                                                    Sasaran Pemda belum di buat
                                                                </td>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}

export default TableSasaran;
