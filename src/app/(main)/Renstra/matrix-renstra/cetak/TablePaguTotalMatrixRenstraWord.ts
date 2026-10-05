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
const colKode = 22;
const colJenis = 33;
const colIndikator = 36;

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

    const row: TableRow = new TableRow({
        children: [
            cell([
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "Total Pagu OPD",
                            bold: true,
                            size: 12,
                            color: "000000",
                        }),
                    ],
                }),
            ], kodeWidth + jenisWidth + indikatorWidth, { columnSpan: 3 }),
            ...tahun_list.flatMap((tahun, i) => {
                const item = pagu.find((p) => p.tahun === tahun);
                return [
                    cell([new Paragraph({ children: [] })], widths[3 + 2 * i], {}),
                    cell([
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: `Rp.${formatRupiah(item?.pagu_indikatif || 0)}`,
                                    size: 12,
                                    color: "000000",
                                }),
                            ],
                        }),
                    ], widths[4 + 2 * i], {}),
                ];
            }),
        ],
    });

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
        rows: [row],
    });
}