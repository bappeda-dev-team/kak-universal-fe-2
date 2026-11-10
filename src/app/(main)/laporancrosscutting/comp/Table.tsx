"use client";

import React from "react";
import { Laporan, pohonkinerjaKoordinator, indikator, target } from "../type";
import { formatRupiah } from "@/components/utils/format-rupiah";

interface Table {
    Data: Laporan | null;
    kode_opd: string;
    tahun: number;
    onSuccess: () => void;
}


const Table: React.FC<Table> = ({ Data }) => {
    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-r border-b px-6 py-3 text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Keterangan Crosscutting
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                OPD Koordinator
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Pohon Kinerja
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Indikator
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[100px]">
                                Target/Satuan
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Nama Pelaksana/NIP
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Sub Kegiatan
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Pagu Anggaran
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                OPD Anggota
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Pohon Kinerja
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Indikator
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[100px]">
                                Target/Satuan
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Nama Pelaksana/NIP
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Sub Kegiatan
                            </th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">
                                Pagu Anggaran
                            </th>
                        </tr>

                        <tr className="bg-emerald-700 text-white">
                            <th className="border-r border-b px-2 py-1 text-center">1</th>
                            <th className="border-r border-b px-2 py-1 text-center">2</th>
                            <th className="border-r border-b px-2 py-1 text-center">3</th>
                            <th className="border-r border-b px-2 py-1 text-center">4</th>
                            <th className="border-r border-b px-2 py-1 text-center">5</th>
                            <th className="border-r border-b px-2 py-1 text-center">6</th>
                            <th className="border-r border-b px-2 py-1 text-center">7</th>
                            <th className="border-r border-b px-2 py-1 text-center">8</th>
                            <th className="border-r border-b px-2 py-1 text-center">9</th>
                            <th className="border-r border-b px-2 py-1 text-center">10</th>
                            <th className="border-r border-b px-2 py-1 text-center">11</th>
                            <th className="border-r border-b px-2 py-1 text-center">12</th>
                            <th className="border-r border-b px-2 py-1 text-center">13</th>
                            <th className="border-r border-b px-2 py-1 text-center">14</th>
                            <th className="border-r border-b px-2 py-1 text-center">15</th>
                            <th className="border-r border-b px-2 py-1 text-center">16</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!Data?.pohon_kinerja || Data.pohon_kinerja.length === 0 ? (
                            <tr>
                                <td colSpan={16} className="border px-4 py-3 text-center">
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        ) : (

                            (Data?.pohon_kinerja ?? []).map(
                                (p: pohonkinerjaKoordinator, index: number) => {

                                    const indikatorRows = (p.indikator ?? []).flatMap(
                                        (ind: indikator) => {
                                            const targets = ind.targets?.length
                                                ? ind.targets
                                                : [null];

                                            return targets.map(
                                                (tg: target | null, tgIndex: number) => ({
                                                    ind,
                                                    tg,
                                                    first: tgIndex === 0
                                                })
                                            );
                                        }
                                    );

                                    const rekins = p.rencana_kinerja ?? [];

                                    const totalRowspanIndikator = indikatorRows.length;
                                    const totalRowspanRekin = rekins.length;

                                    const totalRows = Math.max(
                                        totalRowspanIndikator,
                                        totalRowspanRekin,
                                        1
                                    );

                                    return Array.from(
                                        { length: totalRows },
                                        (_, rowIndex) => {

                                            const indRow = indikatorRows[rowIndex];
                                            const rekin = rekins[rowIndex];

                                            return (
                                                <tr key={`${p.pohon_kinerja.Id}-${rowIndex}`}>

                                                    {/* 1. No */}
                                                    {rowIndex === 0 && (
                                                        <td
                                                            rowSpan={totalRows}
                                                            className="border px-3 py-2 text-center"
                                                        >
                                                            {index + 1}
                                                        </td>
                                                    )}

                                                    {/* 2. Keterangan Crosscutting */}
                                                    {rowIndex === 0 && (
                                                        <td
                                                            rowSpan={totalRows}
                                                            className="border px-3 py-2 whitespace-pre-line"
                                                        >
                                                            {p.pohon_kinerja.KeteranganCrosscutting ?? "-"}
                                                        </td>
                                                    )}

                                                    {/* 3. OPD Koordinator */}
                                                    {rowIndex === 0 && (
                                                        <td
                                                            rowSpan={totalRows}
                                                            className="border px-3 py-2 whitespace-pre-line"
                                                        >
                                                            {p.pohon_kinerja.NamaOpd ?? "-"}
                                                        </td>
                                                    )}

                                                    {/* 4. Pohon Kinerja */}
                                                    {rowIndex === 0 && (
                                                        <td
                                                            rowSpan={totalRows}
                                                            className="border px-3 py-2"
                                                        >
                                                            {p.pohon_kinerja.NamaPohon ?? "-"}
                                                        </td>
                                                    )}

                                                    {/* 5. Indikator */}
                                                    {indRow ? (
                                                        indRow.first && (
                                                            <td
                                                                rowSpan={indRow.ind.targets?.length || 1}
                                                                className="border px-3 py-2 whitespace-pre-line"
                                                            >
                                                                {indRow.ind.nama_indikator ?? "-"}
                                                            </td>
                                                        )
                                                    ) : (
                                                        <td className="border px-3 py-2">-</td>
                                                    )}

                                                    {/* 6. Target / Satuan */}
                                                    <td className="border px-3 py-2 whitespace-pre-line">
                                                        {indRow?.tg
                                                            ? `${indRow.tg.target ?? "-"} ${indRow.tg.satuan ?? ""}`
                                                            : "-"}
                                                    </td>

                                                    {/* 7. Nama Pelaksana / NIP */}
                                                    <td className="border px-3 py-2 whitespace-pre-line">
                                                        {rekin?.nama_pegawai ?? "-"}
                                                    </td>

                                                    {/* 8. Sub Kegiatan */}
                                                    <td className="border px-3 py-2 whitespace-pre-line">
                                                        {rekin?.nama_sub_kegiatan ?? "-"}
                                                    </td>

                                                    {/* 9. Pagu Anggaran */}
                                                    <td className="border px-3 py-2 whitespace-pre-line">
                                                        Rp. {formatRupiah(rekin?.pagu ?? 0)}
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    );
                                }
                            )
                        )})
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;

const getRowspanIndikator = (indikator: indikator): number => {
    return Math.max(indikator.targets.length, 1);
}

const getRowspanRekin = (pohon: pohonkinerjaKoordinator): number => {
    return Math.max(pohon.rencana_kinerja.length, 1);
}

const getRowspanPohon = (pohon: pohonkinerjaKoordinator): number => {
    return pohon.indikator.reduce(
        (total, ind) => total + getRowspanIndikator(ind), 0
    ) || 1
}
