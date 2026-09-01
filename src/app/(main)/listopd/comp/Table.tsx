'use client'

import React from "react";
import { DataTable, TematikFindall, Indikator, BidangUrusan, TujuanOpd } from "../type"

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
                    DataTable.map((data: DataTable | TematikFindall, index: number) => {
                        if ("kode_opd" in data) {
                            return (
                                <React.Fragment key={index}>
                                    <tr key={index}>
                                        <td rowSpan={2} className="border-r border-b border-black px-6 py-4 text-center">{index + 1}</td>
                                        <td rowSpan={2} className="border-r border-b border-black px-6 py-4 bg-yellow-200">
                                            <div className="flex flex-col gap-1">
                                                <p className="font-bold">{data.nama_opd || "-"}</p>
                                                <p>{data.kode_opd || "-"}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    {data.childs.length > 0 ?
                                        data.childs.map((item: BidangUrusan, item_index: number) => (
                                            <tr key={item_index}>
                                                <td className="border-r border-b border-black px-6 py-4 bg-yellow-200">
                                                    {item.nama_bidang_urusan || "unknown"}
                                                </td>
                                                {item.childs.length > 0 ?
                                                    item.childs.map((tujuan: TujuanOpd, tujuan_index: number) => (
                                                        <React.Fragment key={tujuan.id_tujuan_opd || tujuan_index}>
                                                            <td className="border-r border-b border-black px-6 py-4 bg-slate-200"><p>{tujuan.nama_tujuan_opd || "tujuan unknown"}</p></td>
                                                            <td colSpan={2} className="border-r border-b border-black bg-slate-200">Dalam Pengembangan</td>
                                                            <td colSpan={3} className="border-r border-b border-black bg-red-200">
                                                                {tujuan.childs.length > 0 ?
                                                                    <div className="flex flex-col h-full">
                                                                        {tujuan.childs.map((s: TematikFindall, s_index: number) => (
                                                                            <div key={s_index}className={`${(tujuan.childs.length > 1 && s_index !== tujuan.childs.length - 1 ? "border-b border-black" : "")}`}>
                                                                                <p className={`p-2`}>{s.tema || "Strategic Unknown"}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div> 
                                                                :
                                                                    <p>Tidak ada Pohon OPD</p>
                                                                }
                                                            </td>
                                                            <td colSpan={3} className="border-r bor7der-b border-black px-6 py-4 bg-blue-200">Tactical Dalam Pengembangan</td>
                                                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-green-200">Operational Dalam Pengembangan</td>
                                                        </React.Fragment>
                                                    ))
                                                    :
                                                    <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-slate-200">Tidak Ada Pohon OPD</td>
                                                }
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={16} className="border-r border-b border-black px-6 py-4 bg-slate-200">Tidak Ada Bidang Urusan</td>
                                        </tr>
                                    }
                                </React.Fragment>
                            )
                        }
                        if ("id" in data) {
                            return (
                                <tr key={index}>
                                    <td rowSpan={2} className="border-r border-b border-black px-6 py-4 text-center">{index + 1}</td>
                                    <td colSpan={16} className="border-r border-b border-black px-6 py-4 bg-slate-200 italic">Bukan Pohon OPD</td>
                                </tr>
                            )
                        }

                    })
                }
            </tbody>
        </table>
    )
}