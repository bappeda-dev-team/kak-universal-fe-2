"use client";

import React from "react";
import {
  ArahKebijakan,
  SasaranOpd,
  StrategiOpd,
  ArahKebijakanOpd,
} from "../type";
import { ButtonRedBorder } from "@/components/global/Button";
import { TbEyeClosed } from "react-icons/tb";

interface Table {
  Data: ArahKebijakan[];
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
                Tujuan OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Sasaran OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Strategic OPD
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Arah Kebijakan
              </th>
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
                const totalRows =
                  item.sasaran_opds?.reduce((total, sasaran) => {
                    return (
                      total + Math.max(sasaran.strategi_opds?.length || 0, 1)
                    );
                  }, 0) || 1;

                let isFirstRow = true;

                return (
                  <React.Fragment key={index}>
                    {item.sasaran_opds && item.sasaran_opds.length > 0 ? (
                      item.sasaran_opds.map(
                        (s: SasaranOpd, s_index: number) => {
                          const strategiList =
                            s.strategi_opds && s.strategi_opds.length > 0
                              ? s.strategi_opds
                              : [null];

                          return strategiList.map(
                            (st: StrategiOpd | null, st_index: number) => (
                              <tr key={`${index}-${s_index}-${st_index}`}>
                                {/* No & Tujuan OPD hanya sekali */}
                                {isFirstRow && (
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

                                {/* Sasaran hanya sekali tiap kelompok strategi */}
                                {st_index === 0 && (
                                  <td
                                    rowSpan={Math.max(
                                      s.strategi_opds?.length || 0,
                                      1,
                                    )}
                                    className="border-r border-b border-emerald-500 px-6 py-4"
                                  >
                                    {s.sasaran_opd || "-"}
                                  </td>
                                )}

                                {st ? (
                                  <>
                                    <td className="border-r border-b border-emerald-500 px-6 py-4">
                                      {st.strategi_opd || "-"}
                                    </td>

                                    <td className="border-r border-b border-emerald-500 p-2">
                                      {st.arah_kebijakan_opds &&
                                      st.arah_kebijakan_opds.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                          {st.arah_kebijakan_opds.map(
                                            (
                                              ar: ArahKebijakanOpd,
                                              ar_index: number,
                                            ) => (
                                              <p
                                                key={ar_index}
                                                className="flex flex-col gap-2 p-1 border border-emerald-500 rounded-lg w-full"
                                              >
                                                <div>
                                                  {ar_index + 1}.{" "}
                                                  {ar.arah_kebijakan_opd}
                                                </div>

                                                <ButtonRedBorder className="flex items-center gap-1 text-sm">
                                                  <TbEyeClosed />
                                                  Sembunyikan
                                                </ButtonRedBorder>
                                              </p>
                                            ),
                                          )}
                                        </div>
                                      ) : (
                                        "Strategic OPD belum dibuat"
                                      )}
                                    </td>
                                  </>
                                ) : (
                                  <td
                                    colSpan={2}
                                    className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                                  >
                                    Strategi OPD belum dibuat
                                  </td>
                                )}

                                {(() => {
                                  isFirstRow = false;
                                  return null;
                                })()}
                              </tr>
                            ),
                          );
                        },
                      )
                    ) : (
                      <tr>
                        <td className="border-x border-b border-emerald-500 py-4 px-3 text-center">
                          {index + 1}
                        </td>

                        <td className="border-r border-b border-emerald-500 px-6 py-4 font-semibold">
                          {item.tujuan_opd || "-"}
                        </td>

                        <td
                          colSpan={3}
                          className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                        >
                          Sasaran OPD belum dibuat
                        </td>
                      </tr>
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
