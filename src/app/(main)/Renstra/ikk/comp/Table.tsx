"use client";

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { OpdNull, TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";
import { useBrandingContext } from "@/context/BrandingContext";
import {
  ButtonSkyBorder,
  ButtonBlackBorder,
  ButtonGreenBorder,
  ButtonRedBorder,
} from "@/components/global/Button";
import { TbCirclePlus, TbRefresh } from "react-icons/tb";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { TbTrash, TbPencil } from "react-icons/tb";

interface Table {
  kode_opd: string;
  Tahun: {
    value: number;
    label: string;
  } | null;
}

interface IKK {
  id: number;
  kode_bidang_urusan: string;
  nama_bidang_urusan: string;
  nama_opd: string;
  tahun: number;
  jenis: "output" | string;
  indikators: Indikator[];
  keterangan: string;
  created_at: string;
  updated_at: string;
}
interface Indikator {
  indikator: string;
  targets: Target[];
}
interface Target {
  target: string;
  satuan: string;
  tahun: number;
}

const Table: React.FC<Table> = ({ kode_opd, Tahun }) => {
  const [Data, setData] = useState<IKK[]>([]);
  const [Error, setError] = useState<boolean | null>(null);

  const [Jenis, setJenis] = useState<number>(5);
  const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

  const [Loading, setLoading] = useState<boolean | null>(null);
  const token = getToken();
  const { branding } = useBrandingContext();

  const tahun = Number(Tahun?.value ?? new Date().getFullYear());

  const getTargetByYear = (targets: Target[], tahun: number) => {
    return targets.find((t) => t.tahun === tahun)?.target || "-";
  };

  useEffect(() => {
    const fetchOpd = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `${branding?.api_perencanaan}/ikk/findpokin/${Jenis}/${kode_opd}`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();
        if (result.code === 200) {
          if (result.data === null) {
            setData([]);
          } else {
            setData(result.data.ikks);
          }
        } else {
          setError(true);
          setData([]);
        }
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (kode_opd != undefined) {
      fetchOpd();
    }
  }, [branding, token, Jenis, kode_opd, FetchTrigger]);

  const refresh = () => {
    setFetchTrigger((prev) => !prev);
  };
  const handleJenis = () => {
    if (Jenis === 5) {
      setJenis(6);
    } else {
      setJenis(5);
    }
  };

  if (Loading) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <LoadingClip className="mx-5 py-5" />
      </div>
    );
  } else if (Error) {
    return (
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="text-red-500 font-bold mx-5 py-5">
          Periksa koneksi internet atau database server
        </h1>
      </div>
    );
  } else if (branding?.tahun?.value === undefined) {
    return <TahunNull />;
  } else if (
    branding?.user?.roles == "super_admin" &&
    (branding?.opd?.value === null || branding?.opd?.value === undefined)
  ) {
    return <OpdNull />;
  } else {
    return (
      <>
        <div className="flex flex-wrap items-center justify-between gap-1 px-1">
          <div className="flex items-center gap-1">
            <button
              className={`border border-sky-600 rounded-lg px-2 py-1 ${Jenis === 5 ? "bg-sky-500 text-white" : "text-sky-600"}`}
              type="button"
              onClick={handleJenis}
            >
              Outcome (tactical)
            </button>
            <button
              className={`border border-green-600 rounded-lg px-2 py-1 ${Jenis === 6 ? "bg-green-500 text-white" : "text-green-600"}`}
              type="button"
              onClick={handleJenis}
            >
              Output (operational)
            </button>
          </div>
          <div className="flex items-center gap-1">
            <ButtonBlackBorder
              className="flex items-center gap-1"
              onClick={refresh}
            >
              <TbRefresh />
              Refresh
            </ButtonBlackBorder>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="overflow-auto m-2 rounded-t-xl border w-full">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-500 text-white">
                  <th rowSpan={2} className="border-r border-b px-6 py-3">
                    No
                  </th>

                  <th rowSpan={2} className="border-r border-b px-6 py-3">
                    Bidang Urusan
                  </th>

                  <th rowSpan={2} className="border-r border-b px-6 py-3">
                    Jenis
                  </th>

                  <th rowSpan={2} className="border-r border-b px-6 py-3">
                    Indikator
                  </th>

                  <th rowSpan={2} className="border-r border-b px-6 py-3">
                    Satuan
                  </th>

                  <th className="border-r border-b px-6 py-3">
                    <div className="flex flex-col items-center">
                      <span>Realisasi</span>
                      <span>Tahun</span>
                    </div>
                  </th>

                  <th colSpan={5} className="border-r border-b px-6 py-3">
                    Target
                  </th>

                  <th rowSpan={2} className="border-b px-6 py-3">
                    Keterangan
                  </th>
                </tr>

                <tr className="bg-emerald-700 text-white">
                  <th className="border-r border-b px-6 py-2">{tahun - 1}</th>

                  <th className="border-r border-b px-6 py-2">{tahun}</th>

                  <th className="border-r border-b px-6 py-2">{tahun + 1}</th>

                  <th className="border-r border-b px-6 py-2">{tahun + 2}</th>

                  <th className="border-r border-b px-6 py-2">{tahun + 3}</th>

                  <th className="border-b px-6 py-2">{tahun + 4}</th>
                </tr>
              </thead>
              <tbody>
                {Data.length === 0 ? (
                  <tr>
                    <td className="px-6 py-3" colSpan={30}>
                      Data Kosong / Belum Ditambahkan
                    </td>
                  </tr>
                ) : (
                  Data.map((item: IKK, index: number) => (
                    <React.Fragment key={index}>
                      {item.indikators.length > 0 ? (
                        item.indikators.map((indikator, indikatorIndex) => (
                          <tr key={`${index}-${indikatorIndex}`}>
                            {indikatorIndex === 0 && (
                              <>
                                <td
                                  rowSpan={item.indikators.length}
                                  className="border border-emerald-500 px-4 py-4 text-center"
                                >
                                  {index + 1}
                                </td>

                                <td
                                  rowSpan={item.indikators.length}
                                  className="border border-emerald-500 px-6 py-4"
                                >
                                  ({item.kode_bidang_urusan}){" "}
                                  {item.nama_bidang_urusan}
                                </td>

                                <td
                                  rowSpan={item.indikators.length}
                                  className="border border-emerald-500 px-6 py-4"
                                >
                                  {item.jenis}
                                </td>
                              </>
                            )}

                            <td className="border border-emerald-500 px-6 py-4">
                              {indikator.indikator}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {indikator.targets[0]?.satuan || "-"}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {getTargetByYear(indikator.targets, tahun - 1)}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {getTargetByYear(indikator.targets, tahun)}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {getTargetByYear(indikator.targets, tahun + 1)}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {getTargetByYear(indikator.targets, tahun + 2)}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {getTargetByYear(indikator.targets, tahun + 3)}
                            </td>

                            <td className="border border-emerald-500 px-6 py-4 text-center">
                              {getTargetByYear(indikator.targets, tahun + 4)}
                            </td>

                            {indikatorIndex === 0 && (
                              <td
                                rowSpan={item.indikators.length}
                                className="border border-emerald-500 px-6 py-4"
                              >
                                {item.keterangan || "-"}
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="border border-emerald-500 px-4 py-4 text-center">
                            {index + 1}
                          </td>

                          <td className="border border-emerald-500 px-6 py-4">
                            ({item.kode_bidang_urusan}){" "}
                            {item.nama_bidang_urusan}
                          </td>

                          <td className="border border-emerald-500 px-6 py-4">
                            {item.jenis}
                          </td>

                          <td className="border border-emerald-500 px-6 py-4 bg-yellow-400">
                            Belum ada indikator
                          </td>

                          <td className="border border-emerald-500 text-center">
                            -
                          </td>

                          <td className="border border-emerald-500 text-center">
                            -
                          </td>
                          <td className="border border-emerald-500 text-center">
                            -
                          </td>
                          <td className="border border-emerald-500 text-center">
                            -
                          </td>
                          <td className="border border-emerald-500 text-center">
                            -
                          </td>
                          <td className="border border-emerald-500 text-center">
                            -
                          </td>
                          <td className="border border-emerald-500 text-center">
                            -
                          </td>

                          <td className="border border-emerald-500 px-6 py-4">
                            {item.keterangan || "-"}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

export default Table;
