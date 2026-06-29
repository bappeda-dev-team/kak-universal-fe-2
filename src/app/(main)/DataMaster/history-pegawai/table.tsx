'use client'

import Link from "next/link";
import { PegawaiResponse } from "./types";

type TableProps = {
    pegawais: PegawaiResponse[];
};

export default function Table({ pegawais }: TableProps) {
    return (
        <div className="p-5">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="px-4 py-3 text-left">No</th>
                            <th className="px-4 py-3 text-left">Nama Pegawai</th>
                            <th className="px-4 py-3 text-center">NIP</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pegawais.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-8 text-center text-gray-500"
                                >
                                    Tidak ada data pegawai
                                </td>
                            </tr>
                        ) : (
                            pegawais.map((pegawai, index) => (
                                <tr
                                    key={pegawai.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">
                                        {index + 1}
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {pegawai.nama_pegawai}
                                    </td>

                                    <td className="px-4 py-3 text-left font-small">
                                        {pegawai.nip}
                                    </td>


                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`
                                                rounded-full px-3 py-1 text-xs font-semibold
                                                ${pegawai.status_pegawai === "AKTIF"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-700"
                                                }
                                            `}
                                        >
                                            {pegawai.status_pegawai}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <Link href={`/DataMaster/history-pegawai/${pegawai.id}`}
                                            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
                                        >
                                            Lihat Riwayat
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
