import React from "react";
import { RencanaAksi, Renaksi, Pelaksanaan, TotalPerBulan } from "../type"

interface RenaksiComponent {
    data: RencanaAksi;
}

export const RenaksiComponent: React.FC<RenaksiComponent> = ({ data }) => {
    return (
        <div className="rounded-lg border border-emerald-500 p-3">
            <div className="flex justify-between px-3 text-center">
                <h1 className="font-semibold uppercase pt-1">Rencana Aksi</h1>
            </div>
            <div className="overflow-auto mt-3 rounded-t-xl border border-emerald-500">
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td rowSpan={2} className="border-r border-b border-emerald-500 p-3 w-[50px]">No</td>
                            <td rowSpan={2} className="border-r border-b border-emerald-500 px-6 py-3 min-w-[300px]">Tahapan Kerja</td>
                            {[...Array(12)].map((_, index: number) => (
                                <td key={index} colSpan={3} className="border-r border-b border-emerald-500 px-2 py-1 w-[20px] text-center">{index + 1}</td>
                            ))}
                            <td rowSpan={2} className="border-r border-b px-6 py-3 min-w-[20px] text-center text-white bg-emerald-500">Total</td>
                        </tr>
                        <tr className="bg-emerald-500 text-white">
                            {[...Array(12)].map((_, index: number) => (
                                <td key={index} colSpan={3} className="border-r border-b px-2 py-1 text-xs w-[20px] text-center">Total</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.rencana_aksi.map((data: Renaksi, index: number) => (
                            <tr key={data.id}>
                                <td className="border-r border-b border-emerald-500 py-4 text-center">{index + 1}</td>
                                <td className="border-r border-b border-emerald-500 px-6 py-4">{data.nama_rencana_aksi || "-"}</td>
                                {/* BOBOT PELAKSANAAN */}
                                {data.pelaksanaan.map((p: Pelaksanaan, index: number) => (
                                    <td colSpan={3} key={p.id && p.id.trim() !== "" ? p.id : index} className="border-r border-b border-emerald-500 px-6 py-4 text-center">
                                        {p.bobot === 0 ? "-" : p.bobot}
                                    </td>
                                ))}
                                {/* TOTAL TAHAPAN */}
                                <td className="border-r border-b px-6 py-4 text-white bg-emerald-500 text-center">
                                    {data.jumlah_bobot}
                                </td>
                            </tr>
                        ))}
                        {/* TOTAL BULAN */}
                        <tr className="bg-emerald-500 text-white">
                            <td colSpan={2} className="border-r border-y px-6 py-1">
                                Total
                            </td>
                            {data.total_per_bulan.map((total: TotalPerBulan) => (
                                <td key={total.bulan} colSpan={3} className="border-r border-y px-6 py-1 text-center">
                                    {total.total_bobot}
                                </td>
                            ))}
                            <td className={`border-r border-y px-6 py-1 text-center ${data.total_keseluruhan === 100 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                {data.total_keseluruhan}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap gap-1">
                <h1 className="my-2">waktu yang dibutuhkan : </h1>
                <h1 className="my-2 font-bold text-emerald-500">{data.waktu_dibutuhkan || 0} Bulan</h1>
            </div>
        </div>
    )
}