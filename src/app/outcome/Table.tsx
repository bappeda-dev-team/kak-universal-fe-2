'use client'

import { ButtonRed, ButtonGreen } from "@/components/global/Button";
import { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";

interface Data {
    id: number;
    id_pohon: number;
    kondisi_terukur: string;
    outcome_yang_ingin_diwujudkan: string;
    faktor_berpengaruh: string;
    data_terukur: string;
    kondisi_yang_diperlukan: string;
    intermediate_outcome: Intermediate;
}
interface Intermediate {
    indikator: string;
    target: string;
    satuan: string;
    keterangan: string;
    
}

const Table = () => {

    // if(Loading){
    //     return (    
    //         <div className="border p-5 rounded-xl shadow-xl">
    //             <LoadingClip className="mx-5 py-5"/>
    //         </div>
    //     );
    // } else if(Error){
    //     return (
    //         <div className="border p-5 rounded-xl shadow-xl">
    //             <h1 className="text-red-500 mx-5 py-5">Reload Halaman, Periksa koneksi internet atau database server</h1>
    //         </div>
    //     )
    // } else if(Tahun?.value == undefined){
    //     return <TahunNull />
    // }

    const Data: any = [
        {
            "id" : 1,
            "id_pohon" : 1,
            "kondisi_terukur" : "isu strategis 1 / tema 1",
            "outcome_yang_ingin_diwujudkan" : "indikator tema 1",
            "faktor_berpengaruh" : "input faktor 1",
            "data_terukur" : "data permasalahan 1",
            "kondisi_yang_diperlukan" : "subtema 1/investasi",
            "intermediate_outcome" : {
                "indikator" : "indikator sub tema 1",
                "target" : "target sub tema 1",
                "satuan" : "satuan sub tema 1",
                "keterangan" : "keterangan sub tema 1"
            }
        }
    ]

    return(
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Kondisi Terukur Yang DiHarapkan/Seharusnya</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Outcome Yang Ingin Diwujudkan</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Faktor yang Berpengaruh Terhadap Capaian Outcome/Penyebab Permasalahan(CSF)</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Data Terukur Terkait CSF</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Aksi</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Kondisi Yang Diperlukan Untuk Mencapai Outcome/Mengatasi Permasalahan (Intermediate Outcome)</th>
                            <th colSpan={3} className="border-r border-b px-6 py-3 min-w-[200px]">Intermediate Outcome</th>
                        </tr>
                        <tr className="bg-orange-700 text-white">
                            <th className="border-r border-b px-6 py-1 min-w-[200px]">Indikator</th>
                            <th className="border-r border-b px-6 py-1 min-w-[200px]">Target/Satuan</th>
                            <th className="border-r border-b px-6 py-1 min-w-[200px]">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {DataNull ? 
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={13}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        : */}
                        {Data.map((data: Data, index: number) => (
                        <tr key={data.id || index}>
                            <td className="border-r border-b px-6 py-4 text-center">{index + 1}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.kondisi_terukur || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.outcome_yang_ingin_diwujudkan || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center text-red-400">{data.faktor_berpengaruh || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center text-red-400">{data.data_terukur || "-"}</td>
                            <td className="border-r border-b px-6 py-4">
                                <div className="flex flex-col jutify-center items-center gap-2">
                                    <ButtonGreen className="w-full">Edit</ButtonGreen>
                                    <ButtonRed 
                                        className="w-full"
                                        onClick={() => {
                                            AlertQuestion("Hapus?", "Hapus Data Outcome yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    // hapusTematik(data.id);
                                                }
                                            });
                                        }}
                                    >
                                        Hapus
                                    </ButtonRed>
                                </div>
                            </td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.kondisi_yang_diperlukan || "-"}</td>
                            {data.intermediate_outcome ? 
                                <>
                                    <td className="border-r border-b px-6 py-4 text-center">{data.intermediate_outcome.indikator || "-"}</td>
                                    <td className="border-r border-b px-6 py-4 text-center">{data.intermediate_outcome.target || "-"} / {data.intermediate_outcome.satuan || "-"}</td>
                                    <td className="border-r border-b px-6 py-4 text-center">{data.intermediate_outcome.keterangan || "-"}</td>
                                </>
                            :
                                <>
                                    <td className="border-r border-b px-6 py-4 text-center">-</td>
                                    <td className="border-r border-b px-6 py-4 text-center">-</td>
                                    <td className="border-r border-b px-6 py-4 text-center">-</td>
                                </>
                            }
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
