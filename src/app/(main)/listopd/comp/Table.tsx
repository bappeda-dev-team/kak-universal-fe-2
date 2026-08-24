'use client'

import React from "react";
import { DataTable, TematikFindall, Indikator } from "../type"

interface Table {
    DataTable: DataTable[];
}

export const Table: React.FC<Table> = ({ DataTable }) => {

    console.log("data table : ", DataTable);

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[20px]">No</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[200px]">Perangkat Daerah</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[300px]">Bidang Urusan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Tujuan OPD</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Strategic OPD</th>
                    <th className="border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Tactical</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Operational</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Indikator</th>
                    <th className="border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Target/Satuan</th>
                </tr>
            </thead>
            <tbody>
                {DataTable === undefined ?
                    <tr>
                        <td className="px-6 py-3 uppercase" colSpan={16}>
                            Tidak ada OPD terlibat
                        </td>
                    </tr>
                    :
                    DataTable.map((data: DataTable, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                <tr key={index}>
                                    <td rowSpan={data.childs.length ? data.childs.length + 1 : 2} className="border-r border-b border-black px-6 py-4 text-center">{index + 1}</td>
                                    <td rowSpan={data.childs.length ? data.childs.length + 1 : 2} className="border-r border-b border-black px-6 py-4 bg-yellow-200">
                                        <div className="flex flex-col items-center gap-1">
                                            <p className="font-bold">{data.nama_opd || "-"}</p>
                                            <p>{data.kode_opd || "-"}</p>
                                        </div>
                                    </td>
                                    <td rowSpan={data.childs.length ? data.childs.length + 1 : 2} className="border-r border-b border-black px-6 py-4 bg-yellow-200 italic">Bidang Urusan Dalam Pengembangan</td>
                                    <td rowSpan={data.childs.length ? data.childs.length + 1 : 2} colSpan={3} className="border-r border-b border-black px-6 py-4 bg-slate-200 italic">Tujuan OPD Dalam Pengembangan</td>
                                </tr>
                                {data.childs.length > 0 ?
                                    data.childs.map((s: TematikFindall, s_index: number) => (
                                        <tr key={s_index}>
                                            <td className="border-r border-b border-black px-6 py-4 bg-red-200">{s.tema || "pohon unknown"}</td>
                                            <td colSpan={2} className="border-r border-b border-black bg-red-200">
                                                {(s.indikator && s.indikator.length > 0) ?
                                                    s.indikator.map((i: Indikator, i_index: number) => (
                                                        <React.Fragment key={i_index}>
                                                            <p>{i.nama_indikator || ""}</p>
                                                            <p>-</p>
                                                        </React.Fragment>
                                                    ))
                                                    :
                                                    <div className="flex justify-center h-full bg-red-500">
                                                        <div className="flex-1 justify-center items-center">
                                                            -
                                                        </div>
                                                    </div>
                                                }
                                            </td>
                                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-blue-200">Tactical Dalam Pengembangan</td>
                                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-green-200">Operational Dalam Pengembangan</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={9} className="border-r border-b border-black px-6 py-4 bg-red-200">Tidak ada pohon</td>
                                    </tr>
                                }
                            </React.Fragment>
                        )
                    })
                }
            </tbody>
        </table>
    )
}