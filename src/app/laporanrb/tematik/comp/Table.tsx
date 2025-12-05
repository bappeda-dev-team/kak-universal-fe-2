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
    indikator_rencana_aksis: [];
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

interface IndikatorRB {
    id: string;
    id_rb: number;
    indikator: string;
    target: TargetRB[];
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
                <div className="overflow-auto m-2 rounded-t-xl border w-full">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-yellow-600 text-white">
                                <th rowSpan={2} className="border-r border-b px-6 py-3 text-center">No</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[150px]">Jenis RB</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Kegiatan Utama</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Keterangan</th>
                                <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Indikator</th>
                                <th colSpan={4} className="border-r border-b px-6 py-3 w-[400px]">BaseLine {tahunBaseline}</th>
                                <th colSpan={2} className="border-r border-b px-6 py-3 w-[200px]">{branding?.tahun?.value}</th>
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
                                <th rowSpan={2} className="border-l border-b px-6 py-3 min-w-[200px]">Ketarangan</th>
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
                        <tbody>
                            {Data.length > 0 ?
                                Data.map((item: RencanaReformasiBirokrasi, index: number) => (
                                    <React.Fragment key={index}>
                                        <tr key={index}>
                                            <td className="border-x border-b border-yellow-600 py-4 px-3 text-center">{index + 1}</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">{item.jenis_rb || "-"}</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">{item.kegiatan_utama || "-"}</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">{item.keterangan || "-"}</td>
                                            {item.indikator ?
                                                <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">
                                                    {item.indikator.map((ind: IndikatorRB, ind_index: number) => (
                                                        <div className="flex gap-1" key={ind_index}>
                                                            <p className="">{ind.indikator || "-"}</p>
                                                        </div>
                                                    ))}
                                                </td>
                                                :
                                                <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">-</td>
                                            }
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            {item.rencana_aksis.length > 0 ?
                                                <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">
                                                    {item.rencana_aksis.map((ra: RencanaAksi, ra_index: number) => (
                                                        <div className="flex gap-1" key={ra_index}>
                                                            <p className="border border-black p-1 rounded-lg">{ra_index + 1}.</p>
                                                            <p className="">{ra.rencana_aksi || "-"}</p>
                                                        </div>
                                                    ))}
                                                </td>
                                                :
                                                <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">-</td>
                                            }
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                            <td className="border-r border-b border-yellow-600 px-6 py-4 text-center">pengembangan</td>
                                        </tr>
                                    </React.Fragment>
                                ))
                                :
                                <tr>
                                    <td className="px-6 py-3" colSpan={30}>
                                        Data Kosong / Belum Ditambahkan
                                    </td>
                                </tr>
                            }
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
} 