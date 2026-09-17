"use client";

import jsPDF from "jspdf";
import {
    AlignmentType,
    Document,
    Packer,
    Paragraph,
    TextRun,
    convertMillimetersToTwip,
} from "docx";
import { TablePaguTotalMatrixRenstraCetak } from "./TablePaguTotalMatrixRenstraCetak";
import { TablePaguTotalMatrixRenstraWord } from "./TablePaguTotalMatrixRenstraWord";
import { TableUrusanCetak } from "./TableUrusanCetak";
import { TableUrusanWord } from "./TableUrusanWord";

interface matrix {
    kode_opd: string
    tahun_awal: string;
    tahun_akhir: string;
    pagu_total: pagu[];
    urusan: renstra[];
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
interface Indikator {
    kode_indikator: string;
    kode: string;
    kode_opd: string;
    indikator: string;
    tahun: string;
    target: string;
    satuan: string;
}
interface Anggaran {
    tahun: string;
    pagu_indikatif: number;
}
interface pagu {
    tahun: string;
    pagu_indikatif: number;
}

export function useCetakMatrixRenstra(
    data: matrix,
    nama_opd: string,
    kode_opd: string,
    tahun_awal: string,
    tahun_akhir: string,
    tahun_list: string[],
) {
    const cetakPdfMatrixRenstra = () => {
        // if (!data) return;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.text(
            "Matrix Renstra",
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

        let y = 20;

        y += 10;

        y = TablePaguTotalMatrixRenstraCetak(doc, tahun_list, data.pagu_total, {
            startY: y,
        });

        let x = 60;

        data.urusan?.forEach((item, index) => {
            x = TableUrusanCetak(doc, tahun_list, kode_opd, "Urusan", item, item.indikator, item.anggaran, {
                startY: x,
            });

            item.bidang_urusan?.forEach((bu, buIndex) => {
                x = TableUrusanCetak(doc, tahun_list, kode_opd, "Bidang Urusan", bu, bu.indikator, bu.anggaran, {
                    startY: x,
                });
                        
                bu.program?.forEach((p, buIndex) => {
                    x = TableUrusanCetak(doc, tahun_list, kode_opd, "Program", p, p.indikator, p.anggaran, {
                        startY: x,
                    });
                            
                    p.kegiatan?.forEach((k, buIndex) => {
                        x = TableUrusanCetak(doc, tahun_list, kode_opd, "Kegiatan", k, k.indikator, k.anggaran, {
                            startY: x,
                        });
                                
                        k.subkegiatan?.forEach((sk, buIndex) => {
                            x = TableUrusanCetak(doc, tahun_list, kode_opd, "Sub Kegiatan", sk, sk.indikator, sk.anggaran, {
                                startY: x,
                            });
        
                        });
                    });
                });
            });
        });

        doc.save(`Matrix Renstra ${nama_opd || "unknown"} Periode ${tahun_awal || "-"}-${tahun_akhir || "-"}.docx`);
    };

    const cetakWordMatrixRenstra = async () => {
        // if (!data) return;

        const pageWidth = convertMillimetersToTwip(420);
        const pageHeight = convertMillimetersToTwip(297);
        const margin = convertMillimetersToTwip(5);

        const children: (Paragraph | any)[] = [];

        const title = (text: string, size: number, bold = false) =>
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text,
                        bold,
                        size,
                        color: "000000",
                    }),
                ],
                spacing: { after: convertMillimetersToTwip(2) },
            });

        children.push(title("Matrix Renstra", 28, true));
        children.push(title(nama_opd, 24, false));
        children.push(title(`Periode ${tahun_awal} - ${tahun_akhir}`, 24, false));
        children.push(new Paragraph({ spacing: { after: convertMillimetersToTwip(6) } }));

        data.urusan?.forEach((item) => {
            children.push(TableUrusanWord(tahun_list, kode_opd, "Urusan", item, item.indikator, item.anggaran));

            item.bidang_urusan?.forEach((bu) => {
                children.push(TableUrusanWord(tahun_list, kode_opd, "Bidang Urusan", bu, bu.indikator, bu.anggaran));

                bu.program?.forEach((p) => {
                    children.push(TableUrusanWord(tahun_list, kode_opd, "Program", p, p.indikator, p.anggaran));

                    p.kegiatan?.forEach((k) => {
                        children.push(TableUrusanWord(tahun_list, kode_opd, "Kegiatan", k, k.indikator, k.anggaran));

                        k.subkegiatan?.forEach((sk) => {
                            children.push(TableUrusanWord(tahun_list, kode_opd, "Sub Kegiatan", sk, sk.indikator, sk.anggaran));
                        });
                    });
                });
            });
        });

        children.push(new Paragraph({ spacing: { before: convertMillimetersToTwip(6) } }));
        children.push(TablePaguTotalMatrixRenstraWord(tahun_list, data.pagu_total));

        const doc = new Document({
            sections: [
                {
                    properties: {
                        page: {
                            size: {
                                width: pageWidth,
                                height: pageHeight,
                            },
                            margin: {
                                top: convertMillimetersToTwip(15),
                                bottom: convertMillimetersToTwip(15),
                                left: margin,
                                right: margin,
                            },
                        },
                    },
                    children,
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Matrix Renstra ${nama_opd || "unknown"} Periode ${tahun_awal || "-"}-${tahun_akhir || "-"}.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return { cetakPdfMatrixRenstra, cetakWordMatrixRenstra };
}