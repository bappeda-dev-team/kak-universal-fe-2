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
    WidthType,
    convertMillimetersToTwip,
} from "docx";

interface pagu {
    tahun: string;
    pagu_indikatif: number;
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

const cell = (
    children: Paragraph[],
    width: number,
    {
        alignment = AlignmentType.CENTER,
        columnSpan,
    }: {
        alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
        columnSpan?: number;
    } = {},
): TableCell =>
    new TableCell({
        children,
        width: { size: convertMillimetersToTwip(width), type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        borders: cellBorders,
        columnSpan,
    });

export function TablePaguTotalMatrixRenstraWord(tahun_list: string[], pagu: pagu[]): Table {
    const numYears = Math.max(tahun_list.length, 1);
    const exactTotal = colKode + colJenis + colIndikator + numYears * (targetPerTahun + paguPerTahun);
    const tableWidth = Math.min(exactTotal, pageUsable);
    const scale = tableWidth / exactTotal;
    const kodeWidth = colKode * scale;
    const jenisWidth = colJenis * scale;
    const indikatorWidth = colIndikator * scale;
    const targetWidth = targetPerTahun * scale;
    const paguWidth = paguPerTahun * scale;

    const row: TableRow = new TableRow({
        children: [
            cell([
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "Total Pagu OPD",
                            bold: true,
                            size: 18,
                            color: "000000",
                        }),
                    ],
                }),
            ], kodeWidth + jenisWidth + indikatorWidth, { columnSpan: 3 }),
            ...tahun_list.flatMap((tahun) => {
                const item = pagu.find((p) => p.tahun === tahun);
                return [
                    cell([new Paragraph({ children: [] })], targetWidth, {}),
                    cell([
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: `Rp.${formatRupiah(item?.pagu_indikatif || 0)}`,
                                    size: 8,
                                    color: "000000",
                                }),
                            ],
                        }),
                    ], paguWidth, {}),
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
            convertMillimetersToTwip(indikatorWidth),
            ...tahun_list.flatMap(() => [
                convertMillimetersToTwip(targetWidth),
                convertMillimetersToTwip(paguWidth),
            ]),
        ],
        rows: [row],
    });
}