'use client'

import React, { useState } from "react";
import { LaporanKak, Rekin } from "../type";
import { TbFileSearch } from "react-icons/tb";
import { ModalLaporanKAK } from "./ModalLaporanKAK";

interface Table {
    nama_opd: string;
    data: Rekin[];
}

const Table: React.FC<Table> = ({ data, nama_opd }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [IdRekin, setIdRekin] = useState<string>("");
    const [Nip, setNip] = useState<string>("");

    const handleModal = (id: string, nip: string) => {
        if (ModalOpen) {
            setIdRekin(id);
            setNip(nip);
            setModalOpen(false);
        } else {
            setIdRekin(id);
            setNip(nip);
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

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-r border-b px-6 py-3 w-[50px]">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Pegawai</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Pohon</th>
                            <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Rencana Kinerja</th>
                            <th className="border-r border-b px-6 py-3 min-w-[150px]">Nama OPD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ?
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={13}>
                                    Data Laporan Rencana Kinerja (KAK) di OPD {nama_opd || "unknown"} Kosong
                                </td>
                            </tr>
                            :
                            data.map((item: Rekin, index: number) => {

                                // const totalRow = item.rencana_kinerja.length === 0 ? 2 : item.rencana_kinerja.length + 1;

                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">{index + 1}</td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <p className="font-bold">{item.nama_pegawai || "unknown"}</p>
                                                    <p className="font-light text-slate-500">{item.pegawai_id || "nip unknown"}</p>
                                                </div>
                                            </td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">
                                                {item.nama_pohon ? 
                                                    <p>{item.nama_pohon || "-"}</p>
                                                    :
                                                    <p className="italic font-light text-red-400">Pohon Kinerja Kosong / Telah Di Hapus</p>
                                                }
                                            </td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">{item.nama_rencana_kinerja || "-"}</td>
                                            <td className="border-r border-b border-emerald-500 text-center p-2">
                                                <button
                                                    className="p-1 border border-emerald-500 rounded-full text-emerald-500 hover:text-white hover:bg-emerald-400 hover:border-emerald-400"
                                                    title="Lihat Detail Rencana Kinerja"
                                                    onClick={() => handleModal(item.id_rencana_kinerja, item.pegawai_id)}
                                                >
                                                    <TbFileSearch />
                                                </button>
                                            </td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4">{item.operasional_daerah.nama_opd || "unknown"}</td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ModalLaporanKAK isOpen={ModalOpen} onClose={() => handleModal("", "")} id={IdRekin} nip={Nip}/>
        </>
    )
}

export default Table;