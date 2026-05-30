'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { OpdNull, TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import { ButtonBlackBorder, ButtonSkyBorder } from "@/components/global/Button";
import { TbLock, TbLockOpen, TbLockSquareRounded, TbRefresh, TbTrash } from "react-icons/tb";
import { IkdFindall, SasaranOPD, Pelaksana, ProgramOPD } from "../type";
import { AlertQuestion, AlertNotification } from "@/components/global/Alert";

interface Table {
    kode_opd: string;
    tahun: number;
}

export const Table: React.FC<Table> = ({ kode_opd, tahun }) => {

    const [Data, setData] = useState<IkdFindall[]>([]);
    const [Error, setError] = useState<boolean | null>(null);

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [Lock, setLock] = useState<boolean>(false);

    const [Loading, setLoading] = useState<boolean | null>(null);
    const token = getToken();
    const { branding } = useBrandingContext();

    useEffect(() => {
        const fetchOpd = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`${branding?.api_perencanaan}/ikd/findall/${kode_opd}/${tahun}/RPJMD`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (result.code === 200) {
                    if (result.data === null) {
                        setData([]);
                    } else {
                        setData(result.data);
                    }
                } else {
                    setError(true);
                    setData([]);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        if (kode_opd != undefined) {
            fetchOpd();
        }
    }, [token, kode_opd, FetchTrigger]);

    const JenisPohon = (jenis: string) => {
        switch (jenis) {
            case "Strategic Pemda":
            case "Strategic":
                return (
                    <div className="p-1 rounded-lg text-center bg-red-200 text-red-700">
                        {jenis}
                    </div>
                )
            case "Tactical Pemda":
            case "Tactical":
                return (
                    <div className="p-1 rounded-lg text-center bg-blue-200 text-blue-700">
                        {jenis}
                    </div>
                )
            case "Operational Pemda":
            case "Operational":
                return (
                    <div className="p-1 rounded-lg text-center bg-green-200 text-green-700">
                        {jenis}
                    </div>
                )
            case "Operational N":
                return (
                    <div className="p-1 rounded-lg text-center border border-green-700 text-green-700">
                        {jenis}
                    </div>
                )
            default:
                return (
                    <div className="p-1 rounded-lg text-center border">
                        No Level
                    </div>
                )
        }
    }
    const refresh = () => {
        setFetchTrigger((prev) => !prev);
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
                <h1 className="text-red-500 font-bold mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else if (branding?.tahun?.value === undefined) {
        return <TahunNull />
    } else if (branding?.user?.roles == "super_admin" && (branding?.opd?.value === null || branding?.opd?.value === undefined)) {
        return <OpdNull />
    } else {
        return (
            <>
                <div className="flex flex-wrap items-center justify-between gap-1 px-1">
                    <div className="flex items-center gap-1">
                        <ButtonBlackBorder
                            className="flex items-center gap-1"
                            onClick={refresh}
                        >
                            <TbRefresh />
                            Refresh
                        </ButtonBlackBorder>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                    <div className="overflow-auto m-2 rounded-t-xl border w-full">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-emerald-500 text-white">
                                    <th className="border-r border-b px-6 py-3 text-center">No</th>
                                    <th className="border-r border-b px-6 py-3 min-w-[250px]">Nama Pohon</th>
                                    <th className="border-r border-b px-6 py-3 min-w-[200px]">Pelaksana</th>
                                    <th className="border-l border-b px-6 py-3 min-w-[200px]">Sasaran OPD</th>
                                    <th className="border-l border-b px-6 py-3 min-w-[350px]">Program OPD</th>
                                </tr>
                                <tr className="bg-emerald-700 text-white">
                                    <th className="border-r border-b px-2 py-1 text-center">1</th>
                                    <th className="border-r border-b px-2 py-1 text-center">2</th>
                                    <th className="border-r border-b px-2 py-1 text-center">3</th>
                                    <th className="border-r border-b px-2 py-1 text-center">4</th>
                                    <th className="border-l border-b px-2 py-1 text-center">5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(Data.length === 0) ?
                                    <tr>
                                        <td className="px-6 py-3" colSpan={30}>
                                            Data Kosong / Belum Ditambahkan
                                        </td>
                                    </tr>
                                    :
                                    Data.map((item: IkdFindall, index: number) => {

                                        const LockButton = item.program_opd_terpilih.length != 0 && item.sasaran_opd.length != 0 && item.pelaksana.length != 0

                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td className="border border-emerald-500 px-4 py-4 text-center">{index + 1}</td>
                                                    <td className="border-x border-b border-emerald-500 px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            {item.nama_pohon || ""}
                                                            {JenisPohon(item.jenis_pohon || "")}
                                                        </div>
                                                    </td>
                                                    <td className="border-x border-b border-emerald-500 px-6 py-4">
                                                        {item.pelaksana.length != 0 ?
                                                            <div className="flex flex-col items-center gap-3">
                                                                {item.pelaksana.map((p: Pelaksana, p_index) => (
                                                                    <div key={p_index} className="flex flex-col items-center border border-emerald-500 text-emerald-700 rounded-lg py-1 px-2">
                                                                        <p className="border-b border-emerald-700 font-bold">{p.nama_pegawai || ""}</p>
                                                                        <p>{p.nip || ""}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            :
                                                            <p className="text-red-300">Pelaksana Belum di pilih</p>
                                                        }
                                                    </td>
                                                    <td className="border-x border-b border-emerald-500 px-6 py-4">
                                                        {item.sasaran_opd.length != 0 ?
                                                            item.sasaran_opd.map((s: SasaranOPD, s_index) => (
                                                                <p key={s_index}>{s.nama_sasaran_opd || ""}</p>
                                                            ))
                                                            :
                                                            <p className="text-red-300">Sasaran OPD belum di buat</p>
                                                        }
                                                    </td>
                                                    <td className={`border-x border-b border-emerald-500 ${Lock && "bg-red-300"}`}>
                                                        {item.program_opd_terpilih.length != 0 ?
                                                            item.program_opd_terpilih.map((p: ProgramOPD, pr_index: number) => (
                                                                <React.Fragment key={pr_index}>
                                                                    <ProgramTerpilih
                                                                        program={p}
                                                                        pr_index={pr_index}
                                                                        program_length={item.program_opd_terpilih.length - 1}
                                                                    />
                                                                </React.Fragment>
                                                            ))
                                                            :
                                                            <p className="text-red-300 px-6 py-4">Program belum di pilih</p>
                                                        }
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    }
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

interface ProgramTerpilih {
    program: ProgramOPD;
    pr_index: number;
    program_length: number;
}
export const ProgramTerpilih: React.FC<ProgramTerpilih> = ({ program, pr_index, program_length }) => {

    const [Lock, setLock] = useState<boolean>(program.is_locked);
    const { branding } = useBrandingContext();
    const token = getToken();

    const handleLock = async (lock: boolean) => {
        let url = '';
        if (lock) {
            url = `ikd/select_program_opd/lock/${program.id}`
        } else {
            url = `ikd/select_program_opd/unlock/${program.id}`
        }
        try {
            const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                method: "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if(result.code === 200 || result.code === 201){
                setLock((prev) => !prev);
                AlertNotification("Berhasil", "", "success", 2000, true)
            } else {
                AlertNotification("Gagal", `${result.data}`, "success", 2000, true)
            }
        } catch (err){
            console.log(err);
            AlertNotification("Gagal", `${err}`, "success", 2000, true)
        }
    }

    return (
        <div className={`flex items-center gap-1 px-6 py-4 ${pr_index != program_length && "border-b border-emerald-500"}`} key={pr_index}>
            <div className={`p-3 w-full flex justify-between items-center gap-2 rounded-lg ${Lock ? "bg-red-500 text-white" : "border border-emerald-500"}`}>
                {program.nama_program || ""}
                <button
                    type="button"
                    title={`${Lock ? "buka kunci" : "kunci"}`}
                    className={`p-2 rounded-full border cursor-pointer ${Lock ? "border-red-300 hover:bg-red-300" : "border-emerald-500 hover:bg-emerald-300"}`}
                    onClick={() => AlertQuestion(`${Lock ? "Buka Kunci" : "Kunci"}`, "", "question", "Ya", "Batal").then((result) => {
                        if (result.isConfirmed) {
                            handleLock(Lock);
                        }
                    })}
                >
                    {Lock ?
                        <TbLockOpen />
                        :
                        <TbLock />
                    }
                </button>
            </div>
        </div>
    )
}