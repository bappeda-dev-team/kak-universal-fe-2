import React from "react";
import { DasarHukum } from "../type";

interface DasarHukumComponent {
    data: DasarHukum[];
}

export const DasarHukumComponent: React.FC<DasarHukumComponent> = ({ data }) => {
    return (
        <div className="rounded-lg border border-emerald-500 p-1">
            <div className="flex justify-between px-3 text-center">
                <h1 className="font-semibold uppercase pt-2">Dasar Hukum</h1>
            </div>
            <div className="mx-2 my-3">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-emerald-500 text-white border">
                            <td className="border-r border-b px-6 py-3 w-[50px]">No</td>
                            <td className="border-r border-b px-6 py-3 min-w-[200px]">Peraturan Terkait</td>
                            <td className="border-r border-b px-6 py-3 min-w-[200px]">Uraian</td>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {data.map((data, index) => (
                            <tr key={data.id}>
                                <td className="border border-emerald-500 px-6 py-3 text-center">{index + 1}</td>
                                <td className="border border-emerald-500 px-6 py-3">{data.peraturan_terkait || "-"}</td>
                                <td className="border border-emerald-500 px-6 py-3">{data.uraian || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}