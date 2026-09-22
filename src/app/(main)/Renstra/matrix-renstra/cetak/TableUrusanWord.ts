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
    target_baseline?: TargetBase[];
}
interface TargetBase {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}

const pageUsable = 410;
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

const stackedParagraphs = (lines: string[], size: number): Paragraph[] =>
    lines.map(
        (line) =>
            new Paragraph({
                spacing: { after: 60 },
                children: [
                    new TextRun({
                        text: line === "" ? " " : line,
                        size,
                    }),
                ],
            }),
    );

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

    const showIndikator = jenis !== "Urusan" && jenis !== "Bidang Urusan";

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
            return tb ? `${tb.target || "-"} / ${tb.satuan || "-"}` : "";
        }
        return item.tahun === tahun ? `${item.target || "-"} / ${item.satuan || "-"}` : "";
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
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Kode", bold: true, size: 18, color })] })], kodeWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: jenis, bold: true, size: 18, color })] })], jenisWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Indikator", bold: true, size: 18, color })] })], indikatorWidth, {
                fill, color, alignment: AlignmentType.CENTER, verticalMerge: VerticalMergeType.RESTART,
            }),
            ...tahun_list.map((tahun) => cell([
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tahun.toString(), bold: true, size: 18, color })] }),
            ], targetWidth + paguWidth, {
                fill, color, alignment: AlignmentType.CENTER, columnSpan: 2,
            })),
        ],
    });

    const headerRow2: TableRow = new TableRow({
        children: [
            cell([new Paragraph("")], kodeWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
            cell([new Paragraph("")], jenisWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
            cell([new Paragraph("")], indikatorWidth, { fill, color, verticalMerge: VerticalMergeType.CONTINUE }),
            ...tahun_list.flatMap((tahun, index) => [
                cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: index === 0 ? "Realisasi/Satuan" : "Target/Satuan", bold: true, size: 12, color })] })], targetWidth, {
                    fill, color, alignment: AlignmentType.CENTER,
                }),
                cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pagu", bold: true, size: 18, color })] })], paguWidth, {
                    fill, color, alignment: AlignmentType.CENTER,
                }),
            ]),
        ],
    });

    const bodyRow: TableRow = new TableRow({
        children: [
            cell([new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.kode || "-"}`, size: 18 })] })], kodeWidth, {
                alignment: AlignmentType.CENTER,
            }),
            cell([new Paragraph({ children: [new TextRun({ text: `${data.nama || "-"}`, size: 18 })] })], jenisWidth, {}),
            cell(
                showIndikator
                    ? stackedParagraphs(indicatorItems.map((i) => `${i.indikator || "-"}`), 12)
                    : [new Paragraph({ children: [] })],
                indikatorWidth,
                {},
            ),
            ...tahun_list.flatMap((tahun) => [
                cell(
                    showIndikator
                        ? stackedParagraphs(indicatorItems.map((i) => targetFor(i, tahun)), 12)
                        : [new Paragraph({ children: [] })],
                    targetWidth,
                    {},
                ),
                cell([new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: `Rp.${formatRupiah(paguFor(tahun))}`, size: 10 })],
                })], paguWidth, { alignment: AlignmentType.CENTER }),
            ]),
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
            convertMillimetersToTwip(indikatorWidth),
            ...tahun_list.flatMap(() => [
                convertMillimetersToTwip(targetWidth),
                convertMillimetersToTwip(paguWidth),
            ]),
        ],
        rows: [headerRow1, headerRow2, bodyRow],
    });
}