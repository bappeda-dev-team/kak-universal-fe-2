import React from "react";
import { Permasalahan } from "../type";

interface PermasalahanRekinComponent {
    data: Permasalahan[];
}

export const PermasalahanRekinComponent: React.FC<PermasalahanRekinComponent> = ({ data }) => {
    return (
        <div className="rounded-lg border border-emerald-500 p-1">
            <div className="flex justify-between px-3 text-center">
                <h1 className="font-semibold uppercase pt-2">Permasalahan</h1>
            </div>
            <div className="mx-2 my-3">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-emerald-500 text-white border">
                            <td className="border-r border-b px-6 py-3 w-[50px]">No</td>
                            <td className="border-r border-b px-6 py-3 min-w-[200px]">Permasalahan</td>
                            <td className="border-r border-b px-6 py-3 min-w-[200px]">Penyebab Internal</td>
                            <td className="border-r border-b px-6 py-3 min-w-[200px]">Penyebab Eksternal</td>
                            <td className="border-r border-b px-6 py-3 w-[200px] text-center">Jenis</td>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {data.map((data, index) => (
                            <tr key={data.Id}>
                                <td className="border border-emerald-500 px-6 py-3 text-center">{index + 1}</td>
                                <td className="border border-emerald-500 px-6 py-3">{data.Permasalahan || "-"}</td>
                                <td className="border border-emerald-500 px-6 py-3">{data.PenyebabInternal || "-"}</td>
                                <td className="border border-emerald-500 px-6 py-3">{data.PenyebabEksternal || "-"}</td>
                                <td className="border border-emerald-500 px-6 py-3 text-center">{data.JenisPermasalahan || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}