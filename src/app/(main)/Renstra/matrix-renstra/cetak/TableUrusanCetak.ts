import autoTable, { RowInput } from "jspdf-autotable";
import { formatRupiah } from "@/components/utils/format-rupiah";

interface renstra {
    nama: string;
    kode: string;
    jenis: string;
    indikator: Indikator[];
    anggaran: Anggaran[];
    bidang_urusan?: renstra[];
    program?: renstra[]
    kegiatan?: renstra[]
    subkegiatan?: renstra[]
}
interface Anggaran {
    tahun: string;
    pagu_indikatif: number;
}
interface Indikator {
    kode_indikator: string;
    kode: string;
    kode_opd: string;
    indikator: string;
    tahun: string;
    target: Target[] | string;
    satuan?: string;
}
interface Target {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}

export function TableUrusanCetak(
    doc: any,
    tahun_list: string[],
    kode_opd: string,
    jenis: string,
    data: renstra,
    indikator: Indikator[],
    anggaran: Anggaran[],
    { startY = 20 }
) {

    const bg: [number, number, number] = jenis === "Bidang Urusan" ? [239, 68, 68]
        : jenis === "Program" ? [59, 130, 246]
            : jenis === "Kegiatan" ? [21, 128, 61]
                : jenis === "Sub Kegiatan" ? [16, 185, 129]
                    : [255, 255, 255];

    const text: [number, number, number] = jenis === "Urusan" ? [0, 0, 0] : [255, 255, 255];

    const isUrusanLevel = jenis === "Urusan" || jenis === "Bidang Urusan";

    const numYears = Math.max(tahun_list.length, 1);

    // Lebar kolom mengikuti tampilan table V2 (Indikator 1 kolom utk semua tahun),
    // diperlebar agar mengisi penuh lebar halaman (sejajar dengan table recap di atas)
    const margin = 5;
    const usable = doc.internal.pageSize.getWidth() - (margin + margin);
    const baseWidths = [34, 58, 60];
    tahun_list.forEach(() => baseWidths.push(30, 20));
    const totalWidth = baseWidths.reduce((a, b) => a + b, 0);
    const scale = Math.min(1, usable / totalWidth);
    const widths = baseWidths.map((w) => w * scale);
    const widthSum = widths.reduce((a, b) => a + b, 0);
    widths[widths.length - 1] += usable - widthSum;

    const columnStyles: Record<number, { cellWidth: number }> = {};
    widths.forEach((w, i) => {
        columnStyles[i] = { cellWidth: w };
    });

    const paguFor = (tahun: string): number =>
        anggaran.find((a) => a.tahun === tahun)?.pagu_indikatif || 0;

    const isV2 = indikator.some((i) => Array.isArray(i.target));

    // Layout baris per indikator: nama indikator + target/satuan per tahun
    const indicatorRows: { indikator: string; targets: Record<string, { target: string; satuan: string }> }[] = indikator.map((i) => {
        const targets: Record<string, { target: string; satuan: string }> = {};
        tahun_list.forEach((tahun) => {
            if (Array.isArray(i.target)) {
                const trg = i.target.find((t) => t.tahun === tahun);
                const hasTarget = trg && trg.target && trg.target !== "-";
                targets[tahun] = {
                    target: hasTarget ? trg.target : "-",
                    satuan: hasTarget ? (trg.satuan || "-") : "-",
                };
            } else if (i.tahun === tahun) {
                const hasTarget = i.target && i.target !== "-";
                targets[tahun] = {
                    target: hasTarget ? i.target : "-",
                    satuan: hasTarget ? (i.satuan || "-") : "-",
                };
            } else {
                targets[tahun] = { target: "-", satuan: "-" };
            }
        });
        return { indikator: i.indikator || "-", targets };
    });

    const headerRow1 = [
        { content: "Kode", rowSpan: 2, styles: { halign: "center" } },
        { content: jenis, rowSpan: 2, styles: { halign: "center" } },
        { content: "Indikator", rowSpan: 2, styles: { halign: "center" } },
        ...tahun_list.map((tahun) => ({
            content: tahun.toString(),
            colSpan: 2,
            styles: { halign: "center" },
        })),
    ];

    const headerRow2 = isUrusanLevel
        ? tahun_list.flatMap(() => [
            { content: "Pagu", colSpan: 2, styles: { halign: "center" } },
        ])
        : tahun_list.flatMap(() => [
            { content: "target/satuan", styles: { halign: "center" } },
            { content: "Pagu", styles: { halign: "center" } },
        ]);

    const body: any[] = [];

    if (isUrusanLevel) {
        body.push([
            { content: `${data.kode || "-"}`, styles: { halign: "center", valign: "middle" } },
            { content: `${data.nama || "-"}`, styles: { valign: "middle" } },
            { content: "", styles: { valign: "middle" } },
            ...tahun_list.flatMap((tahun) => [
                { content: "", styles: { valign: "middle" } },
                {
                    content: `Rp.${formatRupiah(paguFor(tahun))}`,
                    styles: { halign: "center", fontSize: 5, valign: "middle" },
                },
            ]),
        ]);
    } else {
        const totalRows = indicatorRows.length + 1;

        body.push([
            {
                content: `${data.kode || "-"}`,
                rowSpan: totalRows,
                styles: { halign: "center", valign: "middle" },
            },
            {
                content: `${data.nama || "-"}`,
                rowSpan: totalRows,
                styles: { valign: "middle" },
            },
        ]);

        indicatorRows.forEach((d, index) => {
            const cells: any[] = [
                {
                    content: d.indikator,
                    styles: { fontSize: 6, overflow: "linebreak", valign: "middle" },
                },
            ];
            tahun_list.forEach((tahun) => {
                const tt = d.targets[tahun] || { target: "-", satuan: "-" };
                const textTarget = tt.target !== "-"
                    ? `${tt.target} ${tt.satuan !== "-" ? tt.satuan : ""}`.trim()
                    : "";
                cells.push({
                    content: textTarget,
                    styles: { halign: "center", fontSize: 6, valign: "middle" },
                });
                if (index === 0) {
                    cells.push({
                        content: `Rp.${formatRupiah(paguFor(tahun))}`,
                        rowSpan: indicatorRows.length,
                        styles: { halign: "center", fontSize: 5, valign: "middle" },
                    });
                }
            });
            body.push(cells);
        });
    }

    autoTable(doc, {
        startY: startY,
        head: [headerRow1, headerRow2] as RowInput[],
        body: body,
        theme: "grid",
        margin: { left: 5, right: 5, top: 20, bottom: 20 },
        styles: {
            fontSize: 9,
            valign: "middle",
            cellPadding: 3,
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
        columnStyles,
        headStyles: {
            fillColor: bg,
            textColor: text,
            fontStyle: "bold",
            overflow: "linebreak",
            halign: "center",
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
    });

    return doc.lastAutoTable.finalY;
}