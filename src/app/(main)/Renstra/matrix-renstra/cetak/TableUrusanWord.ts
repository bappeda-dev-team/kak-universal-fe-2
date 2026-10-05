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

interface TableCellMarginOptions {
    marginUnitType?: (typeof WidthType)[keyof typeof WidthType];
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

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
    target: TargetBase[] | string;
    satuan?: string;
    target_baseline?: TargetBase[];
}
interface TargetBase {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}

const pageUsable = 320;
const colKode = 22;
const colJenis = 33;
const colIndikator = 36;

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
        margins,
    }: {
        fill?: string;
        color?: string;
        alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
        verticalMerge?: (typeof VerticalMergeType)[keyof typeof VerticalMergeType];
        columnSpan?: number;
        margins?: TableCellMarginOptions;
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
        margins,
    });

const emptyParagraph = () => new Paragraph({ children: [] });

const bodyPadding = {
    marginUnitType: WidthType.DXA,
    top: convertMillimetersToTwip(3),
    bottom: convertMillimetersToTwip(3),
    left: convertMillimetersToTwip(1),
    right: convertMillimetersToTwip(1),
};

const textParagraph = (text: string, size: number, bold = false, color = "000000"): Paragraph =>
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold, size, color })],
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

    const isUrusanLevel = jenis === "Urusan" || jenis === "Bidang Urusan";

    const indicatorItems: Indikator[] = indikator;

    const targetFor = (item: Indikator, tahun: string): string => {
        if (item.target_baseline && item.target_baseline.length > 0) {
            const tb = item.target_baseline.find((t) => t.tahun === tahun);
            if (tb && tb.target && tb.target !== "-") {
                return `${tb.target} ${tb.satuan || ""}`.trim();
            }
            return "";
        }
        if (Array.isArray(item.target)) {
            const trg = item.target.find((t) => t.tahun === tahun);
            if (trg && trg.target && trg.target !== "-") {
                return `${trg.target} ${trg.satuan || ""}`.trim();
            }
            return "";
        }
        if (item.tahun === tahun && item.target && item.target !== "-") {
            return `${item.target} ${item.satuan || ""}`.trim();
        }
        return "";
    };

    const paguFor = (tahun: string): number =>
        anggaran.find((a) => a.tahun === tahun)?.pagu_indikatif || 0;

    const numYears = Math.max(tahun_list.length, 1);
    const fixedTotal = colKode + colJenis + colIndikator;
    const yearTotal = Math.max(pageUsable - fixedTotal, 0);
    const yearWidth = yearTotal / numYears;
    const targetWidth = yearWidth * 0.4;
    const paguWidth = yearWidth - targetWidth;

    const widths: number[] = [colKode, colJenis, colIndikator];
    tahun_list.forEach(() => widths.push(targetWidth, paguWidth));
    const widthSum = widths.reduce((a, b) => a + b, 0);
    widths[widths.length - 1] += pageUsable - widthSum;
    const tableWidth = widths.reduce((a, b) => a + b, 0);

    const kodeWidth = widths[0];
    const jenisWidth = widths[1];
    const indikatorWidth = widths[2];
    const yearCellWidth = (i: number) => widths[3 + 2 * i] + widths[4 + 2 * i];

    const headerRow1: TableRow = new TableRow({
        children: [
            cell([textParagraph("Kode", 12, true, color)], kodeWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([textParagraph(jenis, 12, true, color)], jenisWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([textParagraph("Indikator", 12, true, color)], indikatorWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            ...tahun_list.map((tahun, i) => cell([textParagraph(tahun.toString(), 12, true, color)], yearCellWidth(i), {
                fill, color, alignment: AlignmentType.CENTER, columnSpan: 2,
            })),
        ],
    });

    const headerRow2Cells: TableCell[] = [
        cell([emptyParagraph()], kodeWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
        cell([emptyParagraph()], jenisWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
        cell([emptyParagraph()], indikatorWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
    ];

    if (isUrusanLevel) {
        headerRow2Cells.push(...tahun_list.map((tahun, i) =>
            cell([textParagraph("Pagu", 12, true, color)], yearCellWidth(i), {
                fill, color, alignment: AlignmentType.CENTER, columnSpan: 2,
            }),
        ));
    } else {
        headerRow2Cells.push(...tahun_list.flatMap((tahun, i) => [
            cell([textParagraph("Target/\nSatuan", 12, true, color)], widths[3 + 2 * i], {
                fill, color, alignment: AlignmentType.CENTER,
            }),
            cell([textParagraph("Pagu", 12, true, color)], widths[4 + 2 * i], {
                fill, color, alignment: AlignmentType.CENTER,
            }),
        ]));
    }

    const headerRow2: TableRow = new TableRow({ children: headerRow2Cells });

    const rows: TableRow[] = [];

    if (isUrusanLevel) {
        rows.push(new TableRow({
            children: [
                cell([textParagraph(`${data.kode || "-"}`, 12)], kodeWidth, { alignment: AlignmentType.CENTER, margins: bodyPadding }),
                cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 12 })] })], jenisWidth, { margins: bodyPadding }),
                cell([emptyParagraph()], indikatorWidth, { margins: bodyPadding }),
                ...tahun_list.flatMap((tahun, i) => [
                    cell([emptyParagraph()], widths[3 + 2 * i], { margins: bodyPadding }),
                    cell([textParagraph(`Rp.${formatRupiah(paguFor(tahun))}`, 12)], widths[4 + 2 * i], { alignment: AlignmentType.CENTER, margins: bodyPadding }),
                ]),
            ],
        }));
    } else if (!indikator.length) {
        rows.push(new TableRow({
            children: [
                cell([textParagraph(`${data.kode || "-"}`, 12)], kodeWidth, { alignment: AlignmentType.CENTER, margins: bodyPadding }),
                cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 12 })] })], jenisWidth, { margins: bodyPadding }),
                cell([emptyParagraph()], indikatorWidth, { margins: bodyPadding }),
                ...tahun_list.flatMap((tahun, i) => [
                    cell([emptyParagraph()], widths[3 + 2 * i], { margins: bodyPadding }),
                    cell([textParagraph(`Rp.${formatRupiah(paguFor(tahun))}`, 12)], widths[4 + 2 * i], { alignment: AlignmentType.CENTER, margins: bodyPadding }),
                ]),
            ],
        }));
    } else {
        indicatorItems.forEach((item, index) => {
            const isFirst = index === 0;
            rows.push(new TableRow({
                children: [
                    ...(isFirst
                        ? [
                            cell([textParagraph(`${data.kode || "-"}`, 12)], kodeWidth, { alignment: AlignmentType.CENTER, margins: bodyPadding, verticalMerge: VerticalMergeType.RESTART }),
                            cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 12 })] })], jenisWidth, { margins: bodyPadding, verticalMerge: VerticalMergeType.RESTART }),
                        ]
                        : [
                            cell([emptyParagraph()], kodeWidth, { margins: bodyPadding, verticalMerge: VerticalMergeType.CONTINUE }),
                            cell([emptyParagraph()], jenisWidth, { margins: bodyPadding, verticalMerge: VerticalMergeType.CONTINUE }),
                        ]),
                    cell([new Paragraph({ children: [new TextRun({ text: item.indikator || "-", size: 12 })] })], indikatorWidth, { margins: bodyPadding }),
                    ...tahun_list.flatMap((tahun, i) => [
                        cell([textParagraph(targetFor(item, tahun), 12)], widths[3 + 2 * i], { alignment: AlignmentType.CENTER, margins: bodyPadding }),
                        isFirst
                            ? cell([textParagraph(`Rp.${formatRupiah(paguFor(tahun))}`, 12)], widths[4 + 2 * i], { alignment: AlignmentType.CENTER, margins: bodyPadding, verticalMerge: VerticalMergeType.RESTART })
                            : cell([emptyParagraph()], widths[4 + 2 * i], { margins: bodyPadding, verticalMerge: VerticalMergeType.CONTINUE }),
                    ]),
                ],
            }));
        });
    }

    return new Table({
        width: { size: convertMillimetersToTwip(tableWidth), type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        margins: {
            marginUnitType: WidthType.DXA,
            top: convertMillimetersToTwip(1),
            bottom: convertMillimetersToTwip(1),
            left: convertMillimetersToTwip(1),
            right: convertMillimetersToTwip(1),
        },
        columnWidths: widths.map(convertMillimetersToTwip),
        rows: [headerRow1, headerRow2, ...rows],
    });
}