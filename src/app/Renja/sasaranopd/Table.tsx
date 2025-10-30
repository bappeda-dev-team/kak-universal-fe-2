'use client'

import { ButtonRed, ButtonGreen } from "@/components/global/Button";
import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { TahunNull, OpdTahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import { useRouter } from "next/navigation";

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
    sumber_data: string;
    target: Target[];
}

interface Pelaksana {
    id: string;
    pegawai_id: string;
    nip: string;
    nama_pegawai: string;
}

interface SasaranOpd {
    id: string;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
    nama_sasaran_opd: string;
    id_tujuan_opd: number,
    nama_tujuan_opd: string,
    nip: string;
    indikator: Indikator[];
}

interface Sasaran {
    id_pohon: number;
    nama_pohon: string;
    jenis_pohon: string;
    tahun_pohon: string;
    level_pohon: number;
    sasaran_opd: SasaranOpd[];
    pelaksana: Pelaksana[];
}

interface table {
    kode_opd: string;
    tahun: number;
}

const Table: React.FC<table> = ({ kode_opd, tahun }) => {

    const [Sasaran, setSasaran] = useState<Sasaran[]>([]);

    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);
    const [Loading, setLoading] = useState<boolean | null>(null);

    const router = useRouter();
    const token = getToken();
    const { branding } = useBrandingContext();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        let url = '';
        if (branding?.user?.roles == 'super_admin') {
            url = `sasaran_opd/renja/${branding?.opd?.value}/${tahun}/RPJMD`
        } else {
            url = `sasaran_opd/renja/${branding?.user?.kode_opd}/${tahun}/RPJMD`
        }
        const fetchSasaranOpd = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/${url}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                // console.log(data);
                if (data === null) {
                    setDataNull(true);
                    setSasaran([]);
                } else if (result.code == 401) {
                    setSasaran([]);
                    AlertNotification("Login Kembali", "", "warning", 2000);
                    router.push('/login');
                } else if (result.code == 200 || result.code == 201) {
                    setDataNull(false);
                    setSasaran(data);
                    setError(false);
                } else {
                    setDataNull(false);
                    setSasaran([]);
                    setError(true);
                    console.log(result.data);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        if (branding?.user?.roles !== undefined) {
            fetchSasaranOpd();

        }
    }, [token, branding, tahun, kode_opd, router]);

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Error, Periksa koneksi internet atau database server, jika error masih berlanjut hubungi tim developer</h1>
            </div>
        )
    } else if (branding?.tahun?.value == undefined) {
        return <TahunNull />
    } else if (branding?.user?.roles == 'super_admin' || branding?.user?.roles == 'reviewer') {
        if (branding?.opd?.value == undefined) {
            return (
                <>
                    <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
                        <OpdTahunNull />
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Strategic OPD</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Pemilik</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Sasaran OPD</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[300px]">Tujuan OPD</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Rumus Perhitungan</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Sumber Data</th>
                            <th colSpan={2} className="border-l border-b px-6 py-3 min-w-[100px]">{tahun || "tahun tidak terdeteksi"}</th>
                        </tr>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-l border-b px-6 py-3 min-w-[50px]">Target</th>
                            <th className="border-l border-b px-6 py-3 min-w-[50px]">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataNull ?
                            <tr>
                                <td className="px-6 py-3" colSpan={30}>
                                    Data kosong / Strategic OPD Belum di tambahkan
                                </td>
                            </tr>
                            :
                            Sasaran.map((data: Sasaran, index: number) => {
                                // Cek apakah data.tujuan_pemda ada
                                const hasPelaksana = data.pelaksana.length != 0;
                                const hasSasaran = data.sasaran_opd.length != 0;
                                const TotalRow = data.sasaran_opd.reduce((total, item) => total + (item.indikator.length == 0 ? 1 : item.indikator.length), 0) + data.sasaran_opd.length + 1;

                                return (
                                    <React.Fragment key={index}>
                                        {/* Baris Utama */}
                                        <tr>
                                            <td className="border-x border-b border-emerald-500 px-6 py-4 text-center" rowSpan={data.sasaran_opd.length === 0 ? 2 : TotalRow}>
                                                {index + 1}
                                            </td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4" rowSpan={data.sasaran_opd.length === 0 ? 2 : TotalRow}>
                                                <div className="flex flex-col gap-2">
                                                    {data.nama_pohon || "-"}
                                                </div>
                                            </td>
                                            <td className="border-r border-b border-emerald-500 px-6 py-4" rowSpan={data.sasaran_opd.length === 0 ? 2 : TotalRow}>
                                                {data.pelaksana.length == 0 ?
                                                    <p className="text-red-500">Pelaksana Belum Di Pilih</p>
                                                    :
                                                    data.pelaksana.map((p: Pelaksana) => (
                                                        <p key={p.id} className="flex flex-col justify-center gap-1">{p.nama_pegawai} ({p.nip})</p>
                                                    ))
                                                }
                                            </td>
                                        </tr>
                                        {hasSasaran ?
                                            data.sasaran_opd.map((item: SasaranOpd) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td className="border-x border-b border-emerald-500 px-6 py-6 h-[150px]" rowSpan={item.indikator.length !== 0 ? item.indikator.length + 1 : 2}>
                                                            {item.nama_sasaran_opd || "-"}
                                                        </td>
                                                        <td className="border-x border-b border-emerald-500 px-6 py-6 h-[150px]" rowSpan={item.indikator.length !== 0 ? item.indikator.length + 1 : 2}>
                                                            {item.nama_tujuan_opd ?
                                                                <p>{item.nama_tujuan_opd || "-"}</p>
                                                                :
                                                                <p className="italic text-red-300 font-thin">tujuan opd belum di pilih</p>
                                                            }
                                                        </td>
                                                    </tr>
                                                    {/* INDIKATOR */}
                                                    {item.indikator.length === 0 ? (
                                                        <React.Fragment>
                                                            <tr>
                                                                <td colSpan={30} className="border-x border-b border-emerald-500 px-6 py-6 bg-yellow-500 text-white">indikator sasaran opd belum di tambahkan</td>
                                                            </tr>
                                                        </React.Fragment>
                                                    ) : (
                                                        item.indikator.map((i: Indikator) => (
                                                            <tr key={i.id}>
                                                                <td className="border-x border-b border-emerald-500 px-6 py-6">{i.indikator || "-"}</td>
                                                                <td className="border-x border-b border-emerald-500 px-6 py-6">{i.rumus_perhitungan || "-"}</td>
                                                                <td className="border-x border-b border-emerald-500 px-6 py-6">{i.sumber_data || "-"}</td>
                                                                {i.target.map((t: Target) => (
                                                                    <React.Fragment key={t.id}>
                                                                        <td className="border-x border-b border-emerald-500 px-6 py-6 text-center">{t.target || "-"}</td>
                                                                        <td className="border-x border-b border-emerald-500 px-6 py-6 text-center">{t.satuan || "-"}</td>
                                                                    </React.Fragment>
                                                                ))}
                                                            </tr>
                                                        ))
                                                    )}
                                                </React.Fragment>
                                            ))
                                            :
                                            <tr>
                                                <td className="border-r border-b border-emerald-500 px-6 py-4 bg-red-400 text-white" colSpan={30}>
                                                    Sasaran OPD belum di buat
                                                </td>
                                            </tr>
                                        }
                                    </React.Fragment>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
