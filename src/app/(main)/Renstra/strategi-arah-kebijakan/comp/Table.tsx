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
              Data.map((item: ArahKebijakan, index: number) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      rowSpan={
                        item.sasaran_opds ? item.sasaran_opds.length + 1 : 2
                      }
                      className="border-x border-b border-emerald-500 py-4 px-3 text-center"
                    >
                      {index + 1}
                    </td>
                    <td
                      rowSpan={
                        item.sasaran_opds ? item.sasaran_opds.length + 1 : 2
                      }
                      className="border-r border-b border-emerald-500 px-6 py-4 font-semibold"
                    >
                      {item.tujuan_opd || "-"}
                    </td>
                  </tr>
                  {item.sasaran_opds ? (
                    item.sasaran_opds.map((s: SasaranOpd, s_index: number) => (
                      <React.Fragment key={s_index}>
                        {s.strategi_opds && s.strategi_opds.length > 0 ? (
                          s.strategi_opds.map(
                            (st: StrategiOpd, st_index: number) => (
                              <tr key={`${s_index}-${st_index}`}>
                                {st_index === 0 && (
                                  <td
                                    rowSpan={s.strategi_opds.length}
                                    className="border-r border-b border-emerald-500 px-6 py-4"
                                  >
                                    {s.sasaran_opd || "-"}
                                  </td>
                                )}

                                <td className="border-r border-b border-emerald-500 px-6 py-4">
                                  {st.strategi_opd || "-"}
                                </td>

                                {st.arah_kebijakan_opds &&
                                st.arah_kebijakan_opds.length > 0 ? (
                                  <td className="border-r border-b p-2 border-emerald-500">
                                    <div className="flex flex-col items-center gap-2">
                                      {st.arah_kebijakan_opds.map(
                                        (
                                          ar: ArahKebijakanOpd,
                                          ar_index: number,
                                        ) => (
                                          <p
                                            key={ar_index}
                                            className="flex flex-col gap-2 p-1 border border-emerald-500 rounded-lg w-full"
                                          >
                                            {ar_index + 1}.{" "}
                                            {ar.arah_kebijakan_opd}
                                            <ButtonRedBorder className="flex items-center gap-1 text-sm">
                                              <TbEyeClosed />
                                              Sembunyikan
                                            </ButtonRedBorder>
                                          </p>
                                        ),
                                      )}
                                    </div>
                                  </td>
                                ) : (
                                  <td className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4">
                                    Strategic OPD belum dibuat
                                  </td>
                                )}
                              </tr>
                            ),
                          )
                        ) : (
                          <tr>
                            <td className="border-r border-b border-emerald-500 px-6 py-4">
                              {s.sasaran_opd}
                            </td>

                            <td
                              colSpan={2}
                              className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                            >
                              Strategi OPD belum dibuat
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="border-r border-b border-emerald-500 bg-red-500 px-6 py-4"
                      >
                        Sasaran OPD belum dibuat
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
