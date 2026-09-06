'use client'

import React, { useMemo } from "react";
import { DataTable, TematikFindall, Indikator, BidangUrusan, TujuanOpd } from "../type"

interface Table {
    DataTable: (DataTable | TematikFindall)[];
}

// rowSpan sebuah node = jumlah leaf di bawahnya. Node tanpa child = leaf (1).
const computeRowSpan = (node: any): number => {
    if (!node.childs || node.childs.length === 0) {
        node.rowSpan = 1;
        return 1;
    }
    let total = 0;
    for (const child of node.childs) {
        total += computeRowSpan(child);
    }
    node.rowSpan = total;
    return total;
};

// Render list indikator (nama) jadi beberapa baris dalam satu cell
const IndikatorCell: React.FC<{ item?: TematikFindall }> = ({ item }) => {
    if (!item || !item.indikator || item.indikator.length === 0) return <>-</>;
    return (
        <div className="flex flex-col gap-1">
            {item.indikator.map((ind) => (
                <span key={ind.id_indikator}>{ind.nama_indikator || "-"}</span>
            ))}
        </div>
    );
};

// Render target+satuan tiap indikator jadi beberapa baris dalam satu cell
const TargetCell: React.FC<{ item?: TematikFindall }> = ({ item }) => {
    if (!item || !item.indikator || item.indikator.length === 0) return <>-</>;
    return (
        <div className="flex flex-col gap-1">
            {item.indikator.map((ind) => (
                <span key={ind.id_indikator}>
                    {ind.targets && ind.targets.length > 0
                        ? ind.targets.map((t) => `${t.target} ${t.satuan}`).join(", ")
                        : "-"}
                </span>
            ))}
        </div>
    );
};

// ---------------------------------------------------------------------
// flatten: cabang OPD (kode_opd -> BidangUrusan -> TujuanOpd -> TematikFindall x3)
// ---------------------------------------------------------------------

type FlatRow = {
    no: number;
    opd?: DataTable;
    opdRowSpan?: number;
    isRoot: "opd" | "tematik"; // tandai asal cabang untuk render Perangkat Daerah

    bu?: BidangUrusan | TematikFindall;
    buRowSpan?: number;
    buEmpty?: boolean;

    tujuan?: TujuanOpd | TematikFindall;
    tujuanRowSpan?: number;
    tujuanEmpty?: boolean;

    strategic?: TematikFindall;
    strategicRowSpan?: number;
    strategicEmpty?: boolean;

    tactical?: TematikFindall;
    tacticalRowSpan?: number;
    tacticalEmpty?: boolean;

    operational?: TematikFindall;
    operationalEmpty?: boolean;
};

function buildFlatRows(dataTable: (DataTable | TematikFindall)[]): FlatRow[] {
    const rows: FlatRow[] = [];

    dataTable.forEach((data: any, topIdx: number) => {
        const no = topIdx + 1;

        // -------- cabang OPD --------
        if ("kode_opd" in data) {
            const opd: DataTable = data;
            const opdRowSpan = computeRowSpan(opd);

            const buList: (BidangUrusan | null)[] = opd.childs?.length ? opd.childs : [null];
            buList.forEach((bu: any) => {
                if (!bu) {
                    rows.push({ no, opd, opdRowSpan, isRoot: "opd", buEmpty: true, buRowSpan: 1 });
                    return;
                }
                const buRowSpan = bu.rowSpan ?? computeRowSpan(bu);

                const tujuanList: (TujuanOpd | null)[] = bu.childs?.length ? bu.childs : [null];
                tujuanList.forEach((tj: any) => {
                    if (!tj) {
                        rows.push({ no, opd, opdRowSpan, isRoot: "opd", bu, buRowSpan, tujuanEmpty: true, tujuanRowSpan: 1 });
                        return;
                    }
                    const tujuanRowSpan = tj.rowSpan ?? computeRowSpan(tj);

                    const stList: (TematikFindall | null)[] = tj.childs?.length ? tj.childs : [null];
                    stList.forEach((st: any) => {
                        if (!st) {
                            rows.push({ no, opd, opdRowSpan, isRoot: "opd", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategicEmpty: true, strategicRowSpan: 1 });
                            return;
                        }
                        const strategicRowSpan = st.rowSpan ?? computeRowSpan(st);

                        const tcList: (TematikFindall | null)[] = st.childs?.length ? st.childs : [null];
                        tcList.forEach((tc: any) => {
                            if (!tc) {
                                rows.push({ no, opd, opdRowSpan, isRoot: "opd", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategic: st, strategicRowSpan, tacticalEmpty: true, tacticalRowSpan: 1 });
                                return;
                            }
                            const tacticalRowSpan = tc.rowSpan ?? computeRowSpan(tc);

                            const opList: (TematikFindall | null)[] = tc.childs?.length ? tc.childs : [null];
                            opList.forEach((op: any) => {
                                if (!op) {
                                    rows.push({ no, opd, opdRowSpan, isRoot: "opd", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategic: st, strategicRowSpan, tactical: tc, tacticalRowSpan, operationalEmpty: true });
                                    return;
                                }
                                rows.push({ no, opd, opdRowSpan, isRoot: "opd", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategic: st, strategicRowSpan, tactical: tc, tacticalRowSpan, operational: op });
                            });
                        });
                    });
                });
            });
            return;
        }

        // -------- cabang Tematik langsung (tanpa OPD) --------
        // ASUMSI: kedalaman node ini tetap 5 level, dipetakan langsung ke
        // kolom Bidang Urusan -> Tujuan -> Strategic -> Tactical -> Operational.
        // Sesuaikan mapping ini kalau makna levelnya berbeda.
        if ("id" in data) {
            const root: TematikFindall = data;
            const opdRowSpan = computeRowSpan(root);

            const buList: (TematikFindall | null)[] = [root]; // root sendiri = level "Bidang Urusan"
            buList.forEach((bu: any) => {
                const buRowSpan = bu.rowSpan ?? computeRowSpan(bu);

                const tujuanList: (TematikFindall | null)[] = bu.childs?.length ? bu.childs : [null];
                tujuanList.forEach((tj: any) => {
                    if (!tj) {
                        rows.push({ no, opdRowSpan, isRoot: "tematik", bu, buRowSpan, tujuanEmpty: true, tujuanRowSpan: 1 });
                        return;
                    }
                    const tujuanRowSpan = tj.rowSpan ?? computeRowSpan(tj);

                    const stList: (TematikFindall | null)[] = tj.childs?.length ? tj.childs : [null];
                    stList.forEach((st: any) => {
                        if (!st) {
                            rows.push({ no, opdRowSpan, isRoot: "tematik", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategicEmpty: true, strategicRowSpan: 1 });
                            return;
                        }
                        const strategicRowSpan = st.rowSpan ?? computeRowSpan(st);

                        const tcList: (TematikFindall | null)[] = st.childs?.length ? st.childs : [null];
                        tcList.forEach((tc: any) => {
                            if (!tc) {
                                rows.push({ no, opdRowSpan, isRoot: "tematik", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategic: st, strategicRowSpan, tacticalEmpty: true, tacticalRowSpan: 1 });
                                return;
                            }
                            const tacticalRowSpan = tc.rowSpan ?? computeRowSpan(tc);

                            const opList: (TematikFindall | null)[] = tc.childs?.length ? tc.childs : [null];
                            opList.forEach((op: any) => {
                                if (!op) {
                                    rows.push({ no, opdRowSpan, isRoot: "tematik", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategic: st, strategicRowSpan, tactical: tc, tacticalRowSpan, operationalEmpty: true });
                                    return;
                                }
                                rows.push({ no, opdRowSpan, isRoot: "tematik", bu, buRowSpan, tujuan: tj, tujuanRowSpan, strategic: st, strategicRowSpan, tactical: tc, tacticalRowSpan, operational: op });
                            });
                        });
                    });
                });
            });
        }
    });

    return rows;
}

// Tandai baris pertama tiap grup rowSpan per kolom, pakai counter "sisa".
type Marked = FlatRow & { isFirst: Record<string, boolean> };

function markFirsts(rows: FlatRow[]): Marked[] {
    const levels: { key: string; span: keyof FlatRow }[] = [
        { key: "opd", span: "opdRowSpan" },
        { key: "bu", span: "buRowSpan" },
        { key: "tujuan", span: "tujuanRowSpan" },
        { key: "strategic", span: "strategicRowSpan" },
        { key: "tactical", span: "tacticalRowSpan" },
    ];

    const remaining: Record<string, number> = {};
    const marked: Marked[] = rows.map((r) => ({ ...r, isFirst: {} as Record<string, boolean> }));

    levels.forEach(({ key, span }) => {
        remaining[key] = 0;
        marked.forEach((row) => {
            if ((remaining[key] || 0) > 0) {
                row.isFirst[key] = false;
                remaining[key] -= 1;
            } else {
                row.isFirst[key] = true;
                const s = (row[span] as number) ?? 1;
                remaining[key] = s - 1;
            }
        });
    });

    return marked;
}

export const Table: React.FC<Table> = ({ DataTable }) => {
    const rows = useMemo(() => {
        const flat = buildFlatRows(DataTable ?? []);
        return markFirsts(flat);
    }, [DataTable]);

    const td = "border-r border-b px-6 py-4 border-black";

    return (
        <table className="w-full">
            <thead className="sticky top-0 z-10">
                <tr>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[20px]">No</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[200px]">Perangkat Daerah</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[300px]">Bidang Urusan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Tujuan OPD</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Strategic OPD</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Tactical</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Operational</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Indikator</th>
                    <th className="border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Target/Satuan</th>
                </tr>
            </thead>
            <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td className="px-6 py-3 uppercase" colSpan={15}>
                            Tidak ada OPD terlibat
                        </td>
                    </tr>
                ) : (
                    rows.map((row, i) => {
                        const buName =
                            row.isRoot === "opd"
                                ? (row.bu as BidangUrusan)?.nama_bidang_urusan
                                : (row.bu as TematikFindall)?.tema;

                        const tujuanName =
                            row.isRoot === "opd"
                                ? (row.tujuan as TujuanOpd)?.nama_tujuan_opd
                                : (row.tujuan as TematikFindall)?.tema;

                        // Indikator/Target Tujuan: hanya ada kalau cabang tematik
                        // (TujuanOpd asli tidak punya field indikator)
                        const tujuanIndikatorSource = row.isRoot === "tematik" ? (row.tujuan as TematikFindall) : undefined;

                        return (
                            <tr key={i}>
                                {row.isFirst.opd && (
                                    <>
                                        <td rowSpan={row.opdRowSpan} className={`${td} text-center`}>{row.no}</td>
                                        <td rowSpan={row.opdRowSpan} className={`${td} bg-yellow-100`}>
                                            {row.isRoot === "opd" ? (
                                                <div className="flex flex-col gap-1">
                                                    <p className="font-bold">{row.opd?.nama_opd || "-"}</p>
                                                    <p>{row.opd?.kode_opd || "-"}</p>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </>
                                )}

                                {row.buEmpty ? (
                                    <td colSpan={13} className="bg-yellow-100 italic border-r border-b border-black px-6 py-4">Tidak Ada Pohon OPD</td>
                                ) : row.isFirst.bu && (
                                    <td rowSpan={row.buRowSpan} className={`${td} bg-yellow-100`}>{buName || "-"}</td>
                                )}

                                {!row.buEmpty && (row.tujuanEmpty ? (
                                    <td colSpan={12} className="bg-slate-100 italic border-r border-b border-black px-6 py-4">Tidak Ada Pohon OPD</td>
                                ) : row.isFirst.tujuan && (
                                    <>
                                        <td rowSpan={row.tujuanRowSpan} className={`${td} bg-slate-100`}>{tujuanName || "-"}</td>
                                        <td rowSpan={row.tujuanRowSpan} className={`${td} bg-slate-100`}><IndikatorCell item={tujuanIndikatorSource} /></td>
                                        <td rowSpan={row.tujuanRowSpan} className={`${td} bg-slate-100`}><TargetCell item={tujuanIndikatorSource} /></td>
                                    </>
                                ))}

                                {!row.buEmpty && !row.tujuanEmpty && (row.strategicEmpty ? (
                                    <td colSpan={9} className="bg-red-100 italic border-r border-b border-black px-6 py-4">Tidak Ada Pohon OPD</td>
                                ) : row.isFirst.strategic && (
                                    <>
                                        <td rowSpan={row.strategicRowSpan} className={`${td} bg-red-100`}>{row.strategic?.tema || "-"}</td>
                                        <td rowSpan={row.strategicRowSpan} className={`${td} bg-red-100`}><IndikatorCell item={row.strategic} /></td>
                                        <td rowSpan={row.strategicRowSpan} className={`${td} bg-red-100`}><TargetCell item={row.strategic} /></td>
                                    </>
                                ))}

                                {!row.buEmpty && !row.tujuanEmpty && !row.strategicEmpty && (row.tacticalEmpty ? (
                                    <td colSpan={6} className="bg-blue-100 italic border-r border-b border-black px-6 py-4">Tidak Ada Pohon OPD</td>
                                ) : row.isFirst.tactical && (
                                    <>
                                        <td rowSpan={row.tacticalRowSpan} className={`${td} bg-blue-100`}>{row.tactical?.tema || "-"}</td>
                                        <td rowSpan={row.tacticalRowSpan} className={`${td} bg-blue-100`}><IndikatorCell item={row.tactical} /></td>
                                        <td rowSpan={row.tacticalRowSpan} className={`${td} bg-blue-100`}><TargetCell item={row.tactical} /></td>
                                    </>
                                ))}

                                {!row.buEmpty && !row.tujuanEmpty && !row.strategicEmpty && !row.tacticalEmpty && (row.operationalEmpty ? (
                                    <td colSpan={3} className="bg-green-100 italic border-r border-b border-black px-6 py-4">Tidak Ada Pohon OPD</td>
                                ) : (
                                    <>
                                        <td className={`${td} bg-green-100`}>{row.operational?.tema || "-"}</td>
                                        <td className={`${td} bg-green-100`}><IndikatorCell item={row.operational} /></td>
                                        <td className="border-b px-6 py-4 border-black bg-green-100"><TargetCell item={row.operational} /></td>
                                    </>
                                ))}
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
};
