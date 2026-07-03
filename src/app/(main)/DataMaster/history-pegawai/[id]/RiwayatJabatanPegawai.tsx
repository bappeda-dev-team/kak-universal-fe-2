'use client'

import { JabatanPegawaiResponse } from "../types";
import Badge from "@/components/global/Badge";

type RiwayatJabatanPegawaiProps = {
    jabatanPegawais: JabatanPegawaiResponse[]
}

export default function RiwayatJabatanPegawai({ jabatanPegawais }: RiwayatJabatanPegawaiProps) {
    return (
        <div className="rounded-lg border bg-white">
            <div className="border-b p-4">
                <h3 className="font-semibold">
                    Riwayat Jabatan
                </h3>
            </div>
            <div className="p-3">
                {jabatanPegawais.length === 0 ?
                    <EmptyTable />
                    :
                    <RiwayatJabatanTable jabatanPegawais={jabatanPegawais} />
                }
            </div>
        </div>
    );
}

function EmptyTable() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium text-gray-700">
                Belum ada riwayat jabatan
            </p>

            <p className="mt-2 text-sm text-gray-500">
                Tambahkan jabatan pertama untuk pegawai ini.
            </p>
        </div>
    );
}

function RiwayatJabatanTable({ jabatanPegawais }: { jabatanPegawais: JabatanPegawaiResponse[] }) {
    const isJabatanAktif = (jabatan: JabatanPegawaiResponse) =>
        jabatan.tmt_akhir == null;

    const getStatusLabel = (jabatan: JabatanPegawaiResponse) =>
        isJabatanAktif(jabatan) ? "Aktif" : "Selesai";

    const getStatusColor = (jabatan: JabatanPegawaiResponse) =>
        isJabatanAktif(jabatan) ? "green" : "gray";

    return (
        <table className="w-full border-colapse table-fixed">
            <thead>
                <tr className="border-b border-s border-e bg-gray-50">
                    <th className="px-4 py-3 text-left w-[4%]">No</th>
                    <th className="px-4 py-3 text-left w-[50%]">Jabatan</th>
                    <th className="px-4 py-3 text-center w-[18%]">Penugasan</th>
                    <th className="px-4 py-3 text-center w-[16%]">TMT</th>
                    <th className="px-4 py-3 text-center w-[8%]">Status</th>
                </tr>
            </thead>

            <tbody>
                {jabatanPegawais.map((jabatan, index) => (
                    <tr key={jabatan.id} className="border">
                        <td className="p-5 text-left text-gray-500">{index + 1}</td>
                        <td className="px-4 text-left text-wrap">
                            <div className="font-medium">
                                {jabatan.nama_jabatan}
                            </div>
                            <div className="text-sm text-gray-500">
                                {jabatan.nama_opd}
                            </div>
                        </td>

                        <td className="w-16 text-center">
                            {jabatan.alasan_berakhir === null ? jabatan.jenis_penugasan.label : jabatan.alasan_berakhir.label}
                        </td>

                        <td className="px-4 py-3 text-center text-sm">
                            <div>{jabatan.tmt_mulai}</div>
                            <div className="text-gray-400">↓</div>
                            <div>{jabatan.tmt_akhir ?? "Sekarang"}</div>
                        </td>

                        <td className="p-4 text-center">
                            <Badge color={getStatusColor(jabatan)}>
                                {getStatusLabel(jabatan)}
                            </Badge>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
