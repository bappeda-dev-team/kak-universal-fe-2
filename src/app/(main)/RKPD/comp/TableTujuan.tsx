'use client'

import { ButtonGreenBorder, ButtonSkyBorder } from "@/components/global/Button";
import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { TbPencil, TbCirclePlus } from "react-icons/tb";
import { useBrandingContext } from "@/context/BrandingContext";
import { TujuanPemdaRKPD, IndikatorTujuan, TargetTujuan } from "../type";
import { ModalTargetRPJMD } from "./ModalTargetRPJMD";

interface table {
    tahun: number;
    menu: "ranwal" | "rankhir" | "penetapan";
    jenis_periode: string;
}

const TableTujuan: React.FC<table> = ({ tahun, menu, jenis_periode }) => {

    const [Tujuan, setTujuan] = useState<TujuanPemdaRKPD[]>([]);

    const [PeriodeNotFound, setPeriodeNotFound] = useState<boolean | null>(null);
    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [TargetAwal, setTargetAwal] = useState<TargetTujuan[]>([]);
    const [TargetEdit, setTargetEdit] = useState<TargetTujuan[]>([]);
    const [Indikator, setIndikator] = useState<IndikatorTujuan | null>(null);
    const [JenisModal, setJenisModal] = useState<"tambah" | "edit">("tambah");

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const token = getToken();

    const handleModal = (indikator: IndikatorTujuan | null, jenis: "tambah" | "edit", target_awal: TargetTujuan[], target_edit: TargetTujuan[]) => {
        if (ModalOpen) {
            setModalOpen(false);
            setIndikator(indikator);
            setJenisModal(jenis);
            setTargetAwal(target_awal);
            setTargetEdit(target_edit);
        } else {
            setModalOpen(true);
            setIndikator(indikator);
            setJenisModal(jenis);
            setTargetAwal(target_awal);
            setTargetEdit(target_edit);
        }
    }

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchTujuanPemda = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/tujuan_pemda/${menu}/${tahun}/${jenis_periode}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                if (data.length == 0) {
                    setDataNull(true);
                    setTujuan([]);
                } else if (result.code == 500) {
                    setPeriodeNotFound(true);
                    setTujuan([]);
                } else if (result.code == 200 || result.code == 201) {
                    setDataNull(false);
                    setTujuan(data);
                    setError(false);
                } else {
                    setDataNull(false);
                    setTujuan([]);
                    setError(true);
                    console.log(data);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        fetchTujuanPemda();

    }, [token, FetchTrigger, tahun, menu, jenis_periode]);

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
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[300px]">Tema</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[300px]">Tujuan Pemda</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[300px]">Visi - Misi</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[300px]">Definisi Operational</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[300px]">Rumus Perhitungan</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[300px]">Sumber Data</th>
                            <th rowSpan={menu === "ranwal" ? 2 : 3} className="border-r border-b px-6 py-3 min-w-[100px]">Aksi</th>
                            <th colSpan={menu === "ranwal" ? 2 : 4} className="border-l border-b px-6 py-3 min-w-[100px]">{tahun || ""}</th>

                        </tr>
                        {menu != "ranwal" &&
                            <tr className="text-white">
                                <th colSpan={2} className={`${menu === "rankhir" ? "bg-red-600" : "bg-yellow-600"} border-l border-b px-6 py-1 min-w-[50px]`}>{menu === "rankhir" ? "Ranwal" : "Rankir"}</th>
                                <th colSpan={2} className={`${menu === "rankhir" ? "bg-yellow-600" : "bg-blue-600"} border-l border-b px-6 py-1 min-w-[50px]`}>{menu === "rankhir" ? "Rankir" : "Penetapan"}</th>
                            </tr>
                        }
                        <tr className="bg-emerald-700 text-white">
                            {menu != "ranwal" &&
                                <>
                                    <th className="border-l border-b px-6 py-1 min-w-[50px]">Target</th>
                                    <th className="border-l border-b px-6 py-1 min-w-[50px]">Satuan</th>
                                </>
                            }
                            <th className="border-l border-b px-6 py-1 min-w-[50px]">Target</th>
                            <th className="border-l border-b px-6 py-1 min-w-[50px]">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Tujuan?.length === 0 ?
                            <tr>
                                <td className="px-6 py-3" colSpan={30}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                            :
                            Tujuan.map((data: any, index: number) => {

                                const rs = data?.indikator.length === 0 ? 2 : data.indikator.length + 2;

                                return (
                                    <React.Fragment key={index}>
                                        {/* Baris Utama */}
                                        <tr>
                                            <td rowSpan={rs} className="border-x border-b border-emerald-500 px-6 py-4 text-center">{index + 1}</td>
                                            <td rowSpan={rs} className="border-r border-b border-emerald-500 px-6 py-4">{data.nama_tematik || "-"}</td>
                                            <td rowSpan={rs} className="border-r border-b border-emerald-500 px-6 py-4">{data.tujuan_pemda || "-"}</td>
                                            <td rowSpan={rs} className="border-r border-b border-emerald-500 px-6 py-4">{data.visi || "visi kosong"} - {data.misi || "misi kosong"}</td>
                                        </tr>
                                        {data.indikator.length === 0 ?
                                            <tr>
                                                <td className="border-r border-b border-emerald-500 px-6 py-4 text-red-400" colSpan={7}>tidak ada indikator</td>
                                            </tr>
                                            :
                                            data.indikator.map((i: IndikatorTujuan, i_index: number) => (
                                                <tr key={i_index}>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">{i.indikator || "-"}</td>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">{i.definisi_operasional || "-"}</td>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">{i.rumus_perhitungan || "-"}</td>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">{i.sumber_data || "-"}</td>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                        <div className="flex flex-col justify-center items-center gap-2">
                                                            <ButtonGreenBorder
                                                                className={`flex items-center gap-1 w-full ${menu === "ranwal" && "cursor-not-allowed"}`}
                                                                onClick={() => {
                                                                    if(menu === "rankhir"){
                                                                        if(i.target_rankhir[0].id === 0){
                                                                            handleModal(i, "tambah", i.target_ranwal, [])
                                                                        } else {
                                                                            handleModal(i, "edit", i.target_ranwal, i.target_rankhir)
                                                                        }
                                                                    } else {
                                                                        if(i.target_penetapan[0].id === 0){
                                                                            handleModal(i, "tambah", i.target_rankhir, [])
                                                                        } else {
                                                                            handleModal(i, "edit", i.target_rankhir, i.target_penetapan)
                                                                        }
                                                                    }
                                                                    
                                                                }}
                                                                disabled={menu === "ranwal"}
                                                            >
                                                                <TbPencil />
                                                                Edit
                                                            </ButtonGreenBorder>
                                                        </div>
                                                    </td>
                                                    {i.target &&
                                                        i.target.map((t: TargetTujuan, t_index: number) => (
                                                            <React.Fragment key={t_index}>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4 text-center">{t.target || "-"}</td>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4">{t.satuan || "-"}</td>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    {i.target_ranwal &&
                                                        i.target_ranwal.map((t: TargetTujuan, t_index: number) => (
                                                            <React.Fragment key={t_index}>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4 text-center">{t.target || "-"}</td>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4">{t.satuan || "-"}</td>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    {i.target_rankhir &&
                                                        i.target_rankhir.map((t: TargetTujuan, t_index: number) => (
                                                            <React.Fragment key={t_index}>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4 text-center">{t.target || "-"}</td>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4">{t.satuan || "-"}</td>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    {i.target_penetapan &&
                                                        i.target_penetapan.map((t: TargetTujuan, t_index: number) => (
                                                            <React.Fragment key={t_index}>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4 text-center">{t.target || "-"}</td>
                                                                <td className="border-r border-b border-emerald-500 px-6 py-4">{t.satuan || "-"}</td>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </React.Fragment>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            {ModalOpen &&
                <ModalTargetRPJMD
                    isOpen={ModalOpen}
                    onClose={() => handleModal(null, "tambah", [], [])}
                    indikator={Indikator}
                    target_awal={TargetAwal}
                    target_edit={TargetEdit}
                    tahun={String(tahun)}
                    fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                    jenis={menu}
                    metode={JenisModal}
                />
            }
        </>
    )
}

export default TableTujuan;
