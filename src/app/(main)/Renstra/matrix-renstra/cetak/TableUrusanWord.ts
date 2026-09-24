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
const colKode = 34;
const colJenis = 58;
const colIndikator = 60;
const targetPerTahun = 30;
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

const emptyParagraph = () => new Paragraph({ children: [] });

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

    const indicatorItems: Indikator[] = indikator.length > 0
        ? indikator
        : [{
            kode_indikator: "",
            kode: data.kode,
            kode_opd: kode_opd,
            indikator: "-",
            tahun: "",
            target: "",
            satuan: "",
            target_baseline: [],
        }];

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
    const exactTotal = colKode + colJenis + colIndikator + numYears * (targetPerTahun + paguPerTahun);
    const tableWidth = Math.min(exactTotal, pageUsable);
    const scale = tableWidth / exactTotal;
    const kodeWidth = colKode * scale;
    const jenisWidth = colJenis * scale;
    const indikatorWidth = colIndikator * scale;
    const targetWidth = targetPerTahun * scale;
    const paguWidth = paguPerTahun * scale;

    const headerRow1: TableRow = new TableRow({
        children: [
            cell([textParagraph("Kode", 18, true, color)], kodeWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([textParagraph(jenis, 18, true, color)], jenisWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([textParagraph("Indikator", 18, true, color)], indikatorWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            ...tahun_list.map((tahun) => cell([textParagraph(tahun.toString(), 18, true, color)], targetWidth + paguWidth, {
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
        headerRow2Cells.push(...tahun_list.flatMap(() =>
            cell([textParagraph("Pagu", 18, true, color)], targetWidth + paguWidth, {
                fill, color, alignment: AlignmentType.CENTER, columnSpan: 2,
            }),
        ));
    } else {
        headerRow2Cells.push(...tahun_list.flatMap((tahun, index) => [
            cell([textParagraph(index === 0 ? "Realisasi/Satuan" : "Target/Satuan", 12, true, color)], targetWidth, {
                fill, color, alignment: AlignmentType.CENTER,
            }),
            cell([textParagraph("Pagu", 18, true, color)], paguWidth, {
                fill, color, alignment: AlignmentType.CENTER,
            }),
        ]));
    }

    const headerRow2: TableRow = new TableRow({ children: headerRow2Cells });

    const rows: TableRow[] = [];

    if (isUrusanLevel) {
        rows.push(new TableRow({
            children: [
                cell([textParagraph(`${data.kode || "-"}`, 18)], kodeWidth, { alignment: AlignmentType.CENTER }),
                cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 18 })] })], jenisWidth, {}),
                cell([emptyParagraph()], indikatorWidth, {}),
                ...tahun_list.flatMap((tahun) => [
                    cell([emptyParagraph()], targetWidth, {}),
                    cell([textParagraph(`Rp.${formatRupiah(paguFor(tahun))}`, 10)], paguWidth, { alignment: AlignmentType.CENTER }),
                ]),
            ],
        }));
    } else {
        rows.push(new TableRow({
            children: [
                cell([textParagraph(`${data.kode || "-"}`, 18)], kodeWidth, { alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART }),
                cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 18 })] })], jenisWidth, { verticalMerge: VerticalMergeType.RESTART }),
                cell([emptyParagraph()], indikatorWidth, {}),
                ...tahun_list.flatMap(() => [
                    cell([emptyParagraph()], targetWidth, {}),
                    cell([emptyParagraph()], paguWidth, {}),
                ]),
            ],
        }));

        indicatorItems.forEach((item, index) => {
            rows.push(new TableRow({
                children: [
                    cell([emptyParagraph()], kodeWidth, { verticalMerge: VerticalMergeType.CONTINUE }),
                    cell([emptyParagraph()], jenisWidth, { verticalMerge: VerticalMergeType.CONTINUE }),
                    cell([new Paragraph({ children: [new TextRun({ text: item.indikator || "-", size: 12 })] })], indikatorWidth, {}),
                    ...tahun_list.flatMap((tahun) => [
                        cell([textParagraph(targetFor(item, tahun), 12)], targetWidth, { alignment: AlignmentType.CENTER }),
                        index === 0
                            ? cell([textParagraph(`Rp.${formatRupiah(paguFor(tahun))}`, 10)], paguWidth, { alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART })
                            : cell([emptyParagraph()], paguWidth, { verticalMerge: VerticalMergeType.CONTINUE }),
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
            top: convertMillimetersToTwip(3),
            bottom: convertMillimetersToTwip(3),
            left: convertMillimetersToTwip(3),
            right: convertMillimetersToTwip(3),
        },
        columnWidths: [
            convertMillimetersToTwip(kodeWidth),
            convertMillimetersToTwip(jenisWidth),
            convertMillimetersToTwip(indikatorWidth),
            ...tahun_list.flatMap(() => [
                convertMillimetersToTwip(targetWidth),
                convertMillimetersToTwip(paguWidth),
            ]),
        ],
        rows: [headerRow1, headerRow2, ...rows],
    });
}