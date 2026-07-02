import React from "react";
import { GambaranUmum } from "../type";

interface GambaranUmumComponent {
    data: GambaranUmum[];
}

export const GambaranUmumComponent: React.FC<GambaranUmumComponent> = ({ data }) => {
    return (
        <div className="rounded-lg border border-emerald-500 p-1">
            <div className="flex justify-between px-3 text-center">
                <h1 className="font-semibold uppercase pt-2">Gambaran Umum</h1>
            </div>
            <div className="mx-2 my-3">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-emerald-500 text-white border">
                            <td className="border-r border-b px-6 py-3 w-[50px]">No</td>
                            <td className="border-r border-b px-6 py-3 text-center">Gambaran Umum</td>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {data.map((data, index) => (
                            <tr key={data.id}>
                                <td className="border border-emerald-500 px-6 py-3 text-center">{index + 1}</td>
                                <td className="border border-emerald-500 px-6 py-3">{data.gambaran_umum || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}