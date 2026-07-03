import { SubKegiatan } from "../type"
import React from "react";

interface SubKegiatanComponent {
    data: SubKegiatan;
}

export const SubKegiatanComponent: React.FC<SubKegiatanComponent> = ({ data }) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-emerald-500 text-white border border-emerald-500">
                    <th className="border-r border-b px-6 py-3">Kode Sub Kegiatan</th>
                    <th className="border-r border-b px-6 py-3">Nama Sub Kegiatan</th>
                </tr>
            </thead>
            <tbody className='border border-emerald-500'>
                <tr>
                    <td className="px-2 py-2 border border-emerald-500 text-center">{data?.kode_subkegiatan || "-"}</td>
                    <td className="px-6 py-2 border border-emerald-500">{data?.nama_sub_kegiatan || "-"}</td>
                </tr>
            </tbody>
        </table>
    )
}