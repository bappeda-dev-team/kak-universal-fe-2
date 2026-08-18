export const Table = () => {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border-r border-b px-6 py-3 border-black bg-yellow-300 min-w-[50px]">No</th>
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
                <tr>
                    <td className="px-6 py-3 uppercase" colSpan={16}>
                        Data Dalam Pengembangan Tim Developer
                    </td>
                </tr>
            </tbody>
        </table>
    )
}