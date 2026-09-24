"use client";

import React, { useState } from "react";
import {
  ArahKebijakan,
  SasaranOpd,
  StrategiOpd,
  TacticalOpd,
  OperasionalOpd,
  ArahKebijakanOpd,
} from "../type";
import {
  ButtonRedBorder,
  ButtonGreenBorder,
  ButtonSkyBorder,
} from "@/components/global/Button";
import { TbEye, TbEyeClosed, TbPencil, TbCirclePlus } from "react-icons/tb";

interface Table {
  // Data: ArahKebijakan[];
  // kode_opd: string;
  // tahun: number;
  // onSuccess: () => void;
}

const Table: React.FC<Table> = ({}) => {
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);

  const [DataModal, setDataModal] = useState<ArahKebijakanOpd | null>(null);
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [JenisModal, setJenisModal] = useState<"tambah" | "edit">("tambah");
  const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
  const [PokinId, setPokinId] = useState<number | null>(null);

  const toggleHide = (key: string) => {
    setHiddenItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const refresh = () => {
    window.location.reload();
  };
  const handleModalOpen = (
    jenis: "tambah" | "edit",
    data: ArahKebijakanOpd | null,
  ) => {
    if (ModalOpen) {
      setModalOpen(false);
      setJenisModal(jenis);
      setDataModal(null);
    } else {
      setModalOpen(true);
      setJenisModal(jenis);
      setDataModal(data);
    }
  };
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
            <tr>
              <td className="px-6 py-3" colSpan={30}>
                Data Kosong / Belum Ditambahkan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
