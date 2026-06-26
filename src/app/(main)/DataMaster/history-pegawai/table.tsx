import Link from "next/link";
import { PegawaiResponse } from "./service";

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
                            <th className="px-4 py-3 text-left">NIP</th>
                            <th className="px-4 py-3 text-left">Nama Pegawai</th>
                            <th className="px-4 py-3 text-left">Status</th>
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

                                    <td className="px-4 py-3">
                                        {pegawai.pegawai_id}
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {pegawai.nama_pegawai}
                                    </td>

                                    <td className="px-4 py-3">
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
                                        <Link href="/DataMaster/history-pegawai/1">
                                            <button
                                                className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
                                            >
                                                Lihat Riwayat
                                            </button>
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
