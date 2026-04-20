'use client'

import React from "react";

interface Tema {
    nama: string;
    child: Tema[];
}

interface TableTema {
    Data: Tema[];
}

const TableTema: React.FC<TableTema> = ({ Data }) => {
    return (
        <div className="flex flex-col w-full items-center">
            <div className="overflow-auto m-2 rounded-t-xl border w-full">
                <table className="w-full">
                    <thead>
                        <tr className="bg-emerald-500 text-white">
                            <th className="border-r border-b px-6 py-3 w-[50px] text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Tema</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Sub Tema</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Sub Sub Tema</th>
                        </tr>
                        <tr className="bg-emerald-700 text-white">
                            <th className="border-r border-b px-2 py-1 text-center">1</th>
                            <th className="border-r border-b px-2 py-1 text-center">2</th>
                            <th className="border-r border-b px-2 py-1 text-center">3</th>
                            <th className="border-r border-b px-2 py-1 text-center">4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data?.length === 0 ?
                            <tr>
                                <td className="border-r border-b border-emerald-500 px-6 py-4">
                                    Tidak terlibat di tematik manapun
                                </td>
                            </tr>
                            :
                            Data?.map((item: Tema, index: number) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className="border-r border-b border-emerald-500 px-6 py-4 text-center">{index + 1}</td>
                                        <td className="border-r border-b border-emerald-500 px-6 py-4">{item.nama || "-"}</td>
                                        <td className="border-r border-b border-emerald-500 px-6 py-4">-</td>
                                        <td className="border-b border-emerald-500 px-6 py-4">-</td>
                                    </tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableTema;
