'use client'

import React, { useEffect, useState } from "react"
import { ButtonSkyBorder, ButtonRedBorder } from "@/components/global/Button"
import { TbCirclePlus, TbPencil, TbTrash } from "react-icons/tb"
import { useBrandingContext } from "@/context/BrandingContext"
// import { ModalMasterRb } from "./ModalMasterRb"
import { AlertQuestion, AlertNotification } from "@/components/global/Alert"
import { getToken } from "@/components/lib/Cookie"
import { LoadingClip } from "@/components/global/Loading"
// import { RB, IndikatorRB, TargetRB } from "../type"

interface RencanaAksi {
    rencana_aksi: string;
    indikator_rencana_aksis: IndikatorRenaksi[];
    anggaran: string;
    realisasi_anggaran: string;
    capaian_anggaran: string;
    opd_koordinator: string;
    nip_pelaksana: string;
    nama_pelaksana: string;
    opd_crosscuttings: [];
}

interface TargetRB {
    id: string;
    id_indikator: string;
    tahun_baseline: number;
    target_baseline: string;
    realisasi_baseline: string;
    satuan_baseline: string;
    tahun_next: number;
    target_next: string;
    satuan_next: string;
}
interface TargetRenaksi {
    target: string;
    realisasi: string
    satuan: string;
    capaian: string
    tahun: string
}

interface IndikatorRB {
    id: string;
    id_rb: number;
    indikator: string;
    target: TargetRB[];
}
interface IndikatorRenaksi {
    indikator: string;
    targets: TargetRenaksi[];
}

interface RencanaReformasiBirokrasi {
    id: number;
    jenis_rb: string;
    kegiatan_utama: string;
    keterangan: string;
    tahun_baseline: number;
    tahun_next: number;
    indikator: IndikatorRB[];
    rencana_aksis: RencanaAksi[];
}

export const Table = () => {

    const [Data, setData] = useState<RencanaReformasiBirokrasi[]>([]);

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [JenisModal, setJenisModal] = useState<"tambah" | "edit">("tambah");
    // const [DataModal, setDataModal] = useState<RB | null>(null);

    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const { branding } = useBrandingContext();
    const tahunBaseline = Number(branding?.tahun?.value) - 1;
    const token = getToken();

    useEffect(() => {
        const fetchOpd = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`${branding?.api_perencanaan}/datamaster/rb/laporanByTahun/${branding?.tahun?.value}/TEMATIK`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (result.code === 200) {
                    setData(result.data);
                    // console.log(result.data);
                } else if (result.code === 401) {
                    window.location.href = "/login";
                } else {
                    setData([]);
                    setError(true);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        fetchOpd();
    }, [token, branding, FetchTrigger]);

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Error, Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else {
        return (
            <>
                <div className="overflow-auto m-2 bg-white rounded-t-xl border w-full">
                    <table className="w-full bg-white">
                        <thead>
                            <tr className="bg-yellow-600 text-white">
                                <th rowSpan={2} className="border-r border-b px-6 py-3 text-center">No</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[150px]">Jenis RB</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Kegiatan Utama</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Indikator</th>
                                <th colSpan={4} className="border-r border-b px-6 py-3 w-[400px]">BaseLine {tahunBaseline}</th>
                                <th colSpan={2} className="border-r border-b px-6 py-3 w-[200px]">{branding?.tahun?.value}</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Keterangan</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[900px]">Rencana Aksi</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Indikator Output</th>
                                <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Periode Pelaksanaan</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Satuan Output</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 w-[200px]">Capaian (%)</th>
                                <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Biaya</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">OPD Koordinator</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Pelaksana</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">OPD Crosscutting</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Pelaksana Cross</th>
                                <th rowSpan={2} className="border-l border-b px-6 py-3 min-w-[200px]">Keterangan</th>
                            </tr>
                            <tr className="bg-yellow-600 text-white">
                                <th className="border-r border-b px-6 py-1 w-[100px]">Target</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Realisasi</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Satuan</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Capaian</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Target</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Satuan</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Target</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Realisasi</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Anggaran</th>
                                <th className="border-r border-b px-6 py-1 w-[100px]">Realisasi</th>
                            </tr>
                            <tr className="bg-yellow-600 text-white">
                                {Array.from({ length: 24 }, (_, index) => (
                                    <th key={index} className="border-r border-b px-2 py-1 text-center">{index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {Data && Data.length > 0 ? (
                                Data.map((item: RencanaReformasiBirokrasi, index: number) => {
                                    const indikator = item.indikator ?? [];
                                    const renaksi = item.rencana_aksis ?? [];
                                    const indikatorCount = Math.max(1, indikator.length);

                                    return (
                                        <React.Fragment key={item.id ?? index}>
                                            {/* ====================== BARIS PERTAMA (INDIKATOR 1) ====================== */}
                                            <tr>
                                                {/* RB Info */}
                                                <td rowSpan={indikatorCount} className="border px-6 py-4 text-center">{index + 1}</td>
                                                <td rowSpan={indikatorCount} className="border px-6 py-4 text-center">{item.jenis_rb}</td>
                                                <td rowSpan={indikatorCount} className="border px-6 py-4 text-center">{item.kegiatan_utama}</td>

                                                {/* Indikator pertama */}
                                                {(() => {
                                                    const ind = indikator[0];
                                                    const base = ind?.target?.find(t => t.tahun_baseline !== 0);
                                                    const next = ind?.target?.find(t => t.tahun_next !== 0);

                                                    return (
                                                        <>
                                                            <td className="border px-6 py-4">{ind?.indikator ?? "-"}</td>
                                                            <td className="border px-6 py-4 text-center">{base?.target_baseline ?? "-"}</td>
                                                            <td className="border px-6 py-4 text-center">{base?.realisasi_baseline ?? "-"}</td>
                                                            <td className="border px-6 py-4 text-center">{base?.satuan_baseline ?? "-"}</td>
                                                            <td className="border px-6 py-4 text-center">{base ? "0" : "-"}</td>
                                                            <td className="border px-6 py-4 text-center">{next?.target_next ?? "-"}</td>
                                                            <td className="border px-6 py-4 text-center">{next?.satuan_next ?? "-"}</td>
                                                        </>
                                                    );
                                                })()}
                                                <td rowSpan={indikatorCount} className="border px-6 py-4 text-center">{item.keterangan}</td>

                                                {/* 🟩 Rencana Aksi + Output + Target + dst. */}
                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-left">
                                                    {renaksi.length > 0 ? renaksi[0].rencana_aksi : "-"}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-left">
                                                    {renaksi[0]?.indikator_rencana_aksis?.map((i: IndikatorRenaksi, idx) => (
                                                        <div key={idx}>{i.indikator}</div>
                                                    )) ?? "-"}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                    {renaksi[0]?.indikator_rencana_aksis?.[0]?.targets?.[0]?.target ?? "-"}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                    {renaksi[0]?.indikator_rencana_aksis?.[0]?.targets?.[0]?.realisasi ?? "-"}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                    {renaksi[0]?.indikator_rencana_aksis?.[0]?.targets?.[0]?.satuan ?? "-"}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                    {renaksi[0]?.indikator_rencana_aksis?.[0]?.targets?.[0]?.capaian ?? "-"}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">{renaksi[0]?.anggaran ?? "-"}</td>
                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">{renaksi[0]?.realisasi_anggaran ?? "-"}</td>
                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">{renaksi[0]?.opd_koordinator ?? "-"}</td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-left">
                                                    {renaksi[0]?.nama_pelaksana ?? "-"}<br />
                                                    {renaksi[0]?.nip_pelaksana ?? ""}
                                                </td>

                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">-</td>
                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">-</td>
                                                <td rowSpan={indikatorCount} className="border border-white bg-yellow-100 px-6 py-4 text-center">-</td>
                                            </tr>

                                            {/* ====================== SISA INDIKATOR ====================== */}
                                            {indikator.slice(1).map((ind, indIndex) => {
                                                const base = ind.target?.find(t => t.tahun_baseline !== 0);
                                                const next = ind.target?.find(t => t.tahun_next !== 0);

                                                return (
                                                    <tr key={ind.id ?? indIndex}>
                                                        <td className="border border-white px-6 py-4 text-left">{ind.indikator}</td>

                                                        {/* Baseline */}
                                                        <td className="border border-white px-6 py-4 text-center">{base?.target_baseline ?? "-"}</td>
                                                        <td className="border border-white px-6 py-4 text-center">{base?.realisasi_baseline ?? "-"}</td>
                                                        <td className="border border-white px-6 py-4 text-center">{base?.satuan_baseline ?? "-"}</td>
                                                        <td className="border border-white px-6 py-4 text-center">{base ? "0" : "-"}</td>

                                                        {/* Next */}
                                                        <td className="border border-white px-6 py-4 text-center">{next?.target_next ?? "-"}</td>
                                                        <td className="border border-white px-6 py-4 text-center">{next?.satuan_next ?? "-"}</td>
                                                    </tr>
                                                );
                                            })}

                                            {/* ====================== BARIS RENAKSI (SETELAH INDIKATOR) ====================== */}
                                            {/* ====================== RENAKSI 2, 3, 4, ... ====================== */}
                                            {renaksi.slice(1).map((ra: RencanaAksi, raIndex: number) => (
                                                <tr key={`ra-${raIndex}`}>
                                                    {/* Kosongkan kolom indikator 1–11 */}
                                                    <td colSpan={11} className="px-6 py-4">-</td>

                                                    {/* Kolom Renaksi */}
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-left">{ra.rencana_aksi}</td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-left">
                                                        {ra.indikator_rencana_aksis?.map((i: IndikatorRenaksi, idx) => (
                                                            <div key={idx}>{i.indikator}</div>
                                                        ))}
                                                    </td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                        {ra.indikator_rencana_aksis?.[0]?.targets?.[0]?.target ?? "-"}
                                                    </td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                        {ra.indikator_rencana_aksis?.[0]?.targets?.[0]?.realisasi ?? "-"}
                                                    </td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                        {ra.indikator_rencana_aksis?.[0]?.targets?.[0]?.satuan ?? "-"}
                                                    </td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">
                                                        {ra.indikator_rencana_aksis?.[0]?.targets?.[0]?.capaian ?? "-"}
                                                    </td>

                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">{ra.anggaran}</td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">{ra.realisasi_anggaran}</td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">{ra.opd_koordinator}</td>

                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-left">
                                                        {ra.nama_pelaksana}<br />{ra.nip_pelaksana}
                                                    </td>

                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">-</td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">-</td>
                                                    <td className="border border-white bg-yellow-100 px-6 py-4 text-center">-</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={24} className="text-center p-4">Data Kosong / Belum Ditambahkan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
