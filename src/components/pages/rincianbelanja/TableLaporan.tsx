'use client'

import React, { useEffect, useState } from "react";
import { ButtonBlackBorder } from "@/components/global/Button";
import { getToken } from "@/components/lib/Cookie";
import { OpdTahunNull, TahunNull } from "@/components/global/OpdTahunNull";
import { LoadingClip } from "@/components/global/Loading";
import { TbCirclePlus, TbPencil, TbTrash } from "react-icons/tb";
import { ModalPenanggungJawab } from "./ModalPenanggungJawab";
import { IndikatorSubKegiatan, IndikatorRencanaKinerja, RencanaAksi, RincianBelanja, LaporanRincianBelanja, Target, PPTK } from "./type"
import { formatRupiah } from "@/components/utils/format-rupiah";
import { useBrandingContext } from "@/context/BrandingContext";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";

interface TableLaporan {
    tahun: string;
    kode_opd: string;
    nama_opd?: string;
    nip?: string;
    role: string;
}

export const TableLaporan: React.FC<TableLaporan> = ({ tahun, kode_opd, nama_opd, nip, role }) => {

    const [Laporan, setLaporan] = useState<LaporanRincianBelanja[]>([]);

    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [DataNull, setDataNull] = useState<boolean>(false);

    const [ModalPJ, setModalPJ] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<LaporanRincianBelanja | null>(null);
    const [DataEdit, setDataEdit] = useState<PPTK | null>(null);

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const { branding } = useBrandingContext();

    const token = getToken();

    useEffect(() => {
        const fetchLaporan = async (url: string) => {
            try {
                setLoading(true);
                const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                const data = result.data;
                if (result.code === 200 || result.code === 201) {
                    if (data === null) {
                        setLaporan([]);
                        setDataNull(true);
                        setError(false);
                    } else {
                        setLaporan(data);
                        setDataNull(false);
                        setError(false);
                    }
                } else {
                    setDataNull(false);
                    setError(true);
                }
            } catch (err) {
                setDataNull(false);
                setError(true);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (role != undefined) {
            if (role == 'super_admin' || role == 'admin_opd' || role == 'reviewer') {
                fetchLaporan(`rincian_belanja/laporan?kode_opd=${kode_opd}&tahun=${tahun}`)
            } else {
                fetchLaporan(`rincian_belanja/pegawai/${nip}/${tahun}`)
            }
        } else {
            setError(true);
        }
    }, [role, kode_opd, nip, tahun, token, FetchTrigger]);

    const handleModalPJ = (data: LaporanRincianBelanja | null, dataedit?: PPTK) => {
        if (ModalPJ) {
            setModalPJ(false);
            setDataModal(null);
            setDataEdit(null);
        } else {
            setModalPJ(true);
            setDataModal(data);
            setDataEdit(dataedit || null);
        }
    }
    const hapusPJ = async(id: number) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/pptk/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                alert("cant fetch data")
            }
            AlertNotification("Berhasil", "Data PPTK Berhasil Dihapus", "success", 1000);
            setFetchTrigger((prev) => !prev);
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    }

    if (Loading) {
        return (
            <div className="w-full border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="w-full border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else if (tahun == undefined) {
        return <TahunNull />
    } else if (role == 'super_admin' || role == 'reviewer') {
        if (kode_opd == undefined) {
            return (
                <>
                    <div className="w-full flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                        <OpdTahunNull />
                    </div>
                </>
            )
        }
    }

    return (
        <div className="overflow-auto m-3 rounded-t-xl border w-full">
            <table className="w-full">
                <thead className="bg-green-500 text-white">
                    <tr>
                        <th className="border-r border-b px-6 py-3 min-w-[50px]">No</th>
                        <th className="border-r border-b px-6 py-3 min-w-[200px]">Pemilik</th>
                        <th className="border-r border-b px-6 py-3 min-w-[300px]">Rencana Kinerja</th>
                        <th className="border-r border-b px-6 py-3 min-w-[300px]">Indikator Kinerja</th>
                        <th className="border-r border-b px-6 py-3 min-w-[100px]">Target/Satuan</th>
                        <th className="border-r border-b px-6 py-3 min-w-[170px]">Anggaran</th>
                        <th className="border-r border-b px-6 py-3 min-w-[300px]">Pelaksana & Atasan</th>
                    </tr>
                </thead>
                {DataNull ?
                    <tbody>
                        <tr>
                            <td className="px-6 py-3" colSpan={30}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                    </tbody>
                    :
                    Laporan.map((data: LaporanRincianBelanja, index: number) => (
                        <tbody key={index}>
                            <tr className="bg-emerald-100 text">
                                <td className="border-r border-b px-6 py-4">{index + 1}</td>
                                <td colSpan={2} className="border-r border-b px-6 py-4">Sub Kegiatan: {data.nama_subkegiatan || "-"} ({data.kode_subkegiatan || "tanpa kode"})</td>
                                {data.indikator_subkegiatan === null ?
                                    <React.Fragment>
                                        <td className="border-r border-b px-6 py-4 text-center">-</td>
                                        <td className="border-r border-b px-6 py-4 text-center">-</td>
                                    </React.Fragment>
                                    :
                                    data.indikator_subkegiatan.map((i: IndikatorSubKegiatan, index_isk: number) => (
                                        <React.Fragment key={index_isk}>
                                            <td className="border-r border-b px-6 py-4">{i.nama_indikator || "-"}</td>
                                            {i.targets.map((t: Target, index_target: number) => (
                                                <React.Fragment key={index_target}>
                                                    <td className="border-r border-b px-6 py-4 text-center">{t.target || "-"} {t.satuan || "-"}</td>
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    ))
                                }
                                <td className="border-r border-b px-6 py-4">Rp.{formatRupiah(data.total_anggaran)}</td>
                                <td className="border-r border-b">
                                    {data.pptk.length > 0 ?
                                        data.pptk.map((pt: PPTK, pt_index: number) => (
                                            <div key={pt_index} className="px-2 py-4 flex flex-col items-center gap-1">
                                                <div className="p-2 border border-green-500 rounded-lg flex justify-between gap-1" key={pt_index}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="p-1 rounded-lg bg-white">
                                                            <p className="font-semibold">Pelaksana :</p>
                                                            <p>{pt.nama_pegawai || "unknown"}</p>
                                                        </div>
                                                        <div className="p-1 rounded-lg bg-white">
                                                            <p className="font-semibold">Atasan :</p>
                                                            <p>{pt.nama_atasan || "unknown"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center gap-1">
                                                        <div className="p-1 rounded-full flex flex-col items-center gap-1 bg-white shadow-md">
                                                            <button
                                                                className="p-1 flex items-center gap-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                                                                onClick={() => handleModalPJ(data, pt)}
                                                                title="Edit Data PPTK"
                                                            >
                                                                <TbPencil />
                                                            </button>
                                                            <button
                                                                className="p-1 flex items-center gap-1 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white"
                                                                title="Hapus Data PPTK"
                                                                onClick={() => AlertQuestion("Hapus Data", "", "question", "Hapus", "Batal").then((resp) => {
                                                                    if(resp.isConfirmed){
                                                                        hapusPJ(pt.id);
                                                                    }
                                                                })}
                                                            >
                                                                <TbTrash />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ButtonBlackBorder
                                                    className="flex items-center gap-1 w-full rounded-full"
                                                    onClick={() => handleModalPJ(data)}
                                                >
                                                    <TbCirclePlus />
                                                    Tambah PPTK
                                                </ButtonBlackBorder>
                                            </div>
                                        ))
                                        :
                                        <div className="flex items-center-gap-1 px-6 py-4">
                                            <ButtonBlackBorder
                                                className="flex items-center gap-1 w-full rounded-full"
                                                onClick={() => handleModalPJ(data)}
                                            >
                                                <TbCirclePlus />
                                                Tambah PPTK
                                            </ButtonBlackBorder>
                                        </div>
                                    }
                                </td>
                            </tr>
                            {data.rincian_belanja.map((rekin: RincianBelanja, index_rb: number) => (
                                <React.Fragment key={index_rb}>
                                    <tr>
                                        <td rowSpan={rekin.indikator ? rekin.indikator.length : 2} className="border-r border-b px-6 py-4">{index + 1}.{index_rb + 1}</td>
                                        <td rowSpan={rekin.indikator ? rekin.indikator.length : 2} className="border-r border-b px-6 py-4">{rekin.nama_pegawai || "-"}</td>
                                        <td rowSpan={rekin.indikator ? rekin.indikator.length : 2} className="border-r border-b px-6 py-4">{rekin.rencana_kinerja || "-"}</td>
                                        {/* Kolom indikator pertama */}
                                        {rekin.indikator === null ? (
                                            <React.Fragment>
                                                <td className="border-r border-b px-6 py-4">-</td>
                                                <td className="border-r border-b px-6 py-4 text-center">-</td>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <td className="border-r border-b px-6 py-4">{rekin.indikator[0].nama_indikator || "-"}</td>
                                                {rekin.indikator[0].targets.length === 0 || rekin.indikator[0].targets === null ? (
                                                    <td className="border-r border-b px-6 py-4 text-center">-</td>
                                                ) : (
                                                    rekin.indikator[0].targets.map((t: Target, index_t: number) => (
                                                        <td key={t.id_target || index_t} className="border-r border-b px-6 py-4 text-center">{t.target || "-"} {t.satuan || "-"}</td>
                                                    ))
                                                )}
                                            </React.Fragment>
                                        )}
                                        <td rowSpan={rekin.indikator ? rekin.indikator.length : 2} className="border-r border-b px-6 py-4">Rp.{formatRupiah(rekin.total_anggaran || 0)}</td>
                                    </tr>
                                    {/* Baris-baris untuk indikator selanjutnya */}
                                    {rekin.indikator ?
                                        rekin.indikator.slice(1).map((i: IndikatorRencanaKinerja, index_i) => (
                                            <tr key={i.id_indikator || index_i}>
                                                <td className="border-r border-b px-6 py-4">{i.nama_indikator || "-"}</td>
                                                {i.targets.length === 0 || i.targets === null ? (
                                                    <td className="border-r border-b px-6 py-4 text-center">-</td>
                                                ) : (
                                                    i.targets.map((t: Target, index_t: number) => (
                                                        <td key={t.id_target || index_t} className="border-r border-b px-6 py-4 text-center">{t.target || "-"} {t.satuan || "-"}</td>
                                                    ))
                                                )}
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td className="border-r border-b px-6 py-4">-</td>
                                            <td className="border-r border-b px-6 py-4 text-center">-</td>
                                        </tr>
                                    }
                                    {rekin.rencana_aksi === null ?
                                        <tr>
                                            <td colSpan={5} className="border-r border-b px-6 py-4 text-red-500">Renaksi Belum di tambahkan di rencana kinerja</td>
                                            <td className="border-r border-b px-6 py-4">Rp.0</td>
                                        </tr>
                                        :
                                        rekin.rencana_aksi.map((renaksi: RencanaAksi, index_renaksi: number) => (
                                            <tr key={renaksi.renaksi_id || index_renaksi}>
                                                <td colSpan={5} className="border-r border-b px-6 py-4">Renaksi {index_renaksi + 1}: {renaksi.renaksi}</td>
                                                <td className="border-r border-b px-6 py-4">Rp.{formatRupiah(renaksi.anggaran || 0)}</td>
                                            </tr>
                                        ))
                                    }
                                </React.Fragment>
                            ))}
                        </tbody>
                    ))
                }
            </table>
            <ModalPenanggungJawab
                isOpen={ModalPJ}
                onClose={() => handleModalPJ(null)}
                onSuccess={() => setFetchTrigger((prev) => !prev)}
                kode_opd={kode_opd}
                Data={DataModal}
                DataEdit={DataEdit}
                metode="tambah"
            />
        </div>
    )
}