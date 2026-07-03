'use client'

import React, { useState, useEffect } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { LaporanKak, Rekin } from "../type";
import { TbFileSearch } from "react-icons/tb";
import { ModalLaporanKAK } from "./ModalLaporanKAK";

interface Table {
    tahun: number;
    kode_opd: string;
    nama_opd: string
}

const Table: React.FC<Table> = ({ tahun, kode_opd, nama_opd }) => {

    const [Opd, setOpd] = useState<LaporanKak[]>([]);
    const [Error, setError] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const token = getToken();

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [IdRekin, setIdRekin] = useState<string>("");

    const handleModal = (id: string) => {
        if (ModalOpen) {
            setIdRekin(id);
            setModalOpen(false);
        } else {
            setIdRekin(id);
            setModalOpen(true);
        }
    }

    const Dummy = [
        {
            "nama_pegawai": "Myko Akbar",
            "nip": "19409130491418",
            "rencana_kinerja": [
                {
                    id_rencana_kinerja: "REKIN-PEG-2026-99329",
                    id_pohon: 7826,
                    perlu_ubah_pokin: false,
                    nama_pohon: "Terlaksananya Layanan Administrasi Pengangkatan dan Pemberhentian PNS Jabatan Fungsional",
                    level_pohon: 7,
                    nama_rencana_kinerja: "Terlaksananya Layanan Administrasi Pengangkatan dan Pemberhentian PNS Jabatan Fungsional",
                    tahun: "2026",
                    status_rencana_kinerja: "aktif",
                    operasional_daerah: {
                        kode_opd: "5.03.5.04.0.00.01.0000",
                        nama_opd: "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
                    },
                    pegawai_id: "200011272023081003",
                    nama_pegawai: "ARIYANDI RAMADHAN S.Tr.I.P.",
                    indikator: [
                        {
                            id_indikator: "IND-REKIN-44501",
                            rencana_kinerja_id: "REKIN-PEG-2026-99329",
                            nama_indikator: "Jumlah Pengangkatan dan Pemberhentian PNS Jabatan Fungsional",
                            targets: [
                                {
                                    id_target: "TRGT-IND-REKIN-71003",
                                    indikator_id: "IND-REKIN-44501",
                                    target: "1",
                                    satuan: "laporan",
                                },
                            ],
                            manual_ik_exist: false,
                        },
                    ],
                },
                {
                    id_rencana_kinerja: "REKIN-PEG-2026-99329",
                    id_pohon: 7826,
                    perlu_ubah_pokin: false,
                    nama_pohon: "Terlaksananya Layanan Administrasi Pengangkatan dan Pemberhentian PNS Jabatan Fungsional",
                    level_pohon: 7,
                    nama_rencana_kinerja: "Terlaksananya Layanan Administrasi Pengangkatan dan Pemberhentian PNS Jabatan Fungsional",
                    tahun: "2026",
                    status_rencana_kinerja: "aktif",
                    operasional_daerah: {
                        kode_opd: "5.03.5.04.0.00.01.0000",
                        nama_opd: "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
                    },
                    pegawai_id: "200011272023081003",
                    nama_pegawai: "ARIYANDI RAMADHAN S.Tr.I.P.",
                    indikator: [
                        {
                            id_indikator: "IND-REKIN-44501",
                            rencana_kinerja_id: "REKIN-PEG-2026-99329",
                            nama_indikator: "Jumlah Pengangkatan dan Pemberhentian PNS Jabatan Fungsional",
                            targets: [
                                {
                                    id_target: "TRGT-IND-REKIN-71003",
                                    indikator_id: "IND-REKIN-44501",
                                    target: "1",
                                    satuan: "laporan",
                                },
                            ],
                            manual_ik_exist: false,
                        },
                    ],
                   
                },
            ]
        },
        {
            "nama_pegawai": "Ryan Brilian",
            "nip": "0934081730871",
            "rencana_kinerja": []
        }
    ]

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-r border-b px-6 py-3 w-[50px]">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Pegawai</th>
                            <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Rencana Kinerja</th>
                            <th className="border-r border-b px-6 py-3 min-w-[150px]">Nama OPD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Dummy.length === 0 ?
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={13}>
                                    Data Laporan Rencana Kinerja (KAK) di OPD {nama_opd || "unknown"} Kosong
                                </td>
                            </tr>
                            :
                            Dummy.map((item: LaporanKak, index: number) => {

                                const totalRow = item.rencana_kinerja.length === 0 ? 2 : item.rencana_kinerja.length + 1;

                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td rowSpan={totalRow} className="border-r border-b border-emerald-500 px-6 py-4">{index + 1}</td>
                                            <td rowSpan={totalRow} className="border-r border-b border-emerald-500 px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <p className="font-bold">{item.nama_pegawai || "unknown"}</p>
                                                    <p className="font-light text-slate-500">{item.nip || "nip unknown"}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        {item.rencana_kinerja.length === 0 ?
                                            <tr>
                                                <td className="px-6 py-3 uppercase bg-red-400 text-white border border-emerald-500" colSpan={3}>
                                                    Rencana Kinerja Kosong
                                                </td>
                                            </tr>
                                            :
                                            item.rencana_kinerja.map((rk: Rekin, rk_index: number) => (
                                                <tr key={rk_index}>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">{rk.nama_rencana_kinerja || "-"}</td>
                                                    <td className="border-r border-b border-emerald-500 text-center p-2">
                                                        <button
                                                            className="p-1 border border-emerald-500 rounded-full text-emerald-500 hover:text-white hover:bg-emerald-400 hover:border-emerald-400"
                                                            title="Lihat Detail Rencana Kinerja"
                                                            onClick={() => handleModal(rk.id_rencana_kinerja)}
                                                        >
                                                            <TbFileSearch />
                                                        </button>
                                                    </td>
                                                    <td className="border-r border-b border-emerald-500 px-6 py-4">{rk.operasional_daerah.nama_opd || "unknown"}</td>
                                                </tr>
                                            ))
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ModalLaporanKAK isOpen={ModalOpen} onClose={() => handleModal("")} id={IdRekin} />
        </>
    )
}

export default Table;