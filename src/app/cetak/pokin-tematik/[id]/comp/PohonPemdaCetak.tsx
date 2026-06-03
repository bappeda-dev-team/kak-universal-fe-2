'use client'

import '@/components/pages/Pohon/treeflex.css'
import React, { useState } from 'react';
import { TbCircleCheckFilled, TbCheck, TbCircleLetterXFilled, TbHourglass } from 'react-icons/tb';

interface pohon {
    tema: any;
}

interface Tagging {
    id: number;
    id_pokin: number;
    nama_tagging: string;
    keterangan_tagging_program: KeteranganTagging[];
}
interface KeteranganTagging {
    id: number;
    id_tagging: number;
    kode_program_unggulan: string;
    keterangan_tagging_program: string;
    tahun: string;
}

export const PohonPemdaCetak: React.FC<pohon> = ({ tema }) => {

    const [childPohons, setChildPohons] = useState(tema.childs || []);

    console.log(tema);

    return (
        <li>
            <>
                <div
                    className={`tf-nc tf flex flex-col w-[600px] rounded-lg shadow-lg
                                        ${tema.jenis_pohon === "Tematik" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Sub Tematik" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Sub Sub Tematik" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Super Tematik" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Strategic Pemda" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Tactical Pemda" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Operational Pemda" && 'shadow-slate-500'}
                                        ${tema.jenis_pohon === "Strategic" && 'shadow-red-500 bg-red-700'}
                                        ${tema.jenis_pohon === "Tactical" && 'shadow-blue-500 bg-blue-500'}
                                        ${(tema.jenis_pohon === "Operational" || tema.jenis_pohon === "Operational N") && 'shadow-green-500 bg-green-500'}
                                        ${tema.status === "ditolak" && 'shadow-black bg-gray-500'}
                                    `}
                >
                    {/* HEADER */}
                    <div
                        className={`flex pt-3 justify-center font-bold text-lg uppercase border my-3 py-3 rounded-lg bg-white
                                            ${tema.jenis_pohon === "Tematik" && 'border-black'}
                                            ${tema.jenis_pohon === "Sub Tematik" && 'border-black'}
                                            ${tema.jenis_pohon === "Sub Sub Tematik" && 'border-black'}
                                            ${tema.jenis_pohon === "Super Sub Tematik" && 'border-black'}
                                            ${tema.jenis_pohon === "Strategic" && 'border-red-500 text-red-700'}
                                            ${tema.jenis_pohon === "Tactical" && 'border-blue-500 text-blue-500'}
                                            ${(tema.jenis_pohon === "Operational" || tema.jenis_pohon === "Operational N") && 'border-green-500 text-green-500'}
                                            ${tema.jenis_pohon === "Strategic Pemda" && 'border-red-700 text-white bg-gradient-to-r from-[#CA3636] from-40% to-[#BD04A1]'}
                                            ${tema.jenis_pohon === "Tactical Pemda" && 'border-blue-500 text-white bg-gradient-to-r from-[#3673CA] from-40% to-[#08D2FB]'}
                                            ${tema.jenis_pohon === "Operational Pemda" && 'border-green-500 text-white bg-gradient-to-r from-[#139052] from-40% to-[#2DCB06]'}
                                        `}
                    >
                        <div className="flex flex-wrap items-center justify-center gap-1">
                            <h1>{tema.jenis_pohon} {tema.id}</h1>
                            {tema.is_active === false &&
                                <button className="px-2 bg-red-600 text-white rounded-xl cursor-default">NON-AKTIF</button>
                            }
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="flex justify-center my-3">
                            <TablePohon item={tema} />
                    </div>
                </div>
            </>
            <ul>
                {childPohons.map((dahan: any, index: any) => (
                    <React.Fragment key={index}>
                        <PohonPemdaCetak tema={dahan} />
                    </React.Fragment>
                ))}
            </ul>
        </li>
        // <>cek</>
    )
}

export const TablePohon = (props: any) => {
    const tema = props.item.tema;
    const tagging = props.item.tagging;
    const nama_pohon = props.item.nama_pohon;
    const keterangan = props.item.keterangan;
    const opd = props.item.perangkat_daerah?.nama_opd;
    const jenis = props.item.jenis_pohon;
    const indikator = props.item.indikator;
    const status = props.item.status;
    return (
        <div className="flex flex-col w-full">
            {/* TAGGING */}
            {tagging &&
                tagging.map((tg: Tagging, tag_index: number) => (
                    <div key={tag_index} className="flex flex-col gap-1 w-full px-3 py-1 border border-yellow-400 rounded-lg bg-white mb-2">
                        <div className='flex items-center gap-1'>
                            <h1 className='text-emerald-500'><TbCircleCheckFilled /></h1>
                            <h1 className='font-semibold'>{tg.nama_tagging || "-"}</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            {tg?.keterangan_tagging_program?.map((tp: KeteranganTagging, tp_index: number) => (
                                <h1 key={tp_index} className="py-1 px-3 text-white text-start bg-yellow-500 rounded-lg">
                                    {tg.keterangan_tagging_program.length > 1 && `${tp_index + 1}.`} {tp.keterangan_tagging_program || ""}
                                </h1>
                            ))}
                        </div>
                    </div>
                ))
            }
            <table className='w-full'>
                <tbody>
                    <tr>
                        <td
                            className={`min-w-[100px] border px-2 py-3 bg-white text-start rounded-tl-lg
                                ${jenis === "Tematik" && "border-black"}
                                ${jenis === "Sub Tematik" && "border-black"}
                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                ${jenis === "Super Sub Tematik" && "border-black"}
                                ${jenis === "Strategic Pemda" && "border-black"}
                                ${jenis === "Tactical Pemda" && "border-black"}
                                ${jenis === "Operational Pemda" && "border-black"}
                                ${jenis === "Strategic" && "border-red-700"}
                                ${jenis === "Tactical" && "border-blue-500"}
                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                            `}
                        >
                            {(jenis === 'Tematik' || jenis === 'Sub Tematik' || jenis === 'Sub Sub Tematik' || jenis === 'Super Sub Tematik') && 'Tema'}
                            {(jenis === 'Strategic' || jenis === 'Strategic Pemda') && 'Strategic'}
                            {(jenis === 'Tactical' || jenis === 'Tactical Pemda') && 'Tactical'}
                            {(jenis === 'Operational' || jenis === 'Operational Pemda') && 'Operational'}
                            {jenis === 'Operational N' && 'Operational N'}
                        </td>
                        <td
                            className={`min-w-[300px] border px-2 py-3 bg-white text-start rounded-tr-lg
                                ${jenis === "Tematik" && "border-black"}
                                ${jenis === "Sub Tematik" && "border-black"}
                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                ${jenis === "Super Sub Tematik" && "border-black"}
                                ${jenis === "Strategic Pemda" && "border-black"}
                                ${jenis === "Strategic" && "border-red-700"}
                                ${jenis === "Tactical Pemda" && "border-black"}
                                ${jenis === "Tactical" && "border-blue-500"}
                                ${jenis === "Operational Pemda" && "border-black"}
                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                            `}
                        >
                            {tema ? tema : nama_pohon ? nama_pohon : "-"}
                        </td>
                    </tr>
                    {indikator ?
                        indikator.map((data: any, index: number) => (
                            <React.Fragment key={data.id_indikator}>
                                <tr>
                                    <td
                                        className={`min-w-[100px] border px-2 py-3 bg-white text-start
                                        ${jenis === "Tematik" && "border-black"}
                                        ${jenis === "Sub Tematik" && "border-black"}
                                        ${jenis === "Sub Sub Tematik" && "border-black"}
                                        ${jenis === "Super Sub Tematik" && "border-black"}
                                        ${jenis === "Strategic" && "border-red-700"}
                                        ${jenis === "Tactical" && "border-blue-500"}
                                        ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                        ${jenis === "Strategic Pemda" && "border-black"}
                                        ${jenis === "Tactical Pemda" && "border-black"}
                                        ${jenis === "Operational Pemda" && "border-black"}
                                    `}
                                    >
                                        {indikator.length > 1 ?
                                            <p>Indikator {index + 1}</p>
                                            :
                                            <p>Indikator</p>
                                        }
                                    </td>
                                    <td
                                        className={`min-w-[300px] border px-2 py-3 bg-white text-start
                                        ${jenis === "Tematik" && "border-black"}
                                        ${jenis === "Sub Tematik" && "border-black"}
                                        ${jenis === "Sub Sub Tematik" && "border-black"}
                                        ${jenis === "Super Sub Tematik" && "border-black"}
                                        ${jenis === "Strategic" && "border-red-700"}
                                        ${jenis === "Tactical" && "border-blue-500"}
                                        ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                        ${jenis === "Strategic Pemda" && "border-black"}
                                        ${jenis === "Tactical Pemda" && "border-black"}
                                        ${jenis === "Operational Pemda" && "border-black"}
                                    `}
                                    >
                                        {data.nama_indikator ? data.nama_indikator : "-"}
                                    </td>
                                </tr>
                                {data.targets ?
                                    data.targets.map((data: any) => (
                                        <tr key={data.id_target}>
                                            <td
                                                className={`min-w-[100px] border px-2 py-3 bg-white text-start
                                                ${jenis === "Tematik" && "border-black"}
                                                ${jenis === "Sub Tematik" && "border-black"}
                                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                                ${jenis === "Super Sub Tematik" && "border-black"}
                                                ${jenis === "Strategic" && "border-red-700"}
                                                ${jenis === "Tactical" && "border-blue-500"}
                                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                                ${jenis === "Strategic Pemda" && "border-black"}
                                                ${jenis === "Tactical Pemda" && "border-black"}
                                                ${jenis === "Operational Pemda" && "border-black"}    
                                            `}
                                            >
                                                {indikator.length > 1 ?
                                                    <p>Target/Satuan {index + 1}</p>
                                                    :
                                                    <p>Target/Satuan</p>
                                                }
                                            </td>
                                            <td
                                                className={`min-w-[300px] border px-2 py-3 bg-white text-start
                                                ${jenis === "Tematik" && "border-black"}
                                                ${jenis === "Sub Tematik" && "border-black"}
                                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                                ${jenis === "Super Sub Tematik" && "border-black"}
                                                ${jenis === "Strategic" && "border-red-700"}
                                                ${jenis === "Tactical" && "border-blue-500"}
                                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                                ${jenis === "Strategic Pemda" && "border-black"}
                                                ${jenis === "Tactical Pemda" && "border-black"}
                                                ${jenis === "Operational Pemda" && "border-black"}    
                                            `}
                                            >
                                                {data.target ? data.target : "-"} / {data.satuan ? data.satuan : "-"}
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td
                                            className={`min-w-[100px] border px-2 py-3 bg-white text-start
                                                ${jenis === "Tematik" && "border-black"}
                                                ${jenis === "Sub Tematik" && "border-black"}
                                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                                ${jenis === "Super Sub Tematik" && "border-black"}
                                                ${jenis === "Strategic" && "border-red-700"}
                                                ${jenis === "Tactical" && "border-blue-500"}
                                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                                ${jenis === "Strategic Pemda" && "border-black"}
                                                ${jenis === "Tactical Pemda" && "border-black"}
                                                ${jenis === "Operational Pemda" && "border-black"}    
                                            `}
                                        >
                                            -
                                        </td>
                                        <td
                                            className={`min-w-[300px] border px-2 py-3 bg-white text-start
                                                ${jenis === "Tematik" && "border-black"}
                                                ${jenis === "Sub Tematik" && "border-black"}
                                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                                ${jenis === "Super Sub Tematik" && "border-black"}
                                                ${jenis === "Strategic" && "border-red-700"}
                                                ${jenis === "Tactical" && "border-blue-500"}
                                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                                ${jenis === "Strategic Pemda" && "border-black"}
                                                ${jenis === "Tactical Pemda" && "border-black"}
                                                ${jenis === "Operational Pemda" && "border-black"}    
                                            `}
                                        >
                                            -
                                        </td>
                                    </tr>
                                }
                            </React.Fragment>
                        ))
                        :
                        <>
                            <tr>
                                <td
                                    className={`min-w-[100px] border px-2 py-3 bg-white text-start
                                        ${jenis === "Tematik" && "border-black"}
                                        ${jenis === "Sub Tematik" && "border-black"}
                                        ${jenis === "Sub Sub Tematik" && "border-black"}
                                        ${jenis === "Super Sub Tematik" && "border-black"}
                                        ${jenis === "Strategic" && "border-red-700"}
                                        ${jenis === "Tactical" && "border-blue-500"}
                                        ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                        ${jenis === "Strategic Pemda" && "border-black"}
                                        ${jenis === "Tactical Pemda" && "border-black"}
                                        ${jenis === "Operational Pemda" && "border-black"}
                                    `}
                                >
                                    Indikator
                                </td>
                                <td
                                    className={`min-w-[300px] border px-2 py-3 bg-white text-start
                                        ${jenis === "Tematik" && "border-black"}
                                        ${jenis === "Sub Tematik" && "border-black"}
                                        ${jenis === "Sub Sub Tematik" && "border-black"}
                                        ${jenis === "Super Sub Tematik" && "border-black"}
                                        ${jenis === "Strategic" && "border-red-700"}
                                        ${jenis === "Tactical" && "border-blue-500"}
                                        ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                        ${jenis === "Strategic Pemda" && "border-black"}
                                        ${jenis === "Tactical Pemda" && "border-black"}
                                        ${jenis === "Operational Pemda" && "border-black"}
                                    `}
                                >
                                    -
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`min-w-[100px] border px-2 py-3 bg-white text-start
                                        ${jenis === "Tematik" && "border-black"}
                                        ${jenis === "Sub Tematik" && "border-black"}
                                        ${jenis === "Sub Sub Tematik" && "border-black"}
                                        ${jenis === "Super Sub Tematik" && "border-black"}
                                        ${jenis === "Strategic" && "border-red-700"}
                                        ${jenis === "Tactical" && "border-blue-500"}
                                        ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                        ${jenis === "Strategic Pemda" && "border-black"}
                                        ${jenis === "Tactical Pemda" && "border-black"}
                                        ${jenis === "Operational Pemda" && "border-black"}    
                                    `}
                                >
                                    Target/Satuan
                                </td>
                                <td
                                    className={`min-w-[300px] border px-2 py-3 bg-white text-start
                                        ${jenis === "Tematik" && "border-black"}
                                        ${jenis === "Sub Tematik" && "border-black"}
                                        ${jenis === "Sub Sub Tematik" && "border-black"}
                                        ${jenis === "Super Sub Tematik" && "border-black"}
                                        ${jenis === "Strategic" && "border-red-700"}
                                        ${jenis === "Tactical" && "border-blue-500"}
                                        ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}
                                        ${jenis === "Strategic Pemda" && "border-black"}
                                        ${jenis === "Tactical Pemda" && "border-black"}
                                        ${jenis === "Operational Pemda" && "border-black"}    
                                    `}
                                >
                                    -
                                </td>
                            </tr>
                        </>
                    }
                    {opd &&
                        <tr>
                            <td
                                className={`min-w-[100px] border px-2 py-1 bg-white text-start
                                    ${jenis === "Tematik" && "border-black"}
                                    ${jenis === "Sub Tematik" && "border-black"}
                                    ${jenis === "Sub Sub Tematik" && "border-black"}
                                    ${jenis === "Super Sub Tematik" && "border-black"}
                                    ${jenis === "Strategic Pemda" && "border-black"}
                                    ${jenis === "Strategic" && "border-red-700"}
                                    ${jenis === "Tactical Pemda" && "border-black"}
                                    ${jenis === "Tactical" && "border-blue-500"}
                                    ${jenis === "Operational Pemda" && "border-black"}
                                    ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}    
                                `}
                            >
                                Perangkat Daerah
                            </td>
                            <td
                                className={`min-w-[300px] border px-2 py-3 bg-white text-start
                                    ${jenis === "Tematik" && "border-black"}
                                    ${jenis === "Sub Tematik" && "border-black"}
                                    ${jenis === "Sub Sub Tematik" && "border-black"}
                                    ${jenis === "Super Sub Tematik" && "border-black"}
                                    ${jenis === "Strategic Pemda" && "border-black"}
                                    ${jenis === "Strategic" && "border-red-700"}
                                    ${jenis === "Tactical Pemda" && "border-black"}
                                    ${jenis === "Tactical" && "border-blue-500"}
                                    ${jenis === "Operational Pemda" && "border-black"}
                                    ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}    
                                `}
                            >
                                {opd ? opd : "-"}
                            </td>
                        </tr>
                    }
                    <tr>
                        <td
                            className={`min-w-[100px] border px-2 py-1 bg-white text-start rounded-bl-lg
                                ${jenis === "Tematik" && "border-black"}
                                ${jenis === "Sub Tematik" && "border-black"}
                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                ${jenis === "Super Sub Tematik" && "border-black"}
                                ${jenis === "Strategic Pemda" && "border-black"}
                                ${jenis === "Strategic" && "border-red-700"}
                                ${jenis === "Tactical Pemda" && "border-black"}
                                ${jenis === "Tactical" && "border-blue-500"}
                                ${jenis === "Operational Pemda" && "border-black"}
                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}    
                            `}
                        >
                            Keterangan
                        </td>
                        <td
                            className={`min-w-[300px] border px-2 py-3 bg-white text-start rounded-br-lg
                                ${jenis === "Tematik" && "border-black"}
                                ${jenis === "Sub Tematik" && "border-black"}
                                ${jenis === "Sub Sub Tematik" && "border-black"}
                                ${jenis === "Super Sub Tematik" && "border-black"}
                                ${jenis === "Strategic Pemda" && "border-black"}
                                ${jenis === "Strategic" && "border-red-700"}
                                ${jenis === "Tactical Pemda" && "border-black"}
                                ${jenis === "Tactical" && "border-blue-500"}
                                ${jenis === "Operational Pemda" && "border-black"}
                                ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}    
                            `}
                        >
                            {keterangan ? keterangan : "-"}
                        </td>
                    </tr>
                    {status &&
                        <tr>
                            <td
                                className={`min-w-[100px] border px-2 py-1 bg-white text-start rounded-bl-lg
                                    ${jenis === "Tematik" && "border-black"}
                                    ${jenis === "Sub Tematik" && "border-black"}
                                    ${jenis === "Sub Sub Tematik" && "border-black"}
                                    ${jenis === "Super Sub Tematik" && "border-black"}
                                    ${jenis === "Strategic Pemda" && "border-black"}
                                    ${jenis === "Strategic" && "border-red-700"}
                                    ${jenis === "Tactical Pemda" && "border-black"}
                                    ${jenis === "Tactical" && "border-blue-500"}
                                    ${jenis === "Operational Pemda" && "border-black"}
                                    ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}    
                                `}
                            >
                                Status
                            </td>
                            <td
                                className={`min-w-[300px] border px-2 py-3 bg-white text-start rounded-br-lg
                                    ${jenis === "Tematik" && "border-black"}
                                    ${jenis === "Sub Tematik" && "border-black"}
                                    ${jenis === "Sub Sub Tematik" && "border-black"}
                                    ${jenis === "Super Sub Tematik" && "border-black"}
                                    ${jenis === "Strategic Pemda" && "border-black"}
                                    ${jenis === "Strategic" && "border-red-700"}
                                    ${jenis === "Tactical Pemda" && "border-black"}
                                    ${jenis === "Tactical" && "border-blue-500"}
                                    ${jenis === "Operational Pemda" && "border-black"}
                                    ${(jenis === "Operational" || jenis === "Operational N") && "border-green-500"}    
                                `}
                            >
                                {status === 'menunggu_disetujui' ? (
                                    <div className="flex items-center">
                                        {status || "-"}
                                        <TbHourglass />
                                    </div>
                                ) : status === 'disetujui' ? (
                                    <div className="flex items-center text-green-500">
                                        {status || "-"}
                                        <TbCheck />
                                    </div>
                                ) : status === 'ditolak' ? (
                                    <div className="flex items-center text-red-500">
                                        {status || "-"}
                                        <TbCircleLetterXFilled />
                                    </div>
                                ) : (
                                    <span>{status || "-"}</span>
                                )}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
