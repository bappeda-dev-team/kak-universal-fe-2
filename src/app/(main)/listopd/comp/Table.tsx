export const Table = () => {
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-emerald-500 text-white">
                    <th className="border-r border-b px-6 py-3 min-w-[50px]">No</th>
                    <th className="border-r border-b px-6 py-3 min-w-[200px]">Kode Perangkat Daerah</th>
                    <th className="border-r border-b px-6 py-3 min-w-[300px]">Nama Perangkat Daerah</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-6 py-3 uppercase" colSpan={13}>
                        Tidak Ada OPD terkait di tematik ini
                    </td>
                </tr>
            </tbody>
        </table>
    )
}