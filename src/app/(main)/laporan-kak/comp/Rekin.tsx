import React from "react";
import { Rekin, IndikatorRenkin, TargetIndikatorRenkin } from "../type";

interface RekinComponent {
    data: Rekin; 
}

export const RekinComponent: React.FC<RekinComponent> = ({ data }) => {
    return(
        <div className="rounded-lg border border-emerald-500 p-1">
            <div className="flex justify-between px-3 text-center">
                <h1 className="font-semibold uppercase pt-2">Sasaran Kinerja</h1>
            </div>
            <div className="mx-2 my-3">
                <table className="w-full">
                    <tbody className='border border-emerald-500'>
                        <tr>
                            <td className="px-2 py-2 border border-emerald-500">OPD </td>
                            <td className="px-2 py-2 border border-emerald-500">{data?.operasional_daerah?.nama_opd || "OPD Unknown"}</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 border border-emerald-500">ASN </td>
                            <td className="px-2 py-2 border border-emerald-500">{data?.nama_pegawai || "-"}</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 border border-emerald-500">NIP </td>
                            <td className="px-2 py-2 border border-emerald-500">{data?.pegawai_id || "-"}</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 border border-emerald-500">Sasaran Kinerja </td>
                            <td className="px-2 py-2 border border-emerald-500">{data?.nama_rencana_kinerja || "-"}</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 border border-emerald-500">Tahun </td>
                            <td className="px-2 py-2 border border-emerald-500">{data?.tahun}</td>
                        </tr>
                        {data?.indikator &&
                            data?.indikator.map((i: IndikatorRenkin, index: number) => (
                                <React.Fragment key={i.id_indikator}>
                                    <tr>
                                        <td className="px-2 py-2 border border-emerald-500 bg-emerald-100">Indikator Kinerja ke {index + 1}</td>
                                        <td className="px-2 py-2 border border-emerald-500 bg-emerald-100">{i.nama_indikator}</td>
                                    </tr>
                                    {i.targets.map((t: TargetIndikatorRenkin) => (
                                        <tr key={t.id_target}>
                                            <td className="px-2 py-2 border border-emerald-500">Target Indikator Kinerja ke {index + 1}</td>
                                            <td className="px-2 py-2 border border-emerald-500">{t.target} {t.satuan}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}