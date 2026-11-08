"use client";

import React from "react";
import { Laporan } from "../type";

interface Table {
  Data: Laporan | null;
  kode_opd: string;
  tahun: number;
  onSuccess: () => void;
}


const Table: React.FC<Table> = ({ Data }) => {
  return (
    <>
      <div className="overflow-auto m-2 rounded-t-xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border-r border-b px-6 py-3 text-center">No</th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Keterangan Crosscutting
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                OPD Koordinator
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Pohon Kinerja
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Indikator
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[100px]">
                Target/Satuan
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Nama Pelaksana/NIP
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Sub Kegiatan
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Pagu Anggaran
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                OPD Anggota
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Pohon Kinerja
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Indikator
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[100px]">
                Target/Satuan
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Nama Pelaksana/NIP
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Sub Kegiatan
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Pagu Anggaran
              </th>
            </tr>

            <tr className="bg-emerald-700 text-white">
              <th className="border-r border-b px-2 py-1 text-center">1</th>
              <th className="border-r border-b px-2 py-1 text-center">2</th>
              <th className="border-r border-b px-2 py-1 text-center">3</th>
              <th className="border-r border-b px-2 py-1 text-center">4</th>
              <th className="border-r border-b px-2 py-1 text-center">5</th>
              <th className="border-r border-b px-2 py-1 text-center">6</th>
              <th className="border-r border-b px-2 py-1 text-center">7</th>
              <th className="border-r border-b px-2 py-1 text-center">8</th>
              <th className="border-r border-b px-2 py-1 text-center">9</th>
              <th className="border-r border-b px-2 py-1 text-center">10</th>
              <th className="border-r border-b px-2 py-1 text-center">11</th>
              <th className="border-r border-b px-2 py-1 text-center">12</th>
              <th className="border-r border-b px-2 py-1 text-center">13</th>
              <th className="border-r border-b px-2 py-1 text-center">14</th>
              <th className="border-r border-b px-2 py-1 text-center">15</th>
              <th className="border-r border-b px-2 py-1 text-center">16</th>
            </tr>
          </thead>
          <tbody>
              {!Data?.pohon_kinerja || Data.pohon_kinerja.length === 0 ? (
                  <tr>
                      <td colSpan={16} className="border px-4 py-3 text-center">
                          Data Kosong / Belum Ditambahkan
                      </td>
                  </tr>
              ) : (
                  Data.pohon_kinerja.map((item: any, index: number) => {
                      const pohon = item.pohon_kinerja;
                      const crosscutting = item.crosscutting ?? [];
                      const crosscuttingDikirim = item.crosscutting_dikirim ?? [];
                      const indikator = item.indikator ?? [];
                      const pelaksana = item.pelaksana ?? [];
                      const rekin = item.rencana_kinerja ?? [];

                      // Kolom 2 dan 10 menggunakan crosscutting yang dikirim.
                      // Kolom 3 menggunakan OPD asal dari crosscutting masuk.
                      const keteranganList = crosscuttingDikirim.length > 0
                          ? crosscuttingDikirim
                          : crosscutting;

                      const opdAsalList = crosscutting.length > 0
                          ? crosscutting
                          : crosscuttingDikirim;

                      const opdTujuanList = crosscuttingDikirim;

                      const indikatorText = indikator.length > 0
                          ? indikator
                              .map((ind: any) => ind.nama_indikator || "-")
                              .join("\n")
                          : "-";

                      const targetText = indikator.length > 0
                          ? indikator
                              .map((ind: any) => {
                                  const targets = ind.targets ?? [];

                                  if (targets.length === 0) return "-";

                                  return targets
                                      .map((target: any) =>
                                          `${target.target || "-"} ${target.satuan || ""}`.trim()
                                      )
                                      .join(", ");
                              })
                              .join("\n")
                          : "-";

                      const indikatorDikirim = crosscuttingDikirim.flatMap(
                          (c: any) => c.indikator_dikirim ?? []
                      );

                      const pelaksanaDikirim = crosscuttingDikirim.flatMap(
                          (c: any) => c.pelaksana_dikirim ?? []
                      );

                      const rekinDikirim = crosscuttingDikirim.flatMap(
                          (c: any) => c.rencana_kinerja_dikirim ?? []
                      );

                      const indikatorAnggotaText = indikatorDikirim.length > 0
                        ? indikatorDikirim
                            .map((ind: any) => ind.nama_indikator || "-")
                            .join("\n")
                        : "-";

                      const targetAnggotaText = indikatorDikirim.length > 0
                          ? indikatorDikirim
                              .map((ind: any) => {
                                  const targets = ind.targets ?? [];

                                  if (targets.length === 0) return "-";

                                  return targets
                                      .map((target: any) =>
                                          `${target.target || "-"} ${target.satuan || ""}`.trim()
                                      )
                                      .join(", ");
                              })
                              .join("\n")
                          : "-";
                      const pelaksanaText = pelaksana.length > 0
                          ? pelaksana
                              .map((p: any) =>
                                  `${p.nama_pegawai || "-"}${p.nip ? ` / ${p.nip}` : ""}`
                              )
                              .join("\n")
                          : "-";

                      const pelaksanaDikirimText = pelaksana.length > 0
                          ? pelaksanaDikirim
                              .map((p: any) =>
                                  `${p.nama_pegawai || "-"}${p.nip ? ` / ${p.nip}` : ""}`
                              )
                              .join("\n")
                          : "-";
                          
                      const PegawaiText = rekin.length > 0
                          ? rekin
                              .map((p: any) =>
                                  `${p.nama_pegawai || "-"}`
                              )
                              .join("\n")
                          : "-";

                      const SubKegiatanText = rekin.length > 0
                          ? rekin
                              .map((p: any) =>
                                  `${p.nama_sub_kegiatan || "-"}`
                              )
                              .join("\n")
                          : "-";

                      const AnggaranText = rekin.length > 0
                          ? rekin
                              .map((p: any) =>
                                  `${p.pagu || "-"}`
                              )
                              .join("\n")
                          : "-";

                      const PegawaiDikirimText = rekinDikirim.length > 0
                          ? rekinDikirim
                              .map((p: any) =>
                                  `${p.nama_pegawai || "-"}`
                              )
                              .join("\n")
                          : "-";
                      const SubKegiatanDikirimText = rekinDikirim.length > 0
                          ? rekinDikirim
                              .map((p: any) =>
                                  `${p.nama_sub_kegiatan || "-"}`
                              )
                              .join("\n")
                          : "-";
                      const AnggaranDikirimText = rekinDikirim.length > 0
                          ? rekinDikirim
                              .map((p: any) =>
                                  `${p.pagu || "-"}`
                              )
                              .join("\n")
                          : "-";
                          

                      return (
                          <tr key={pohon.Id}>
                              {/* 1. No */}
                              <td className="border px-3 py-2 text-center">
                                  {index + 1}
                              </td>

                              {/* 2. Keterangan Crosscutting */}
                              <td className="border px-3 py-2 whitespace-pre-line">
                                  {keteranganList.length > 0
                                      ? keteranganList
                                          .map((c: any) => c.keterangan_crosscutting || "-")
                                          .join("\n")
                                      : "-"}
                              </td>

                              {/* 3. OPD Koordinator: nama_opd_asal */}
                              <td className="border px-3 py-2 whitespace-pre-line">
                                  {pohon.NamaOpd || "-"}
                              </td>

                              {/* 4. Pohon Kinerja */}
                              <td className="border px-3 py-2">
                                  {pohon.NamaPohon || "-"}
                              </td>

                              {/* 5. Indikator */}
                              <td className="border px-3 py-2 whitespace-pre-line">
                                  {indikatorText}
                              </td>

                              {/* 6. Target / Satuan */}
                              <td className="border px-3 py-2 whitespace-pre-line">
                                  {targetText}
                              </td>

                              {/* 7. Nama Pelaksana / NIP */}
                              <td className="border px-3 py-2 whitespace-pre-line">
                                  {PegawaiText}
                              </td>

                              {/* 8. Sub Kegiatan */}
                              <td className="border px-3 py-2">
                                  {SubKegiatanText}
                              </td>

                              {/* 9. Pagu Anggaran */}
                              <td className="border px-3 py-2 text-right">
                                  {AnggaranText}
                              </td>

                              {/* 10. OPD Anggota: nama_opd_tujuan */}
                              <td className="border px-3 py-2 whitespace-pre-line">
                                  {opdTujuanList.length > 0
                                      ? opdTujuanList
                                          .map((c: any) => c.nama_opd_tujuan || "-")
                                          .join("\n")
                                      : "-"}
                              </td>

                              {/* 11. Pohon Kinerja OPD Anggota */}
                              <td className="border px-3 py-2">
                                  {opdTujuanList.length > 0
                                      ? opdTujuanList
                                          .map((c: any) => c.nama_pohon_tujuan || "-")
                                          .join("\n")
                                      : "-"}
                              </td>

                              {/* 12. Indikator OPD Anggota */}
                              <td className="border px-3 py-2">
                                  {indikatorAnggotaText}
                              </td>

                              {/* 13. Target / Satuan OPD Anggota */}
                              <td className="border px-3 py-2">
                                  {targetAnggotaText}
                              </td>

                              {/* 14. Nama Pelaksana / NIP OPD Anggota */}
                              <td className="border px-3 py-2">
                                  {PegawaiDikirimText}
                              </td>

                              {/* 15. Sub Kegiatan OPD Anggota */}
                              <td className="border px-3 py-2">
                                  {SubKegiatanDikirimText}
                              </td>

                              {/* 16. Pagu Anggaran OPD Anggota */}
                              <td className="border px-3 py-2">
                                  {AnggaranDikirimText}
                              </td>
                          </tr>
                      );
                  })
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
