import { DataTable, TematikFindall } from "../type"

interface Table {
    DataTable: DataTable[];
}

export const Table: React.FC<Table> = ({ DataTable }) => {

    console.log("data table : ", DataTable);

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[20px]">No</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[200px]">Perangkat Daerah</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[300px]">Bidang Urusan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Tujuan OPD</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-slate-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Strategic OPD</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-red-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Tactical</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Indikator</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-blue-300 min-w-[300px]">Target/Satuan</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Operational</th>
                    <th className="border-r border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Indikator</th>
                    <th className="border-b px-6 py-3 border-black bg-green-300 min-w-[300px]">Target/Satuan</th>
                </tr>
            </thead>
            <tbody>
                {DataTable === undefined ?
                    <tr>
                        <td className="px-6 py-3 uppercase" colSpan={16}>
                            Tidak ada OPD terlibat
                        </td>
                    </tr>
                    :
                    DataTable.map((data: DataTable, index: number) => (
                        <tr key={index}>
                            <td className="border-r border-b border-black px-6 py-4 text-center">{index + 1}</td>
                            <td className="border-r border-b border-black px-6 py-4 bg-yellow-200">
                                <div className="flex flex-col items-center gap-1">
                                    <p>{data.nama_opd || "-"}</p>
                                    <p>{data.kode_opd || "-"}</p>
                                </div>
                            </td>
                            <td className="border-r border-b border-black px-6 py-4 bg-yellow-200">Bidang Urusan Dalam Pengembangan</td>
                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-slate-200">Tujuan OPD Dalam Pengembangan</td>
                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-red-200">Strategic Dalam Pengembangan</td>
                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-blue-200">Tactical Dalam Pengembangan</td>
                            <td colSpan={3} className="border-r border-b border-black px-6 py-4 bg-green-200">Operational Dalam Pengembangan</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}