'use client'

import { ButtonRed, ButtonGreen } from "@/components/global/Button";
import { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";

interface Intermediate {
    id: number;
    id_pohon: number;
    sub_tema: string;
    intermediate_outcome: string;
    sub_sub_tema: Intermediate;
}

interface Intermediate {
    id: number;
    nama_pohon: string;
    indikator: string;
    target: string;
    satuan: string;
    faktor_yang_berpengaruh: string;
    data_terukur: string;
    kondisi_terukur: string;
    initial_outcome: Initial;
}
interface Initial {
    id: number;
    nama_pohon: string;
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
            "sub_tema" : "sub tema 1/investasi",
            "intermediate_outcome" : "indikator sub tema 1",
            "sub_sub_tema" : {
                "id" : 2,
                "nama_pohon" : "sub sub tema 1",
                "indikator" : "indikator sub sub tema 1",
                "target" : "target sub sub tema 1",
                "satuan" : "satuan sub sub tema 1",
                "faktor_yang_berpengaruh" : "input 1",
                "data_terukur" : "input 2",
                "kondisi_terukur" : "sasaran strategic pemda 1",
                "initial_outcome" : {
                    "indikator" : "indikator sasaran 1",
                    "target" : "target sasaran 1",
                    "satuan" : "satuan sasaran 1",
                    "keterangan" : "keterangan sasaran 1"
                }
            }
        }
    ]

    return(
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-red-400 text-white">
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Sub Tema</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Intermediate Outcome</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Sub Sub Tema</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Indikator Sub Sub Tema</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Target / Satuan</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Faktor yang berpengaruh terhadap capaian outcome/penyebab permasalahan (CSF)</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Data Terukur Terkait CSF</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[100px]">Aksi</th>
                            <th rowSpan={2} className="border-r border-b px-6 py-3 min-w-[200px]">Kondisi terukur yang di harapkan / seharusnya</th>
                            <th colSpan={3} className="border-r border-b px-6 py-3 min-w-[200px]">Initial Outcome</th>
                        </tr>
                        <tr className="bg-red-600 text-white">
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Indikator</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Target / Satuan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Keterangan</th>
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
                        {Data.map((data: Intermediate, index: number) => (
                        <tr key={data.id || index}>
                            <td className="border-r border-b px-6 py-4 text-center">{index + 1}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_tema || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.intermediate_outcome || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.nama_pohon || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.indikator || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.target || "-"} / {data.sub_sub_tema.satuan || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.faktor_yang_berpengaruh || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.data_terukur || "-"}</td>
                            <td className="border-r border-b px-6 py-4">
                                <div className="flex flex-col jutify-center items-center gap-2">
                                    <ButtonGreen className="w-full">Edit</ButtonGreen>
                                    <ButtonRed 
                                        className="w-full"
                                        onClick={() => {
                                            AlertQuestion("Hapus?", "Hapus Data Intermediate yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    
                                                }
                                            });
                                        }}
                                    >
                                        Hapus
                                    </ButtonRed>
                                </div>
                            </td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.kondisi_terukur || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.initial_outcome.indikator || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.initial_outcome.target || "-"} / {data.sub_sub_tema.initial_outcome.satuan || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.sub_sub_tema.initial_outcome.keterangan || "-"}</td>
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
