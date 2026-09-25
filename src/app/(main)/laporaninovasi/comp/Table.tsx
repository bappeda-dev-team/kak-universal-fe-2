"use client";

import React, { useState } from "react";
import { InovasiLaporan } from "../type";

interface Table {
  Data: InovasiLaporan[] | null;
  kode_opd: string;
  tahun: number;
  onSuccess: () => void;
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
              Data.map((item, index) => (
                <tr key={index}>
                  <td className="border-r border-b px-6 py-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.nama_inovasi}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.jenis_inovasi}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.kebaruan}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.asal_inovasi}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.waktu_implementasi
                      ? item.waktu_implementasi.split("T")[0]
                      : "-"}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.asal_inovasi === "Internal"
                      ? item.nama_opd
                      : item.instansi}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.asal_inovasi === "Internal"
                      ? `${item.nama_nip_inovator} (${item.level})`
                      : item.inovator}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.nama_pegawai || "-"}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {item.nama_rencana_kinerja || "-"}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {/* {item.indikator || "-"} */}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {/* {item.target || "-"} */}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {/* {item.satuan || "-"} */}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {/* {item.sub_kegiatan || "-"} */}
                  </td>

                  <td className="border-r border-b px-6 py-3">
                    {/* {item.pagu_anggaran || "-"} */}
                  </td>
                </tr>
              ))
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
