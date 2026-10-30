"use client";

import React from "react";
import { InovasiLaporan } from "../type";

interface Table {
//   Data: InovasiLaporan[] | null;
//   kode_opd: string;
//   tahun: number;
//   onSuccess: () => void;
}

function formatRupiah(angka: number) {
  if (typeof angka !== "number") {
    return String(angka); // Jika bukan angka, kembalikan sebagai string
  }
  return angka.toLocaleString("id-ID"); // 'id-ID' untuk format Indonesia
}

const Table: React.FC<Table> = ({ }) => {
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
            
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
