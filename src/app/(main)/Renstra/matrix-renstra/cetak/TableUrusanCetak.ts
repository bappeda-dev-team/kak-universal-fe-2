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

    const combinedData = anggaran.map((itemAnggaran) => {
        // Ambil SEMUA indikator yang tahunnya sama
        const matchingIndikators = indikator.filter(
            (itemIndikator) => itemIndikator.tahun === itemAnggaran.tahun
        );

        return {
            ...itemAnggaran,
            // Simpan sebagai array di dalam objek anggaran
            list_indikator: matchingIndikators.length > 0 ? matchingIndikators : [{
                kode_indikator: "",
                indikator: "-",
                target: "",
                satuan: "",
                kode: data.kode,
                kode_opd: kode_opd,
                tahun: "",
            }]
        };
    });

    const headerRow1 = [
        { content: "Kode", rowSpan: 2, styles: { halign: "center" } },
        { content: jenis, rowSpan: 2, styles: { halign: "center" } },
        ...tahun_list.map((tahun) => ({
            content: tahun.toString(),
            colSpan: 2,
            styles: { halign: "center" },
        })),

    ];
    const headerRow2 = tahun_list.flatMap(() => [
        { content: "Indikator/Target/Satuan", styles: { halign: "center", fontSize: 6 } },
        { content: "Pagu", styles: { halign: "center" } },
    ])

    const body: any[] = [];
    const showIndikator = jenis !== "Urusan" && jenis !== "Bidang Urusan";

    body.push([
        { content: `${data.kode || "-"}`, styles: { halign: "center" } },
        { content: `${data.nama || "-"}` },
        ...combinedData.flatMap((t) => [
            {
                content: showIndikator
                    ? t.list_indikator
                        ?.map((i) =>
                            `${i.indikator || "-"}\n\n${i.target || "-"} / ${i.satuan || "-"}`
                        )
                        .join("\n\n") || "-"
                    : "",
                styles: {
                    fontSize: 6,
                    overflow: "linebreak",
                },
            },
            {
                content: `Rp.${formatRupiah(t.pagu_indikatif || 0)}`,
                styles: { halign: "center", fontSize: 5 }
            },
        ])
    ]);

    autoTable(doc, {
        startY: startY,
        head: [headerRow1, headerRow2] as RowInput[],
        body: body,
        theme: "grid",
        styles: {
            fontSize: 9,
            valign: "middle",
            cellPadding: 3,
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
        columnStyles: {
            0: { cellWidth: 34 },
            1: { cellWidth: 58 },
            2: { cellWidth: 30 },
            3: { cellWidth: 20 },
            4: { cellWidth: 30 },
            5: { cellWidth: 20 },
            6: { cellWidth: 30 },
            7: { cellWidth: 20 },
            8: { cellWidth: 30 },
            9: { cellWidth: 20 },
            10: { cellWidth: 30 },
            11: { cellWidth: 20 },
            12: { cellWidth: 30 },
            13: { cellWidth: 20 },
        },
        headStyles: {
            fillColor: bg,
            textColor: text,
            fontStyle: "bold",
            overflow: "linebreak",
            halign: "center",
            lineWidth: 0.2,
            lineColor: [0, 0, 0], // hitam
        },
    });

    return doc.lastAutoTable.finalY;
}