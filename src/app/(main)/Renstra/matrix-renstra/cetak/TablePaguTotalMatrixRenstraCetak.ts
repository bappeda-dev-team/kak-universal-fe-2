import autoTable, { RowInput } from "jspdf-autotable";
import { formatRupiah } from "@/components/utils/format-rupiah";

interface pagu {
    tahun: string;
    pagu_indikatif: number;
}

export function TablePaguTotalMatrixRenstraCetak(doc: any, tahun_list: string[], pagu: pagu[], { startY = 20 }) {

    const numYears = Math.max(tahun_list.length, 1);
    const colKode = 30;
    const colJenis = 46;
    const sisaWidth = 320 - colKode - colJenis;
    const yearWidth = sisaWidth / numYears;

    const columnStyles: any = {
        0: { cellWidth: colKode + colJenis },
    };
    tahun_list.forEach((_, i) => {
        columnStyles[i + 1] = { cellWidth: yearWidth };
    });

    const headerRow1 = [
        { content: "Total Pagu OPD", rowSpan: 2, styles: { halign: "center" } },
        ...tahun_list.map((tahun) => ({
            content: tahun.toString(),
            styles: { halign: "center" },
        })),

    ];
    const headerRow2 = pagu.flatMap((item: pagu) => [
        `Rp.${formatRupiah(item.pagu_indikatif || 0)}`
    ])

    autoTable(doc, {
        startY: startY + 6,
        head: [headerRow1, headerRow2] as RowInput[],
        theme: "grid",
        margin: { left: 5, right: 5, top: 20, bottom: 20 },
        styles: {
            fontSize: 9,
            valign: "middle",
            cellPadding: 2,
        },
        columnStyles,
        headStyles: {
            fillColor: [255, 255, 255], // putih
            textColor: [0, 0, 0], // hitam
            fontStyle: "bold",
            overflow: "linebreak",
            halign: "center",
            lineWidth: 0.5,
            lineColor: [0, 0, 0], // hitam
        },
    });

    return doc.lastAutoTable.finalY;
}