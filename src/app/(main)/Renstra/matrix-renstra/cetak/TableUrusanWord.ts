import { formatRupiah } from "@/components/utils/format-rupiah";
import {
    AlignmentType,
    BorderStyle,
    Paragraph,
    ShadingType,
    Table,
    TableCell,
    TableLayoutType,
    TableRow,
    TextRun,
    VerticalAlign,
    VerticalMergeType,
    WidthType,
    convertMillimetersToTwip,
} from "docx";

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

const pageUsable = 410;
const colKode = 34;
const colJenis = 58;
const indikatorPerTahun = 30;
const paguPerTahun = 20;

const cellBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
};

const cellWidth = (width: number) => ({ size: convertMillimetersToTwip(width), type: WidthType.DXA });

const cell = (
    children: Paragraph[],
    width: number,
    {
        fill = "FFFFFF",
        color = "000000",
        alignment = AlignmentType.LEFT,
        verticalMerge,
        columnSpan,
    }: {
        fill?: string;
        color?: string;
        alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
        verticalMerge?: (typeof VerticalMergeType)[keyof typeof VerticalMergeType];
        columnSpan?: number;
    } = {},
): TableCell =>
    new TableCell({
        children,
        width: cellWidth(width),
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill, type: ShadingType.CLEAR, color: "auto" },
        borders: cellBorders,
        verticalMerge,
        columnSpan,
    });

export function TableUrusanWord(
    tahun_list: string[],
    kode_opd: string,
    jenis: string,
    data: renstra,
    indikator: Indikator[],
    anggaran: Anggaran[],
): Table {
    const fill = jenis === "Bidang Urusan" ? "EF4444"
        : jenis === "Program" ? "3B82F6"
            : jenis === "Kegiatan" ? "15803D"
                : jenis === "Sub Kegiatan" ? "10B981"
                    : "FFFFFF";
    const color = jenis === "Urusan" ? "000000" : "FFFFFF";

    const combinedData = anggaran.map((itemAnggaran) => {
        const matchingIndikators = indikator.filter(
            (itemIndikator) => itemIndikator.tahun === itemAnggaran.tahun
        );

        return {
            ...itemAnggaran,
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

    const numYears = Math.max(tahun_list.length, 1);
    const exactTotal = colKode + colJenis + numYears * (indikatorPerTahun + paguPerTahun);
    const tableWidth = Math.min(exactTotal, pageUsable);
    const scale = tableWidth / exactTotal;
    const kodeWidth = colKode * scale;
    const jenisWidth = colJenis * scale;
    const indikatorWidth = indikatorPerTahun * scale;
    const paguWidth = paguPerTahun * scale;

    const headerRow1: TableRow = new TableRow({
        children: [
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Kode", bold: true, size: 18, color })] })], kodeWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: jenis, bold: true, size: 18, color })] })], jenisWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            ...tahun_list.map((tahun) => cell([
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tahun.toString(), bold: true, size: 18, color })] }),
            ], indikatorWidth + paguWidth, {
                fill, color, alignment: AlignmentType.CENTER, columnSpan: 2,
            })),
        ],
    });

    const headerRow2: TableRow = new TableRow({
        children: [
            cell([new Paragraph("")], kodeWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
            cell([new Paragraph("")], jenisWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
            ...tahun_list.flatMap(() => [
                cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Indikator/Target/Satuan", bold: true, size: 12, color })] })], indikatorWidth, {
                    fill, color, alignment: AlignmentType.CENTER,
                }),
                cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pagu", bold: true, size: 18, color })] })], paguWidth, {
                    fill, color, alignment: AlignmentType.CENTER,
                }),
            ]),
        ],
    });

    const showIndikator = jenis !== "Urusan" && jenis !== "Bidang Urusan";

    const bodyRow: TableRow = new TableRow({
        children: [
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.kode || "-"}`, size: 18 })] })], kodeWidth, {
                alignment: AlignmentType.CENTER,
            }),
            cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 18 })] })], jenisWidth, {}),
            ...combinedData.flatMap((t) => {
                const indikatorChildren = showIndikator && t.list_indikator?.length
                    ? t.list_indikator.flatMap((i, idx) => {
                        const paragraphs = [
                            new Paragraph({
                                spacing: { after: 60 },
                                children: [
                                    new TextRun({ text: `${i.indikator || "-"}`, size: 12 }),
                                    new TextRun({ text: "", break: 1 }),
                                    new TextRun({ text: `${i.target || "-"} / ${i.satuan || "-"}`, size: 12 }),
                                ],
                            }),
                        ];
                        if (idx < t.list_indikator.length - 1) paragraphs.push(new Paragraph({ children: [] }));
                        return paragraphs;
                    })
                    : [new Paragraph({ children: [] })];

                return [
                    cell(indikatorChildren, indikatorWidth, {}),
                    cell([new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: `Rp.${formatRupiah(t.pagu_indikatif || 0)}`, size: 10 })],
                    })], paguWidth, { alignment: AlignmentType.CENTER }),
                ];
            }),
        ],
    });

    return new Table({
        width: { size: convertMillimetersToTwip(tableWidth), type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        margins: {
            marginUnitType: WidthType.DXA,
            top: convertMillimetersToTwip(3),
            bottom: convertMillimetersToTwip(3),
            left: convertMillimetersToTwip(3),
            right: convertMillimetersToTwip(3),
        },
        columnWidths: [
            convertMillimetersToTwip(kodeWidth),
            convertMillimetersToTwip(jenisWidth),
            ...tahun_list.flatMap(() => [
                convertMillimetersToTwip(indikatorWidth),
                convertMillimetersToTwip(paguWidth),
            ]),
        ],
        rows: [headerRow1, headerRow2, bodyRow],
    });
}