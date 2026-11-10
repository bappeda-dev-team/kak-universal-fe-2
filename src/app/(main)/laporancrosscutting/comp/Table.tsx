"use client";

import React from "react";
import { Laporan, pohonkinerjaKoordinator, indikator, target, crosscuttingDikirim, rekin } from "../type";
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

                                    // ==============================
                                    // KOORDINATOR
                                    // ==============================

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

                                    const totalRowsKoordinator = Math.max(
                                        indikatorRows.length,
                                        rekins.length,
                                        1
                                    );

                                    // ==============================
                                    // CROSSCUTTING ANGGOTA
                                    // ==============================

                                    const crosscuttingRows = (p.crosscutting_dikirim ?? []).map(
                                        (c: crosscuttingDikirim) => {

                                            const indCrRows = (c.indikator_dikirim ?? []).flatMap(
                                                (indCr: indikator) => {
                                                    const trCrs = indCr.targets?.length
                                                        ? indCr.targets
                                                        : [null];

                                                    return trCrs.map(
                                                        (tr: target | null, trIndex: number) => ({
                                                            indCr,
                                                            tr,
                                                            first: trIndex === 0
                                                        })
                                                    );
                                                }
                                            );

                                            const rekinCross = c.rencana_kinerja_dikirim ?? [];

                                            const totalRowsCr = Math.max(
                                                indCrRows.length,
                                                rekinCross.length,
                                                1
                                            );

                                            return {
                                                c,
                                                indCrRows,
                                                rekinCross,
                                                totalRowsCr
                                            };
                                        }
                                    );

                                    // Total baris seluruh crosscutting
                                    const totalRowsAnggota = crosscuttingRows.reduce(
                                        (total, cc) => total + cc.totalRowsCr,
                                        0
                                    );

                                    // Ratakan crosscutting menjadi baris tampilan
                                    const anggotaRows = crosscuttingRows.flatMap(
                                        (ccRow) =>
                                            Array.from(
                                                { length: ccRow.totalRowsCr },
                                                (_, rowIndex) => ({
                                                    ccRow,
                                                    rowIndex
                                                })
                                            )
                                    );

                                    // ==============================
                                    // TOTAL BARIS POHON
                                    // ==============================

                                    const totalRows = Math.max(
                                        totalRowsKoordinator,
                                        totalRowsAnggota,
                                        1
                                    );

                                    // ==============================
                                    // RENDER
                                    // ==============================

                                    return Array.from(
                                        { length: totalRows },
                                        (_, rowIndex) => {

                                            const indRow = indikatorRows[rowIndex];
                                            const rekin = rekins[rowIndex];

                                            const anggotaRow = anggotaRows[rowIndex];

                                            return (
                                                <tr key={`${p.pohon_kinerja.Id}-${rowIndex}`}>

                                                    <KoordinatorCells
                                                        p={p}
                                                        index={index}
                                                        rowIndex={rowIndex}
                                                        totalRows={totalRows}
                                                        indRow={indRow}
                                                        rekin={rekin}
                                                    />

                                                    <AnggotaCells
                                                        anggotaRow={anggotaRow}
                                                    />

                                                </tr>
                                            );
                                        }
                                    );
                                }
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;

type KoordinatorCellsProps = {
    p: pohonkinerjaKoordinator;
    index: number;
    rowIndex: number;
    totalRows: number;
    indRow: any;
    rekin: any;
};

function KoordinatorCells({
    p,
    index,
    rowIndex,
    totalRows,
    indRow,
    rekin
}: KoordinatorCellsProps) {
    return (
        <>
            {/* 1. No */}
            {rowIndex === 0 && (
                <td rowSpan={totalRows} className="border px-3 py-2 text-center">
                    {index + 1}
                </td>
            )}

            {/* 2. Keterangan Crosscutting */}
            {rowIndex === 0 && (
                <td rowSpan={totalRows} className="border px-3 py-2 whitespace-pre-line">
                    {p.pohon_kinerja.KeteranganCrosscutting ?? "-"}
                </td>
            )}

            {/* 3. OPD Koordinator */}
            {rowIndex === 0 && (
                <td rowSpan={totalRows} className="border px-3 py-2 whitespace-pre-line">
                    {p.pohon_kinerja.NamaOpd ?? "-"}
                </td>
            )}

            {/* 4. Pohon Kinerja */}
            {rowIndex === 0 && (
                <td rowSpan={totalRows} className="border px-3 py-2">
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
                {formatSubkegiatan(rekin)}
            </td>

            {/* 9. Pagu Anggaran */}
            <td className="border px-3 py-2 whitespace-pre-line">
                Rp. {formatRupiah(rekin?.pagu ?? 0)}
            </td>
        </>
    );
}

type AnggotaCellsProps = {
    anggotaRow: any;
};

function AnggotaCells({ anggotaRow }: AnggotaCellsProps) {
    // Tidak ada crosscutting pada baris ini
    if (!anggotaRow) {
        return (
            <>
                <td className="border px-3 py-2">-</td>
                <td className="border px-3 py-2">-</td>
                <td className="border px-3 py-2">-</td>
                <td className="border px-3 py-2">-</td>
                <td className="border px-3 py-2">-</td>
                <td className="border px-3 py-2">-</td>
                <td className="border px-3 py-2">-</td>
            </>
        );
    }

    const { ccRow, rowIndex } = anggotaRow;

    const { c, indCrRows, rekinCross, totalRowsCr } = ccRow;

    const indCrRow = indCrRows[rowIndex];
    const rekinCr = rekinCross[rowIndex];

    return (
        <>
            {/* 10. OPD Anggota */}
            {rowIndex === 0 && (
                <td rowSpan={totalRowsCr} className="border px-3 py-2 whitespace-pre-line">
                    {c.nama_opd_tujuan ?? "-"}
                </td>
            )}

            {/* 11. Pohon Kinerja OPD Anggota */}
            {rowIndex === 0 && (
                <td rowSpan={totalRowsCr} className="border px-3 py-2 whitespace-pre-line">
                    {c.nama_pohon_tujuan ?? "-"}
                </td>
            )}

            {/* 12. Indikator OPD Anggota */}
            {indCrRow ? (
                indCrRow.first && (
                    <td
                        rowSpan={indCrRow.indCr.targets?.length || 1}
                        className="border px-3 py-2 whitespace-pre-line"
                    >
                        {indCrRow.indCr.nama_indikator ?? "-"}
                    </td>
                )
            ) : (
                <td className="border px-3 py-2">-</td>
            )}

            {/* 13. Target / Satuan OPD Anggota */}
            <td className="border px-3 py-2 whitespace-pre-line">
                {indCrRow?.tr
                    ? `${indCrRow.tr.target ?? "-"} ${indCrRow.tr.satuan ?? ""}`
                    : "-"}
            </td>

            {/* 14. Nama Pelaksana / NIP OPD Anggota */}
            <td className="border px-3 py-2 whitespace-pre-line">
                {rekinCr?.nama_pegawai ?? "-"}
            </td>

            {/* 15. Sub Kegiatan OPD Anggota */}
            <td className="border px-3 py-2 whitespace-pre-line">
                {formatSubkegiatan(rekinCr)}
            </td>

            {/* 16. Pagu Anggaran OPD Anggota */}
            <td className="border px-3 py-2 whitespace-pre-line">
                Rp. {formatRupiah(rekinCr?.pagu ?? 0)}
            </td>
        </>
    );
}

const formatSubkegiatan = (r?: rekin | null) => {
    if (!r || !r.nama_sub_kegiatan || !r.kode_sub_kegiatan) return "-";

    return `${r.nama_sub_kegiatan} (${r.kode_sub_kegiatan})`;
};
