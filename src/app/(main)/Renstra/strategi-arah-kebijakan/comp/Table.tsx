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
import { ModalIkk } from "./ModalIkk";
import { TbEye, TbEyeClosed, TbPencil, TbCirclePlus } from "react-icons/tb";

interface Table {
  Data: ArahKebijakan[];
  kode_opd: string;
  tahun: number;
  onSuccess: () => void;
}

const Table: React.FC<Table> = ({ Data, kode_opd, tahun, onSuccess }) => {
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
                Tujuan OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Sasaran OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Strategic OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Tactical OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Operasional OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Arah Kebijakan
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
              Data.map((item: ArahKebijakan, index: number) => {
                const sasaranList =
                  item.sasaran_opds && item.sasaran_opds.length > 0
                    ? item.sasaran_opds
                    : [null];

                const getStrategiRows = (st: StrategiOpd) => {
                  if (!st.tactical_opds || st.tactical_opds.length === 0) {
                    return 1;
                  }

                  return st.tactical_opds.reduce((total, tactical) => {
                    return (
                      total +
                      Math.max(tactical.operasional_opds?.length || 0, 1)
                    );
                  }, 0);
                };

                const getSasaranRows = (s: SasaranOpd) => {
                  if (!s.strategi_opds || s.strategi_opds.length === 0) {
                    return 1;
                  }

                  return s.strategi_opds.reduce((total, st) => {
                    return total + getStrategiRows(st);
                  }, 0);
                };

                const totalRows = sasaranList.reduce((total, sasaran) => {
                  if (!sasaran) {
                    return total + 1;
                  }

                  return total + getSasaranRows(sasaran);
                }, 0);

                let isFirstTujuanRow = true;

                return (
                  <React.Fragment key={index}>
                    {sasaranList.map(
                      (s: SasaranOpd | null, s_index: number) => {
                        if (!s) {
                          return (
                            <tr key={`${index}-${s_index}`}>
                              <td className="border-x border-b border-emerald-500 py-4 px-3 text-center">
                                {index + 1}
                              </td>

                              <td className="border-r border-b border-emerald-500 px-6 py-4 font-semibold">
                                {item.tujuan_opd || "-"}
                              </td>

                              <td
                                colSpan={5}
                                className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                              >
                                Sasaran OPD belum dibuat
                              </td>
                            </tr>
                          );
                        }

                        const strategiList =
                          s.strategi_opds && s.strategi_opds.length > 0
                            ? s.strategi_opds
                            : [null];

                        const sasaranRows = getSasaranRows(s);

                        let isFirstSasaranRow = true;

                        return strategiList.flatMap(
                          (st: StrategiOpd | null, st_index: number) => {
                            /*
                             * STRATEGI BELUM ADA
                             */
                            if (!st) {
                              const showTujuan = isFirstTujuanRow;
                              isFirstTujuanRow = false;

                              return [
                                <tr key={`${index}-${s_index}-${st_index}`}>
                                  {showTujuan && (
                                    <>
                                      <td
                                        rowSpan={totalRows}
                                        className="border-x border-b border-emerald-500 py-4 px-3 text-center"
                                      >
                                        {index + 1}
                                      </td>

                                      <td
                                        rowSpan={totalRows}
                                        className="border-r border-b border-emerald-500 px-6 py-4 font-semibold"
                                      >
                                        {item.tujuan_opd || "-"}
                                      </td>
                                    </>
                                  )}

                                  {isFirstSasaranRow && (
                                    <td
                                      rowSpan={sasaranRows}
                                      className="border-r border-b border-emerald-500 px-6 py-4"
                                    >
                                      {s.sasaran_opd || "-"}
                                    </td>
                                  )}

                                  <td
                                    colSpan={4}
                                    className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                                  >
                                    Strategi OPD belum dibuat
                                  </td>
                                </tr>,
                              ];
                            }

                            const strategiRows = getStrategiRows(st);

                            const tacticalList =
                              st.tactical_opds && st.tactical_opds.length > 0
                                ? st.tactical_opds
                                : [null];

                            let isFirstStrategiRow = true;

                            return tacticalList.flatMap(
                              (
                                tactical: TacticalOpd | null,
                                tacticalIndex: number,
                              ) => {
                                /*
                                 * TACTICAL BELUM ADA
                                 */
                                if (!tactical) {
                                  const showTujuan = isFirstTujuanRow;

                                  const showSasaran = isFirstSasaranRow;

                                  const showStrategi = isFirstStrategiRow;

                                  isFirstTujuanRow = false;
                                  isFirstSasaranRow = false;
                                  isFirstStrategiRow = false;

                                  return [
                                    <tr
                                      key={`${index}-${s_index}-${st_index}-no-tactical`}
                                    >
                                      {showTujuan && (
                                        <>
                                          <td
                                            rowSpan={totalRows}
                                            className="border-x border-b border-emerald-500 py-4 px-3 text-center"
                                          >
                                            {index + 1}
                                          </td>

                                          <td
                                            rowSpan={totalRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4 font-semibold"
                                          >
                                            {item.tujuan_opd || "-"}
                                          </td>
                                        </>
                                      )}

                                      {showSasaran && (
                                        <td
                                          rowSpan={sasaranRows}
                                          className="border-r border-b border-emerald-500 px-6 py-4"
                                        >
                                          {s.sasaran_opd || "-"}
                                        </td>
                                      )}

                                      {showStrategi && (
                                        <td
                                          rowSpan={strategiRows}
                                          className="border-r border-b border-emerald-500 px-6 py-4"
                                        >
                                          {st.strategi_opd || "-"}
                                        </td>
                                      )}

                                      <td
                                        colSpan={3}
                                        className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                                      >
                                        Tactical OPD belum dibuat
                                      </td>
                                    </tr>,
                                  ];
                                }

                                /*
                                 * =========================
                                 * OPERASIONAL
                                 * =========================
                                 */

                                const operasionalList =
                                  tactical.operasional_opds &&
                                  tactical.operasional_opds.length > 0
                                    ? tactical.operasional_opds
                                    : [null];

                                const operasionalRows = Math.max(
                                  operasionalList.length,
                                  1,
                                );

                                let isFirstTacticalRow = true;

                                return operasionalList.map(
                                  (
                                    operasional: OperasionalOpd | null,
                                    operasionalIndex: number,
                                  ) => {
                                    const showTujuan = isFirstTujuanRow;

                                    const showSasaran = isFirstSasaranRow;

                                    const showStrategi = isFirstStrategiRow;

                                    const showTactical = isFirstTacticalRow;

                                    isFirstTujuanRow = false;
                                    isFirstSasaranRow = false;
                                    isFirstStrategiRow = false;
                                    isFirstTacticalRow = false;

                                    return (
                                      <tr
                                        key={`${index}-${s_index}-${st_index}-${tacticalIndex}-${operasionalIndex}`}
                                      >
                                        {/* NO & TUJUAN */}
                                        {showTujuan && (
                                          <>
                                            <td
                                              rowSpan={totalRows}
                                              className="border-x border-b border-emerald-500 py-4 px-3 text-center"
                                            >
                                              {index + 1}
                                            </td>

                                            <td
                                              rowSpan={totalRows}
                                              className="border-r border-b border-emerald-500 px-6 py-4 font-semibold"
                                            >
                                              {item.tujuan_opd || "-"}
                                            </td>
                                          </>
                                        )}

                                        {/* SASARAN */}
                                        {showSasaran && (
                                          <td
                                            rowSpan={sasaranRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            {s.sasaran_opd || "-"}
                                          </td>
                                        )}

                                        {/* STRATEGIC */}
                                        {showStrategi && (
                                          <td
                                            rowSpan={strategiRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            {st.strategi_opd || "-"}
                                          </td>
                                        )}

                                        {/* TACTICAL */}
                                        {showTactical && (
                                          <td
                                            rowSpan={operasionalRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            {tactical.tactical_opd || "-"}
                                          </td>
                                        )}

                                        {/* OPERASIONAL */}
                                        <td className="border-r border-b border-emerald-500 px-6 py-4">
                                          {operasional ? (
                                            operasional.operasional_opd || "-"
                                          ) : (
                                            <span className="text-gray-500">
                                              Operasional OPD belum dibuat
                                            </span>
                                          )}
                                        </td>

                                        {/* ARAH KEBIJAKAN */}
                                        {showTactical && (
                                          <td
                                            rowSpan={operasionalRows}
                                            className="border-r border-b border-emerald-500 p-2"
                                          >
                                            {tactical.arah_kebijakan_opd &&
                                            tactical.arah_kebijakan_opd.length >
                                              0 ? (
                                              <div className="flex flex-col gap-2">
                                                {tactical.arah_kebijakan_opd.map(
                                                  (arah, arahIndex) => {
                                                    const hiddenKey = `${index}-${s_index}-${st_index}-${tacticalIndex}-${arahIndex}`;

                                                    return (
                                                      <div
                                                        key={arah.id}
                                                        className="flex flex-col gap-2 p-2 border border-emerald-500 rounded-lg"
                                                      >
                                                        {!hiddenItems.includes(
                                                          hiddenKey,
                                                        ) && (
                                                          <div>
                                                            {arah.arah || "-"}
                                                          </div>
                                                        )}

                                                        <ButtonRedBorder
                                                          className="flex items-center gap-1 text-sm"
                                                          onClick={() =>
                                                            toggleHide(
                                                              hiddenKey,
                                                            )
                                                          }
                                                        >
                                                          {hiddenItems.includes(
                                                            hiddenKey,
                                                          ) ? (
                                                            <>
                                                              <TbEye />
                                                              Tampilkan
                                                            </>
                                                          ) : (
                                                            <>
                                                              <TbEyeClosed />
                                                              Sembunyikan
                                                            </>
                                                          )}
                                                        </ButtonRedBorder>
                                                        <ButtonSkyBorder
                                                          className="flex items-center gap-1 text-sm"
                                                          onClick={() => {
                                                            setPokinId(
                                                              tactical.id_tactical_opd,
                                                            );
                                                            handleModalOpen(
                                                              "edit",
                                                              arah,
                                                            );
                                                          }}
                                                        >
                                                          <TbPencil />
                                                          Edit
                                                        </ButtonSkyBorder>
                                                      </div>
                                                    );
                                                  },
                                                )}
                                              </div>
                                            ) : (
                                              <div className="text-red-500 text-center flex flex-col gap-2 p-2 border border-emerald-500 rounded-lg">
                                                Arah Kebijakan belum dibuat
                                                <ButtonGreenBorder
                                                  onClick={() => {
                                                    setPokinId(
                                                      tactical.id_tactical_opd,
                                                    );
                                                    handleModalOpen(
                                                      "tambah",
                                                      null,
                                                    );
                                                  }}
                                                  className="flex items-center gap-1 text-sm"
                                                >
                                                  <TbCirclePlus />
                                                  Tambah
                                                </ButtonGreenBorder>
                                              </div>
                                            )}
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  },
                                );
                              },
                            );
                          },
                        );
                      },
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {ModalOpen && (
        <ModalIkk
          isOpen={ModalOpen}
          onClose={handleClose}
          Data={DataModal}
          jenis={JenisModal}
          pokin_id={PokinId ?? 0}
          kode_opd={kode_opd}
          tahun={tahun}
          onSuccess={refresh}
        />
      )}
    </>
  );
};

export default Table;
