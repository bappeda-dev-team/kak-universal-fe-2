"use client";

import React, { useState } from "react";
import {
  ArahKebijakan,
  SasaranPemda,
  StrategiPemda,
  ArahKebijakanPemda,
} from "../type";
import { ButtonRedBorder } from "@/components/global/Button";
import { TbEye, TbEyeClosed } from "react-icons/tb";

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
                Tujuan Pemda
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Sasaran Pemda
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Strategi
              </th>
              <th className="border-r border-b px-6 py-3 min-w-[300px]">
                Arah Kebijakan
              </th>
            </tr>
            <tr className="bg-emerald-700 text-white">
              <th className="border-r border-b text-center">1</th>
              <th className="border-r border-b text-center">2</th>
              <th className="border-r border-b text-center">3</th>
              <th className="border-r border-b text-center">4</th>
              <th className="border-r border-b text-center">5</th>
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
                        item.sasaran_pemdas ? item.sasaran_pemdas.length + 1 : 2
                      }
                      className="border-x border-b border-emerald-500 py-4 px-3 text-center"
                    >
                      {index + 1}
                    </td>
                    <td
                      rowSpan={
                        item.sasaran_pemdas ? item.sasaran_pemdas.length + 1 : 2
                      }
                      className="border-r border-b border-emerald-500 px-6 py-4 font-semibold"
                    >
                      {item.tujuan_pemda || "-"}
                    </td>
                  </tr>
                  {item.sasaran_pemdas ? (
                    item.sasaran_pemdas.map(
                      (s: SasaranPemda, s_index: number) => (
                        <React.Fragment key={s_index}>
                          {s.strategi_pemdas && s.strategi_pemdas.length > 0 ? (
                            s.strategi_pemdas.map(
                              (st: StrategiPemda, st_index: number) => (
                                <tr key={`${s_index}-${st_index}`}>
                                  {st_index === 0 && (
                                    <td
                                      rowSpan={s.strategi_pemdas.length}
                                      className="border-r border-b border-emerald-500 px-6 py-4"
                                    >
                                      {s.sasaran_pemda || "-"}
                                    </td>
                                  )}

                                  <td className="border-r border-b border-emerald-500 px-6 py-4">
                                    {st.strategi_pemda || "-"}
                                  </td>

                                  {st.arah_kebijakan_pemdas &&
                                  st.arah_kebijakan_pemdas.length > 0 ? (
                                    <td className="border-r border-b p-2 border-emerald-500">
                                      <div className="flex flex-col items-center gap-2">
                                        {st.arah_kebijakan_pemdas.map(
                                          (
                                            ar: ArahKebijakanPemda,
                                            ar_index: number,
                                          ) => {
                                            const hiddenKey = `${index}-${s_index}-${st_index}-${ar_index}`;

                                            return (
                                              <p
                                                key={ar_index}
                                                className="flex flex-col gap-2 p-1 border border-emerald-500 rounded-lg w-full"
                                              >
                                                {!hiddenItems.includes(
                                                  hiddenKey,
                                                ) && (
                                                  <div>
                                                    {ar_index + 1}.{" "}
                                                    {ar.arah_kebijakan_pemda}
                                                  </div>
                                                )}
                                                <ButtonRedBorder
                                                  className="flex items-center gap-1 text-sm"
                                                  onClick={() =>
                                                    toggleHide(hiddenKey)
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
                                              </p>
                                            );
                                          },
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td className="border-r border-b text-white border-emerald-500 bg-red-500 px-6 py-4">
                                      Strategic OPD belum dibuat
                                    </td>
                                  )}
                                </tr>
                              ),
                            )
                          ) : (
                            <tr>
                              <td className="border-r border-b border-emerald-500 px-6 py-4">
                                {s.sasaran_pemda}
                              </td>

                              <td
                                colSpan={2}
                                className="border-r border-b text-white border-emerald-500 bg-red-500 px-6 py-4"
                              >
                                Sasaran Pemda belum dibuat
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ),
                    )
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
