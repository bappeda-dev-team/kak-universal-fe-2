'use client'

import { ButtonSkyBorder, ButtonBlack } from "@/components/global/Button";
import React, { useState, useEffect } from "react";
import { LoadingSync } from "@/components/global/Loading";
import { TbPencil, TbCheckbox } from "react-icons/tb";
import { AlertQuestion } from "@/components/global/Alert";
import { getToken } from "@/components/lib/Cookie";
import { FormPermasalahan } from "./FormPermasalahan";
import { useBrandingContext } from "@/context/BrandingContext";

interface Table {
    kode_opd: string;
    tahun: string;
}

interface Pohon {
    id: number;
    id_permasalahan: number;
    parent: number;
    nama_pohon: string;
    level_pohon: number;
    perangkat_daerah: {
        kode_opd: string;
        nama_opd: string;
    }
    jenis_masalah: string;
    is_permasalahan: boolean;
    childs: Pohon[]
}
interface Childs {
    data?: Pohon;
    rowSpan: number;
    editing?: () => void;
}

export const TablePermasalahan: React.FC<Table> = ({ kode_opd, tahun }) => {

    const { branding } = useBrandingContext();
    const api_permasalahan = branding.api_permasalahan;

    const [Pohon, setPohon] = useState<Pohon[]>([]);
    const [DataNull, setDataNull] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const token = getToken();

    useEffect(() => {
        const fetchPohon = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${api_permasalahan}/permasalahan/${kode_opd}/${tahun}`, {
                    headers: {
                        // 'Authorization': `${token}`
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                if (result.code === 200 || result.code === 2001) {
                    if (result.data.childs.length === 0) {
                        setDataNull(true);
                        setError(false)
                        setPohon([]);
                    } else {
                        setDataNull(false);
                        setError(false);
                        setPohon(result.data.childs);
                    }
                } else {
                    setError(true);
                    setPohon([]);
                }
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPohon();
    }, [kode_opd, tahun, token, api_permasalahan, FetchTrigger]);

    if (Loading) {
        return (
            <div className="overflow-auto m-2 rounded-xl border">
                <LoadingSync />
            </div>
        )
    } else if (Error) {
        return (
            <div className="overflow-auto m-2 rounded-xl border">
                <h1 className="p-4 text-red-500 font-semibold">Error, periksa koneksi internet atau database server. terdapat kesalahan di backend</h1>
            </div>
        )
    }

    return (
        <div className="overflow-auto m-2 rounded-t-xl border">
            <table className="w-full">
                <thead>
                    <tr className="bg-black border border-black text-white">
                        <th className="border-r border-b px-3 py-3 max-w-[50px] text-center">No</th>
                        <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[400px]">Masalah Pokok</th>
                        <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[400px]">Masalah</th>
                        <th colSpan={2} className="border-r border-b px-6 py-3 min-w-[400px]">Akar Masalah</th>
                    </tr>
                </thead>
                {DataNull ?
                    <tbody>
                        <tr>
                            <td colSpan={30} className="p-4 font-semibold">Data Pohon Kinerja Kosong / Belum di tambahkan di tahun {tahun}</td>
                        </tr>
                    </tbody>
                    :
                    <tbody>
                        {Pohon.map((p: Pohon, index: number) => {

                            let calculatedTotalRow2;

                            // if (p.childs.length === 0) {
                            if (!p.childs) {
                                calculatedTotalRow2 = 1; // Hanya baris p sendiri jika tidak ada anak taktis
                            } else {
                                calculatedTotalRow2 = p.childs.reduce((accumulator, t_element) => {
                                    // t_element adalah setiap item 'tactical' (disebut 't' di JSX)
                                    let rowsForThis_t_element;
                                    if (!t_element.childs) {
                                        rowsForThis_t_element = 2; // Baris t_element + baris pesan "tidak ada anak pohon"
                                    } else {
                                        rowsForThis_t_element = 1 + t_element.childs.length; // Baris t_element + baris untuk setiap anak 'operational'
                                    }
                                    return accumulator + rowsForThis_t_element;
                                }, 0);
                            }

                            return (
                                // Strategic
                                <React.Fragment key={p.id || index}>
                                    <tr>
                                        <td rowSpan={p.childs ? calculatedTotalRow2 + 1 : 2} className="border-x border-b border-black px-3 py-4 text-center">{index + 1}</td>
                                        <Childs
                                            data={p}
                                            rowSpan={p.childs ? calculatedTotalRow2 + 1 : 2}
                                        />
                                    </tr>
                                    {/* TACTICAL */}
                                    {!p.childs ?
                                        <tr>
                                            <td colSpan={4} className="p-6 font-semibold border border-black text-red-400">tidak ada anak pohon</td>
                                        </tr>
                                        :
                                        p.childs.map((t: Pohon, sub_index: number) => (
                                            <React.Fragment key={t.id || sub_index}>
                                                <tr>
                                                    <Childs
                                                        data={t}
                                                        rowSpan={t.childs ? t.childs.length + 1 : 2}
                                                    />
                                                </tr>
                                                {/* OPERATIONAL */}
                                                {!t.childs ?
                                                    <tr>
                                                        <td colSpan={2} className="p-6 font-semibold border border-black text-red-400">tidak ada anak pohon</td>
                                                    </tr>
                                                    :
                                                    t.childs.map((o: Pohon, subsub_index: number) => (
                                                        <tr key={o.id || subsub_index}>
                                                            <Childs
                                                                data={o}
                                                                rowSpan={1}
                                                            />
                                                        </tr>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                }
            </table>
        </div>
    );

}

export const Childs: React.FC<Childs> = ({ data, rowSpan }) => {

    const [Edit, setEdit] = useState<boolean>(false);
    const [JenisForm, setJenisForm] = useState<"baru" | "edit" | "">("");

    const handleEdit = (jenis: "baru" | "edit" | "") => {
        if (Edit) {
            setEdit(false);
            setJenisForm("");
        } else {
            setEdit(true);
            setJenisForm(jenis);
        }
    }

    if (Edit) {
        return (
            <FormPermasalahan
                data={data}
                rowSpan={rowSpan}
                editing={() => handleEdit("")}
                jenis={JenisForm}
            />
        )
    } else {
        return (
            <React.Fragment>
                <td
                    rowSpan={rowSpan}
                    className={`border-r border-b border-black px-6 py-4 
                        ${data?.level_pohon === 4 && 'bg-red-300'}
                        ${data?.level_pohon === 5 && 'bg-blue-200'}
                        ${data?.level_pohon === 6 && 'bg-emerald-200'}
                    `}
                >
                    {data?.nama_pohon || "-"} {data?.id_permasalahan}
                </td>
                <td
                    rowSpan={rowSpan}
                    className={`border-r border-b border-black px-6 py-4 max-w-[150px]
                        ${data?.level_pohon === 4 && 'bg-red-300'}
                        ${data?.level_pohon === 5 && 'bg-blue-200'}
                        ${data?.level_pohon === 6 && 'bg-emerald-200'}
                    `}
                >
                    <div className="flex flex-col justify-center items-center gap-2">
                        <ButtonSkyBorder
                            className="w-full"
                            onClick={() => {
                                if (data?.id_permasalahan === 0) {
                                    handleEdit("baru");
                                } else {
                                    handleEdit("edit");
                                }
                            }}
                        >
                            <TbPencil className="mr-1" />
                            Edit
                        </ButtonSkyBorder>
                        <ButtonBlack className="w-full"
                            onClick={() => {
                                AlertQuestion("Pilih?", "", "question", "Hapus", "Batal").then((result) => {
                                    if (result.isConfirmed) {

                                    }
                                });
                            }}
                        >
                            <TbCheckbox className="mr-1" />
                            Pilih
                        </ButtonBlack>
                    </div>
                </td>
            </React.Fragment>
        )
    }
}