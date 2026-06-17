"use client";

import jsPDF from "jspdf";
import { TablePaguTotalMatrixRenstraCetak } from "./TablePaguTotalMatrixRenstraCetak";
import { TableUrusanCetak } from "./TableUrusanCetak";

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

        doc.save(`Matrix Renstra ${nama_opd || "unknown"} Periode ${tahun_awal || "-"}-${tahun_akhir || "-"}.pdf`);
    };

    return { cetakPdfMatrixRenstra };
}
