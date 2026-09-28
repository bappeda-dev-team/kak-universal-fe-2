"use client";

import React from "react";
import { InovasiLaporan } from "../type";

interface Table {
  Data: InovasiLaporan[] | null;
  kode_opd: string;
  tahun: number;
  onSuccess: () => void;
}

function formatRupiah(angka: number) {
  if (typeof angka !== "number") {
    return String(angka); // Jika bukan angka, kembalikan sebagai string
  }
  return angka.toLocaleString("id-ID"); // 'id-ID' untuk format Indonesia
}

const Table: React.FC<Table> = ({ Data, kode_opd, tahun, onSuccess }) => {
  return (
    <>
      <div className="overflow-auto m-2 rounded-t-xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border-r border-b px-6 py-3 text-center">No</th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Nama Inovasi
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Jenis Inovasi
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Kebaruan
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Asal Inovasi
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Waktu Implementasi
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Nama Lembaga/Instansi
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Inovator
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Nama Pengusul
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Rencana Kinerja
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Indikator
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Target
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Satuan
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
            </tr>
          </thead>

          <tbody>
            {Data && Data.length > 0 ? (
              Data.map((item, index) => {
                /*
                 * ============================================================
                 * TOTAL ROW UNTUK SATU ITEM
                 * ============================================================
                 */
                const totalRows =
                  item.indikator?.reduce(
                    (total, indikator) =>
                      total + Math.max(indikator.targets?.length || 0, 1),
                    0,
                  ) || 1;

                /*
                 * ============================================================
                 * CEK REKIN PERTAMA
                 * Rencana Kinerja, Sub Kegiatan, dan Pagu hanya ditulis
                 * sekali apabila rencana_kinerja_id sama.
                 * ============================================================
                 */
                const isFirstRekin =
                  Data.findIndex(
                    (data) =>
                      data.rencana_kinerja_id === item.rencana_kinerja_id,
                  ) === index;

                /*
                 * ============================================================
                 * SEMUA ITEM DENGAN REKIN YANG SAMA
                 * ============================================================
                 */
                const rekinItems = Data.filter(
                  (data) => data.rencana_kinerja_id === item.rencana_kinerja_id,
                );

                /*
                 * ============================================================
                 * TOTAL ROW UNTUK SATU REKIN
                 * ============================================================
                 */
                const totalRekinRows = rekinItems.reduce(
                  (total, data) =>
                    total +
                    (data.indikator?.reduce(
                      (totalIndikator, indikator) =>
                        totalIndikator +
                        Math.max(indikator.targets?.length || 0, 1),
                      0,
                    ) || 1),
                  0,
                );

                /*
                 * ============================================================
                 * CARI INDIKATOR YANG SAMA DI DALAM REKIN YANG SAMA
                 *
                 * id_indikator berbeda  -> tetap tampil
                 * id_indikator sama      -> dianggap indikator yang sama
                 * ============================================================
                 */
                const indikatorSemua = rekinItems.flatMap(
                  (data) => data.indikator || [],
                );

                const indikatorUnik = indikatorSemua.filter(
                  (indikator, indikatorIndex, array) =>
                    array.findIndex(
                      (i) => i.id_indikator === indikator.id_indikator,
                    ) === indikatorIndex,
                );

                return (
                  <React.Fragment key={index}>
                    {item.indikator && item.indikator.length > 0 ? (
                      item.indikator.flatMap((indikator, indikatorIndex) => {
                        /*
                         * ======================================================
                         * CEK APAKAH INDIKATOR INI SUDAH PERNAH MUNCUL
                         * DI ITEM SEBELUMNYA DENGAN REKIN YANG SAMA
                         * ======================================================
                         */
                        const indikatorSudahMunculSebelumnya = rekinItems
                          .slice(0, rekinItems.indexOf(item))
                          .some((data) =>
                            data.indikator?.some(
                              (i) => i.id_indikator === indikator.id_indikator,
                            ),
                          );

                        /*
                         * ======================================================
                         * TARGET
                         * ======================================================
                         */
                        const targets =
                          indikator.targets?.length > 0
                            ? indikator.targets
                            : [
                                {
                                  id_target: "",
                                  target: "",
                                  satuan: "",
                                },
                              ];

                        return targets.map((target, targetIndex) => {
                          /*
                           * Indikator hanya ditulis pada kemunculan pertama.
                           *
                           * Kalau indikator berbeda:
                           *     A -> tampil
                           *     B -> tampil
                           *
                           * Kalau indikator sama:
                           *     A -> tampil
                           *     A -> tidak ditulis lagi
                           */
                          const tampilkanIndikator =
                            targetIndex === 0 &&
                            !indikatorSudahMunculSebelumnya;

                          /*
                           * Untuk indikator yang sudah pernah muncul,
                           * jangan tulis ulang indikatornya.
                           */
                          return (
                            <tr
                              key={`${index}-${indikatorIndex}-${targetIndex}`}
                            >
                              {/* ==================================================
                                  NO
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3 text-center"
                                >
                                  {index + 1}
                                </td>
                              )}

                              {/* ==================================================
                                  NAMA INOVASI
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.nama_inovasi}
                                </td>
                              )}

                              {/* ==================================================
                                  JENIS INOVASI
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.jenis_inovasi}
                                </td>
                              )}

                              {/* ==================================================
                                  KEBARUAN
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.kebaruan}
                                </td>
                              )}

                              {/* ==================================================
                                  ASAL INOVASI
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.asal_inovasi}
                                </td>
                              )}

                              {/* ==================================================
                                  WAKTU IMPLEMENTASI
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.waktu_implementasi
                                    ? item.waktu_implementasi.split("T")[0]
                                    : "-"}
                                </td>
                              )}

                              {/* ==================================================
                                  INSTANSI
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.asal_inovasi === "Internal"
                                    ? item.nama_opd
                                    : item.instansi}
                                </td>
                              )}

                              {/* ==================================================
                                  INOVATOR
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.asal_inovasi === "Internal"
                                    ? `${item.nama_nip_inovator} (${item.level})`
                                    : item.inovator}
                                </td>
                              )}

                              {/* ==================================================
                                  NAMA PENGUSUL
                                  ================================================== */}
                              {indikatorIndex === 0 && targetIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {item.nama_pegawai || "-"}
                                </td>
                              )}

                              {/* ==================================================
                                  RENCANA KINERJA
                                  ================================================== */}
                              {isFirstRekin &&
                                indikatorIndex === 0 &&
                                targetIndex === 0 && (
                                  <td
                                    rowSpan={totalRekinRows}
                                    className="border border-emerald-500 px-6 py-3"
                                  >
                                    {item.nama_rencana_kinerja || "-"}
                                  </td>
                                )}

                              {/* Indikator */}
                              {!indikatorSudahMunculSebelumnya && (
                                <td
                                  rowSpan={rekinItems.reduce((total, data) => {
                                    const indikatorYangSama =
                                      data.indikator?.find(
                                        (i) =>
                                          i.id_indikator ===
                                          indikator.id_indikator,
                                      );

                                    return (
                                      total +
                                      (indikatorYangSama?.targets?.length
                                        ? indikatorYangSama.targets.length
                                        : 1)
                                    );
                                  }, 0)}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {indikator.nama_indikator}
                                </td>
                              )}

                              {/* Target */}
                              {!indikatorSudahMunculSebelumnya && (
                                <td
                                  rowSpan={rekinItems.reduce((total, data) => {
                                    const indikatorYangSama =
                                      data.indikator?.find(
                                        (i) =>
                                          i.id_indikator ===
                                          indikator.id_indikator,
                                      );

                                    return (
                                      total +
                                      (indikatorYangSama?.targets?.length
                                        ? indikatorYangSama.targets.length
                                        : 1)
                                    );
                                  }, 0)}
                                  className="border border-emerald-500 px-6 py-3"
                                >
                                  {target.target || "-"}
                                </td>
                              )}

                              {/* Satuan */}
                              {!indikatorSudahMunculSebelumnya && (
                                <td
                                  rowSpan={rekinItems.reduce((total, data) => {
                                    const indikatorYangSama =
                                      data.indikator?.find(
                                        (i) =>
                                          i.id_indikator ===
                                          indikator.id_indikator,
                                      );

                                    return (
                                      total +
                                      (indikatorYangSama?.targets?.length
                                        ? indikatorYangSama.targets.length
                                        : 1)
                                    );
                                  }, 0)}
                                  className="border border-emerald-500 px-6 py-3 text-center"
                                >
                                  {target.satuan || "-"}
                                </td>
                              )}

                              {/* ==================================================
                                  SUB KEGIATAN
                                  ================================================== */}
                              {isFirstRekin &&
                                indikatorIndex === 0 &&
                                targetIndex === 0 && (
                                  <td
                                    rowSpan={totalRekinRows}
                                    className={`border border-emerald-500 px-6 py-3 ${
                                      !item.nama_subkegiatan
                                        ? "bg-red-500 text-white font-semibold"
                                        : ""
                                    }`}
                                  >
                                    {item.nama_subkegiatan ||
                                      "Sub kegiatan belum di tambahkan"}
                                  </td>
                                )}

                              {/* ==================================================
                                  PAGU ANGGARAN
                                  ================================================== */}
                              {isFirstRekin &&
                                indikatorIndex === 0 &&
                                targetIndex === 0 && (
                                  <td
                                    rowSpan={totalRekinRows}
                                    className="border border-emerald-500 px-6 py-3"
                                  >
                                    {item.pagu_anggaran
                                      ? `Rp.${formatRupiah(item.pagu_anggaran)}`
                                      : "Rp. 0"}
                                  </td>
                                )}
                            </tr>
                          );
                        });
                      })
                    ) : (
                      <tr>
                        <td className="border border-emerald-500 px-6 py-3 text-center">
                          {index + 1}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.nama_inovasi}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.jenis_inovasi}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.kebaruan}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.asal_inovasi}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.waktu_implementasi
                            ? item.waktu_implementasi.split("T")[0]
                            : "-"}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.asal_inovasi === "Internal"
                            ? item.nama_opd
                            : item.instansi}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.asal_inovasi === "Internal"
                            ? `${item.nama_nip_inovator} (${item.level})`
                            : item.inovator}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.nama_pegawai || "-"}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.nama_rencana_kinerja || "-"}
                        </td>

                        <td
                          colSpan={3}
                          className="border border-emerald-500 bg-yellow-400 px-6 py-3 text-center font-semibold"
                        >
                          Indikator belum ditambahkan
                        </td>

                        <td
                          className={`border border-emerald-500 px-6 py-3 ${
                            !item.nama_subkegiatan
                              ? "bg-red-500 text-white font-semibold"
                              : ""
                          }`}
                        >
                          {item.nama_subkegiatan ||
                            "Sub kegiatan belum di tambahkan"}
                        </td>

                        <td className="border border-emerald-500 px-6 py-3">
                          {item.pagu_anggaran
                            ? `Rp.${formatRupiah(item.pagu_anggaran)}`
                            : "Rp. 0"}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td className="px-6 py-3" colSpan={30}>
                  Data Kosong / Belum Ditambahkan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
