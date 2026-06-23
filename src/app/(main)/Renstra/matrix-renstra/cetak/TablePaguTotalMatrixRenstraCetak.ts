import autoTable, { RowInput } from "jspdf-autotable";
import { formatRupiah } from "@/components/utils/format-rupiah";

interface pagu {
    tahun: string;
    pagu_indikatif: number;
}

export function TablePaguTotalMatrixRenstraCetak(doc: any, tahun_list: string[], pagu: pagu[], { startY = 20 }) {

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
        styles: {
            fontSize: 9,
            valign: "middle",
            cellPadding: 3,
        },
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