'use client'

import useSWR from "swr";
import React from "react";
import { RincianRekin } from "../type";
import { TbX } from "react-icons/tb";
import { api } from "../service";
import { RekinComponent } from "./Rekin";
import { SubKegiatanComponent } from "./SubKegiatanComponent";
import { RenaksiComponent } from "./RenaksiComponent";
import { DasarHukumComponent } from "./DasarHukumComponent";
import { GambaranUmumComponent } from "./GambaranUmumComponent";
import { PermasalahanRekinComponent } from "./PermasalahanRekinComponent";
import { LoadingBeat } from "@/components/global/Loading";

interface modal {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    nip: string;
}

export const ModalLaporanKAK: React.FC<modal> = ({ isOpen, onClose, id, nip }) => {

    const shouldFetch = Boolean(id && nip);

    const { data = [], isLoading } = useSWR(
        shouldFetch ? ["rincian-kak", nip, id] : null,
        () => api.rincian_kak.findall({ nip, id }), { revalidateOnFocus: false }
    );

    const Dummy = {
        "rencana_kinerja": {
            "id_rencana_kinerja": "REKIN-PEG-2025-03534",
            "id_pohon": 8375,
            "perlu_ubah_pokin": false,
            "nama_pohon": "Melakukan koordinasi penyusunan dokumen perencanaan",
            "nama_rencana_kinerja": "Melakukan koordinasi penyusunan dokumen perencanaan",
            "tahun": "2025",
            "status_rencana_kinerja": "tidak aktif",
            "operasional_daerah": {
                "kode_opd": "5.01.5.05.0.00.01.0000",
                "nama_opd": "Badan Perencanaan Pembangunan Riset, dan Inovasi Daerah"
            },
            "pegawai_id": "akun_test_level_3",
            "nama_pegawai": "akun test level 3",
            "indikator": [
                {
                    "id_indikator": "IND-REKIN-16519",
                    "rencana_kinerja_id": "REKIN-PEG-2025-03534",
                    "nama_indikator": "Jumlah OPD yang diasistensi dalam penyusunan Pokin Daerah dan OPD",
                    "targets": [
                        {
                            "id_target": "TRGT-IND-REKIN-12931",
                            "indikator_id": "IND-REKIN-16519",
                            "target": "56 ",
                            "satuan": "OPD"
                        }
                    ],
                    "data_output": {
                        "output_data": [
                            "penduduk"
                        ]
                    },
                    "manual_ik_exist": false
                },
                {
                    "id_indikator": "IND-REKIN-52229",
                    "rencana_kinerja_id": "REKIN-PEG-2025-03534",
                    "nama_indikator": "indikator dengan panjang melebihi kotak table untuk cek responsife tampilan",
                    "targets": [
                        {
                            "id_target": "TRGT-IND-REKIN-01043",
                            "indikator_id": "IND-REKIN-52229",
                            "target": "20",
                            "satuan": "%"
                        }
                    ],
                    "data_output": {
                        "output_data": [
                            "kinerja"
                        ]
                    },
                    "manual_ik_exist": false
                }
            ],
            "sub_kegiatan": {}
        },
        "rencana_aksis": {
            "rencana_aksi": [
                {
                    "id": "RENAKSI-REKIN-7d892",
                    "rekin_id": "REKIN-PEG-2025-03534",
                    "kode_opd": "5.01.5.05.0.00.01.0000",
                    "urutan": 1,
                    "nama_rencana_aksi": "Rapat kerja test",
                    "pelaksanaan": [
                        {
                            "id": "PLKSN-RENAKSI-84250",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 1,
                            "bobot": 90
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 2,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 3,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 4,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 5,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 6,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 7,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 8,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 9,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 10,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 11,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-7d892",
                            "bulan": 12,
                            "bobot": 0
                        }
                    ],
                    "jumlah_bobot": 90,
                    "total_bobot_rencana_aksi": 90
                },
                {
                    "id": "RENAKSI-REKIN-0dec0",
                    "rekin_id": "REKIN-PEG-2025-03534",
                    "kode_opd": "5.01.5.05.0.00.01.0000",
                    "urutan": 2,
                    "nama_rencana_aksi": "Test",
                    "pelaksanaan": [
                        {
                            "id": "PLKSN-RENAKSI-18909",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 1,
                            "bobot": 5
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 2,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 3,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 4,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 5,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 6,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 7,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 8,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 9,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 10,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 11,
                            "bobot": 0
                        },
                        {
                            "id": "",
                            "rencana_aksi_id": "RENAKSI-REKIN-0dec0",
                            "bulan": 12,
                            "bobot": 0
                        }
                    ],
                    "jumlah_bobot": 5,
                    "total_bobot_rencana_aksi": 5
                }
            ],
            "total_per_bulan": [
                {
                    "bulan": 1,
                    "total_bobot": 95
                },
                {
                    "bulan": 2,
                    "total_bobot": 0
                },
                {
                    "bulan": 3,
                    "total_bobot": 0
                },
                {
                    "bulan": 4,
                    "total_bobot": 0
                },
                {
                    "bulan": 5,
                    "total_bobot": 0
                },
                {
                    "bulan": 6,
                    "total_bobot": 0
                },
                {
                    "bulan": 7,
                    "total_bobot": 0
                },
                {
                    "bulan": 8,
                    "total_bobot": 0
                },
                {
                    "bulan": 9,
                    "total_bobot": 0
                },
                {
                    "bulan": 10,
                    "total_bobot": 0
                },
                {
                    "bulan": 11,
                    "total_bobot": 0
                },
                {
                    "bulan": 12,
                    "total_bobot": 0
                }
            ],
            "total_keseluruhan": 95,
            "waktu_dibutuhkan": 1
        },
        "usulan": null,
        "subkegiatan": [
            {
                "subkegiatanterpilih_id": "72d4d0ec-c569-46df-8c12-4117b2c62f4c",
                "id": "SUB-KEG-5.01.02.2.03.0003",
                "rekin_id": "REKIN-PEG-2025-03534",
                "kode_subkegiatan": "5.01.02.2.03.0003",
                "nama_sub_kegiatan": "Monitoring, Evaluasi dan Penyusunan Laporan Berkala Pelaksanaan Pembangunan Daerah"
            }
        ],
        "permasalahan": [
            {
                "Id": 102750,
                "RekinId": "REKIN-PEG-2025-03534",
                "Permasalahan": "cek permasalahan",
                "PenyebabInternal": "internal",
                "PenyebabEksternal": "eksternal",
                "JenisPermasalahan": "umum"
            }
        ],
        "dasar_hukum": [
            {
                "id": "DASHU-REKIN-13932",
                "rencana_kinerja_id": "REKIN-PEG-2025-03534",
                "kode_opd": "5.01.5.05.0.00.01.0000",
                "urutan": 1,
                "peraturan_terkait": "test",
                "uraian": "Test",
            }
        ],
        "gambaran_umum": [
            {
                "id": "GMBRUMUM-REKIN-15854",
                "rencana_kinerja_id": "REKIN-PEG-2025-03534",
                "kode_opd": "5.01.5.05.0.00.01.0000",
                "urutan": 1,
                "gambaran_umum": "test",
                "action": [
                    {
                        "name": "Find By Id Gambaran Umum",
                        "method": "GET",
                        "url": "0.0.0.0:8080/gambaran_umum/detail/:id"
                    },
                    {
                        "name": "Update Gambaran Umum",
                        "method": "PUT",
                        "url": "0.0.0.0:8080/gambaran_umum/update/:id"
                    },
                    {
                        "name": "Delete Gambaran Umum",
                        "method": "DELETE",
                        "url": "0.0.0.0:8080/gambaran_umum/delete/:id"
                    }
                ]
            }
        ],
        "inovasi": null
    }

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
                <div className={`bg-white rounded-lg z-10 w-5/6 h-[90%] overflow-auto`}>
                    <div className="flex justify-between w-max-[500px] p-5 border-b border-emerald-700">
                        <h1 className="text-xl uppercase text-center font-bold">Detail Rencana Kinerja</h1>
                        <button
                            className="p-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={onClose}
                        >
                            <TbX />
                        </button>
                    </div>
                    {isLoading ? 
                        <div className="w-full h-[90%] flex flex-col items-center justify-center">
                            <LoadingBeat />
                            <p className="text-slate-600">Memuat data detail rincian rencana kinerja</p>
                        </div>
                    :
                        <div className="flex flex-col mx-5 py-5 gap-2">
                            {data[0].subkegiatan ?
                                <SubKegiatanComponent data={data[0].subkegiatan[0]} />
                                :
                                <p className="p-5 border border-red-400 text-red-400 font-semibold text-center rounded-lg">Sub Kegiatan Belum Di Pilih</p>
                            }
                            {data[0].rencana_kinerja ?
                                <RekinComponent data={data[0].rencana_kinerja} />
                                :
                                <p>Rencana Kinerja Kosong</p>
                            }
                            {data[0].rencana_aksis &&
                                <RenaksiComponent data={data[0].rencana_aksis} />
                            }
                            {data[0].dasar_hukum &&
                                <DasarHukumComponent data={data[0].dasar_hukum} />
                            }
                            {data[0].gambaran_umum &&
                                <GambaranUmumComponent data={data[0].gambaran_umum} />
                            }
                            {data[0].permasalahan &&
                                <PermasalahanRekinComponent data={data[0].permasalahan} />
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}