"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RowInput } from "jspdf-autotable";

interface IKU {
    indikator_id: string;
    sumber: string;
    asal_iku: string;
    iku_active: boolean;
    definisi_operasional: string;
    rumus_perhitungan: string;
    sumber_data: string;
    is_active: boolean;
    indikator: string;
    created_at: string;
    target: [{
        target: string,
        satuan: string,
    }];
}

export function useCetakIkuOpd(
    data: any[],
    nama_opd: string,
    tahun_awal: string,
    tahun_akhir: string,
    tahun_list: string[],
) {
    const cetakPdfIkuOpd = () => {
        if (!data) return;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.text(
            "Indikator Kinerja Utama Perangkat Daerah",
            pageWidth / 2,
            12,
            { align: "center" }
        );

        doc.setFontSize(12);
        doc.text(
            nama_opd,
            pageWidth / 2,
            20,
            { align: "center" }
        );
        doc.text(
            `Periode ${tahun_awal} - ${tahun_akhir}`,
            pageWidth / 2,
            28,
            { align: "center" }
        );

        const body: any[] = [];

        data.map((item: IKU, index: number) => {
            body.push([
                // Nomer
                index + 1,

                item.indikator || "-",
                item.definisi_operasional || "-",
                item.rumus_perhitungan || "-",
                item.sumber_data || "-",

                ...item.target.flatMap((t) => [
                    {
                        content: `${t.target || "-"}`,
                        styles: { halign: "center" }
                    },
                    {
                        content: `${t.satuan || "-"}`,
                        styles: { halign: "center" }
                    },
                ])
            ]);
        });

        const headerRow1 = [
            { content: "No", rowSpan: 2, styles: { halign: "center" } },
            { content: "Indikator Utama", rowSpan: 2, styles: { halign: "center" } },
            { content: "Definisi Operasional", rowSpan: 2, styles: { halign: "center" } },
            { content: "Rumus Perhitungan", rowSpan: 2, styles: { halign: "center" } },
            { content: "Sumber Data", rowSpan: 2, styles: { halign: "center" } },

            ...tahun_list.map((tahun) => ({
                content: tahun.toString(),
                colSpan: 2,
                styles: { halign: "center" },
            })),
        ];
        const headerRow2 = tahun_list.flatMap(() => [
            "Target",
            "Satuan",
        ]);

        autoTable(doc, {
            startY: 38,
            theme: "grid",
            head: [
                headerRow1,
                headerRow2
            ] as RowInput[],
            body,
            styles: {
                fontSize: 9,
                valign: "middle",
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            headStyles: {
                fillColor: '#10B981', // emerald
                textColor: [255, 255, 255], // putih
                fontStyle: "bold",
                overflow: "linebreak",
                halign: "center",
                lineWidth: 0.1,
                lineColor: [0, 0, 0], // hitam
            },
        });

        doc.save(`IKU OPD ${nama_opd || "unknown"} Periode ${tahun_awal || "-"}-${tahun_akhir || "-"}`);
    };

    return { cetakPdfIkuOpd };
}
