'use client'

import React, { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { TbPencil, TbTrash, TbCircleX, TbCircleCheck, TbMistOff, TbMist, TbCirclePlus, TbHourglass } from "react-icons/tb";
import { ButtonBlackBorder, ButtonSkyBorder, ButtonGreen, ButtonRed } from "@/components/global/Button";
import { AlertQuestion, AlertNotification } from "@/components/global/Alert";
import { useBrandingContext } from "@/context/BrandingContext";
import { ModalProgramUnggulan } from "./ModalProgramUnggulan";
import { ModalOpdProgramUnggulan } from "./ModalOpdProgramUnggulan";

interface Table {
    tahun_awal: string;
    tahun_akhir: string;
}
interface ProgramUnggulan {
    id: number;
    kode_program_unggulan: string;
    nama_program_unggulan: string;
    is_active: boolean;
    rencana_implementasi: string;
    keterangan: string;
    opd_list: OpdList[];
    tahun_awal: string;
    tahun_akhir: string;
    tahun_terpakai: string[];
}
interface OpdList {
    id: number;
    nama_opd: string;
    kode_opd: string;
}

export const Table: React.FC<Table> = ({ tahun_akhir, tahun_awal }) => {
    const token = getToken();

    const [Data, setData] = useState<ProgramUnggulan[]>([]);
    const [Loading, setLoading] = useState<boolean>(false);
    const [DataNull, setDataNull] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const [DataEdit, setDataEdit] = useState<any>(null);
    const [ModalEdit, setModalEdit] = useState<boolean>(false);
    const [ModalBaru, setModalBaru] = useState<boolean>(false);

    const [ModalOpd, setModalOpd] = useState<boolean>(false);
    const [KodeProgram, setKodeProgram] = useState<string>('');

    const handleModalEdit = (data: ProgramUnggulan | null) => {
        if (ModalEdit) {
            setModalEdit(false);
            setDataEdit(null);
        } else {
            setModalEdit(true);
            setDataEdit(data);
        }
    }
    const handleModalBaru = () => {
        if (ModalBaru) {
            setModalBaru(false);
        } else {
            setModalBaru(true);
        }
    }
    const handleModalOpd = (kode_program: string) => {
        if (ModalOpd) {
            setModalOpd(false);
            setKodeProgram(kode_program);
        } else {
            setModalOpd(true);
            setKodeProgram(kode_program);
        }
    }

    useEffect(() => {
        const fetchProgramUnggulan = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/program_unggulan/findall/${tahun_awal}/${tahun_akhir}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                if (result.code === 200) {
                    if (data.length === 0) {
                        setDataNull(true);
                    } else {
                        setDataNull(false);
                        setData(data);
                        setError(false);
                    }
                } else {
                    setError(true);
                    setData([]);
                }
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
                setError(false);
            }
        }
        fetchProgramUnggulan();
    }, [tahun_akhir, tahun_awal, token, FetchTrigger]);

    const hapusProgramUnggulan = async (id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/program_unggulan/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                alert("cant fetch data")
            }
            setData(Data.filter((data) => (data.id !== id)))
            AlertNotification("Berhasil", "Data Program Unggulan Berhasil Dihapus", "success", 1000);
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">Error, Periksa koneksi internet atau database server, jika error berlanjut silakan hubungi tim developer</h1>
            </div>
        )
    }

    return (
        <>
            <ButtonSkyBorder
                className="m-3 flex items-center gap-1"
                onClick={handleModalBaru}
            >
                <TbCirclePlus />
                Tambah Program
            </ButtonSkyBorder>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="border-r border-b px-6 py-3 text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Nama Program Prioritas Daerah</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Rencana Implementasi</th>
                            <th className="border-r border-b px-6 py-3 min-w-[150px]">Status</th>
                            <th className="border-r border-b px-6 py-3 min-w-[250px]">OPD</th>
                            <th className="border-r border-b px-6 py-3 min-w-[150px]">Periode</th>
                            <th className="border-r border-b px-6 py-3 min-w-[150px]">Tahun Terpakai</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Keterangan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[150px]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataNull ? (
                            <tr>
                                <td className="px-6 py-3" colSpan={30}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        ) : (
                            Data.map((item: ProgramUnggulan, index: number) => (
                                <tr key={index}>
                                    <td className="border-x border-b border-green-500 py-4 px-3 text-center">{index + 1}</td>
                                    <td className="border-r border-b border-green-500 px-6 py-4 font-semibold">{item.nama_program_unggulan || "-"}</td>
                                    <td className="border-r border-b border-green-500 px-6 py-4">{item.rencana_implementasi || "-"}</td>
                                    <td className="border-r border-b border-green-500 px-6 py-4">
                                        {item.is_active ?
                                            <p className="flex items-center gap-1">
                                                <TbCircleCheck />
                                                Digunakan
                                            </p>
                                            :
                                            <p className="flex items-center gap-1">
                                                <TbHourglass />
                                                Pending
                                            </p>
                                        }
                                    </td>
                                    <RowOpd opd={item.opd_list} kode_program={item.kode_program_unggulan} />
                                    <td className="border-r border-b border-green-500 px-6 py-4 text-center">{item.tahun_awal || "-"} - {item.tahun_akhir || "-"}</td>
                                    <td className="border-r border-b border-green-500 px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            {item.tahun_terpakai?.map((tt: string, tt_index: number) => (
                                                <p key={tt_index} className="p-2 bg-green-500 text-white rounded-lg">{tt || "tahun tidak diketahui"}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="border-r border-b border-green-500 px-6 py-4">{item.keterangan || "-"}</td>
                                    <td className="border-r border-b border-green-500 px-6 py-4">
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <ButtonGreen
                                                className="flex items-center gap-1 w-full"
                                                onClick={() => handleModalEdit(item)}
                                            >
                                                <TbPencil />
                                                Edit
                                            </ButtonGreen>
                                            <ButtonBlackBorder
                                                className="w-full flex items-center gap-1"
                                                onClick={() => handleModalOpd(item.kode_program_unggulan)}
                                            >
                                                <TbCirclePlus />
                                                OPD
                                            </ButtonBlackBorder>
                                            <ButtonRed className="flex items-center gap-1 w-full" onClick={() => {
                                                AlertQuestion("Hapus?", "Hapus Program Unggulan yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                    if (result.isConfirmed) {
                                                        hapusProgramUnggulan(item.id);
                                                    }
                                                });
                                            }}>
                                                <TbTrash />
                                                Hapus
                                            </ButtonRed>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {ModalBaru &&
                <ModalProgramUnggulan
                    jenis="baru"
                    onClose={() => handleModalBaru()}
                    isOpen={ModalBaru}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    tahun_awal={tahun_awal}
                    tahun_akhir={tahun_akhir}
                />
            }
            {ModalEdit &&
                <ModalProgramUnggulan
                    jenis="edit"
                    onClose={() => handleModalEdit(null)}
                    isOpen={ModalEdit}
                    dataEdit={DataEdit}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    tahun_awal={tahun_awal}
                    tahun_akhir={tahun_akhir}
                />
            }
            {ModalOpd &&
                <ModalOpdProgramUnggulan
                    isOpen={ModalOpd}
                    onClose={() => setModalOpd(false)}
                    kode_program={KodeProgram}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                />
            }
        </>
    )
}

interface RowOpd {
    opd: OpdList[];
    kode_program: string;
}
export const RowOpd: React.FC<RowOpd> = ({ opd, kode_program }) => {

    const [OpdList, setOpdList] = useState<OpdList[]>(opd || []);
    const { branding } = useBrandingContext();
    const token = getToken();

    const deleteOpd = async (id: number) => {
        try {
            const response = await fetch(`${branding?.api_perencanaan}/program_unggulan/deleteopd/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.code === 200) {
                setOpdList(OpdList.filter((data) => (data.id !== id)))
                AlertNotification("Berhasil", "Data Program Unggulan Berhasil Dihapus", "success", 1000);
            } else {
                AlertNotification("Gagal", `${result.data}`, "error", 1000);
            }
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet, ", "error", 1000);
        }
    }

    return (
        <>
            {OpdList.length === 0 ?
                <td className="border-r border-b border-green-500 px-2 py-2 text-center">-</td>
                :
                <td className="border-r border-b p-4 border-green-500">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center gap-4">
                            {OpdList.map((item: OpdList, index: number) => (
                                <div className="flex flex-col items-center gap-1 border border-green-500 rounded-lg p-3">
                                    <p key={index} className="flex items-center gap-1">
                                        {item.nama_opd || "-"}
                                    </p>
                                    <button
                                        className="border border-red-500 rounded-full p-1 text-red-500 cursor-pointer hover:bg-red-700 hover:text-white"
                                        onClick={() => AlertQuestion("Hapus", `Hapus OPD ${item.nama_opd || "-"}`, "question", "Hapus", "Batal").then((resp) => {
                                            if (resp.isConfirmed) {
                                                deleteOpd(item.id)
                                            }
                                        })}
                                    >
                                        <TbTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </td>
            }
        </>
    )
}
