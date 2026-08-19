"use client";

import React, { useState } from "react";
import {
  ArahKebijakan,
  SasaranOpd,
  StrategiOpd,
  TacticalOpd,
  OperasionalOpd,
} from "../type";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/global/Button";
import { TbEye, TbEyeClosed, TbPencil, TbCirclePlus } from "react-icons/tb";

interface Table {
  Data: ArahKebijakan[];
}

const Table: React.FC<Table> = ({ Data }) => {
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);

  const toggleHide = (key: string) => {
    setHiddenItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
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

                /*
                 * Hitung jumlah baris untuk seluruh Tujuan OPD.
                 *
                 * Setiap strategi dihitung berdasarkan:
                 * Tactical -> Operasional
                 */
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

                        return strategiList.map(
                          (st: StrategiOpd | null, st_index: number) => {
                            /*
                             * Kalau strategi belum ada
                             */
                            if (!st) {
                              const showTujuan = isFirstTujuanRow;
                              isFirstTujuanRow = false;

                              return (
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
                                </tr>
                              );
                            }

                            /*
                             * ==============================
                             * STRATEGI
                             * ==============================
                             */

                            const strategiRows = getStrategiRows(st);

                            const tacticalList =
                              st.tactical_opds && st.tactical_opds.length > 0
                                ? st.tactical_opds
                                : [null];

                            let isFirstStrategiRow = true;

                            /*
                             * ==============================
                             * TACTICAL
                             * ==============================
                             */

                            return tacticalList.flatMap(
                              (
                                tactical: TacticalOpd | null,
                                tacticalIndex: number,
                              ) => {
                                /*
                                 * Kalau Tactical belum ada
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
                                        colSpan={2}
                                        className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                                      >
                                        Tactical OPD belum dibuat
                                      </td>

                                      <td className="border-r border-b border-emerald-500 px-6 py-4">
                                        {/* Arah Kebijakan */}
                                      </td>
                                    </tr>,
                                  ];
                                }

                                /*
                                 * Jumlah baris Tactical
                                 */
                                const operasionalList =
                                  tactical.operasional_opds &&
                                  tactical.operasional_opds.length > 0
                                    ? tactical.operasional_opds
                                    : [null];

                                const arahkebijakanRows = Math.max(
                                  operasionalList.length,
                                  1,
                                );

                                const tacticalRows = Math.max(
                                  operasionalList.length,
                                  1,
                                );

                                let isFirstTacticalRow = true;

                                /*
                                 * ==============================
                                 * OPERASIONAL
                                 * ==============================
                                 */

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
                                        {/* =========================
                                                NO
                                            ========================= */}
                                        {showTujuan && (
                                          <>
                                            <td
                                              rowSpan={totalRows}
                                              className="border-x border-b border-emerald-500 py-4 px-3 text-center"
                                            >
                                              {index + 1}
                                            </td>

                                            {/* =========================
                                                    TUJUAN OPD
                                                ========================= */}
                                            <td
                                              rowSpan={totalRows}
                                              className="border-r border-b border-emerald-500 px-6 py-4 font-semibold"
                                            >
                                              {item.tujuan_opd || "-"}
                                            </td>
                                          </>
                                        )}

                                        {/* =========================
                                                SASARAN OPD
                                            ========================= */}
                                        {showSasaran && (
                                          <td
                                            rowSpan={sasaranRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            {s.sasaran_opd || "-"}
                                          </td>
                                        )}

                                        {/* =========================
                                                STRATEGIC OPD
                                            ========================= */}
                                        {showStrategi && (
                                          <td
                                            rowSpan={strategiRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            {st.strategi_opd || "-"}
                                          </td>
                                        )}

                                        {/* =========================
                                                TACTICAL OPD
                                            ========================= */}
                                        {showTactical && (
                                          <td
                                            rowSpan={tacticalRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            {tactical.tactical_opd || "-"}
                                          </td>
                                        )}

                                        {/* =========================
                                                OPERASIONAL OPD
                                            ========================= */}
                                        <td className="border-r border-b border-emerald-500 px-6 py-4">
                                          {operasional ? (
                                            <>
                                              {operasional.operasional_opd ||
                                                "-"}
                                            </>
                                          ) : (
                                            <span className="text-red-500">
                                              Operasional OPD belum dibuat
                                            </span>
                                          )}
                                        </td>

                                        {/* =========================
                                              ARAH KEBIJAKAN
                                              (KOSONG DULU)
                                          ========================= */}
                                        {showTactical && (
                                          <td
                                            rowSpan={arahkebijakanRows}
                                            className="border-r border-b border-emerald-500 px-6 py-4"
                                          >
                                            <div className="flex flex-col gap-2">
                                              <span className="text-red-500">
                                                Arah kebijakan belum dibuat
                                              </span>
                                              <div className="flex items-center justify-center gap-1 pt-2 border-t border-gray-300">
                                                <ButtonGreenBorder
                                                // onClick={() =>
                                                //   handleEditIndikator(i)
                                                // }
                                                // className="rounded-full"
                                                >
                                                  <TbCirclePlus />
                                                  <span>Tambah</span>
                                                </ButtonGreenBorder>
                                              </div>
                                            </div>
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
    </>
  );
};

export default Table;
