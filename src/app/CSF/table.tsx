'use client'

import { ButtonRedBorder, ButtonGreenBorder } from "@/components/global/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { LoadingClip, LoadingButtonClip2 } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { getToken } from "@/components/lib/Cookie";
import { ModalCSF } from "./ModalCSF";

interface tematik {
    id: number;
    parent: number;
    tema: string;
    keterangan: string;
    indikator: indikator[];
}
interface DataTerukur {
    id: number;
    data_terukur: string;
}

interface AlasanKondisi {
    id: number;
    alasan_kondisi_strategis: string;
    data_terukur: DataTerukur[];
}

interface CSF {
    id: number;
    pohon_id: number;
    pernyataan_kondisi_strategis: string;
    alasan_kondisi: AlasanKondisi[];
}
interface indikator {
    id_indikator: string;
    nama_indikator: string;
    targets: target[];
}
type target = {
    id_target: string;
    target: string;
    satuan: string;
}
interface Table {
    tahun: number;
}

export const Table: React.FC<Table> = ({ tahun }) => {

    const [Tematik, setTematik] = useState<tematik[]>([]);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const token = getToken();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchTematik = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/tematik_pemda/${tahun}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data.tematiks;
                if (data == null) {
                    setDataNull(true);
                    setTematik([]);
                } else if (data.code == 500) {
                    setError(true);
                    setTematik([]);
                } else {
                    setDataNull(false);
                    setTematik(data);
                }
                setTematik(data);
            } catch (err) {
                setError(true);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        if (tahun != undefined) {
            fetchTematik();
        }
    }, [tahun, token, FetchTrigger]);

    const hapusTematik = async (id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/pohon_kinerja_admin/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (!response.ok) {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
                console.error(result);
            } else {
                setTematik(Tematik.filter((data) => (data.id !== id)))
                AlertNotification("Berhasil", "Data Tematik Berhasil Dihapus", "success", 1000);
            }
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
                <h1 className="text-red-500 mx-5 py-5">Reload Halaman, Periksa koneksi internet atau database server</h1>
            </div>
        )
    }

    return (
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-sky-700 text-white">
                            <th className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Peryataan kondisi strategis (Isu Strategis)</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Alasan Sebagai Kondisi Strategis</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Data Terukur Pendukung Pernyataan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[100px]">Aksi</th>
                            <th className="border-r border-b px-6 py-3 min-w-[300px]">Kondisi Terukur Yang Diharapkan (Tema)</th>
                            <th className="border-l border-b px-6 py-3 min-w-[200px]">Indikator</th>
                            <th className="border-l border-b px-6 py-3 min-w-[200px]">Target/Satuan</th>
                            <th className="border-l border-b px-6 py-3 min-w-[200px]">Keterangan</th>
                            <th className="border-l border-b px-6 py-3 min-w-[100px]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataNull ?
                            <tr>
                                <td className="px-6 py-3 uppercase" colSpan={13}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                            :
                            Tematik.map((data, index: number) => (
                                <React.Fragment key={data.id}>
                                    <tr>
                                        <td rowSpan={data.indikator ? data.indikator.length : 1}
                                            className="border-r border-b bg-blue-100 border-white px-6 py-4 text-center"
                                        >
                                            {index + 1}
                                        </td>
                                        <TableTematik data={data} rowSpan={data.indikator ? data.indikator.length : 1} onDelete={() => hapusTematik(data.id)} />
                                    </tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

interface RowPernyatan {
    rowSpan: number;
    pernyataan_kondisi_strategis: string;
    id_pohon: number;
    hapusCsf: () => void;
    handleModal: () => void;
}
export const RowPernyatan: React.FC<RowPernyatan> = ({ rowSpan, pernyataan_kondisi_strategis, id_pohon, hapusCsf, handleModal }) => {
    return (
        <>
            <td rowSpan={rowSpan}
                className="border-r border-b bg-blue-100 border-white px-6 py-4"
            >
                {pernyataan_kondisi_strategis || "-"}
            </td>
            <td className="h-0"></td>
            <td className="h-0"></td>
            <td
                rowSpan={rowSpan}
                className="border-r border-b bg-blue-100 border-white px-6 py-4 text-center"
            >
                <AksiCsf
                    buttonDelete={true}
                    onDelete={hapusCsf}
                    onEdit={handleModal}
                />
            </td>
        </>
    )
}
interface RowAlasanKondisi {
    alasan_kondisi: AlasanKondisi[];
}
export const RowAlasanKondisi: React.FC<RowAlasanKondisi> = ({ alasan_kondisi }) => {
    return (
        <>
            {alasan_kondisi.map((a: AlasanKondisi, a_index: number) => (
                <tr key={a_index}>
                    <td className="border-r border-b bg-blue-100 border-white px-6 py-4">
                        {a.alasan_kondisi_strategis || "-"}
                    </td>
                    {a.data_terukur && a.data_terukur.length > 0 ? (
                        <td className="border-r border-b bg-blue-100 border-white px-6 py-4">
                            {a.data_terukur.map((dt: DataTerukur, dt_index: number) => (
                                <p key={dt_index} className={`py-2 ${a.data_terukur.length > 1 && dt_index < a.data_terukur.length - 1 ? "border-b border-white" : ""}`}>
                                    {dt.data_terukur || "-"}
                                </p>
                            ))}
                        </td>
                    ) : (
                        <td className="border-r border-b bg-blue-100 border-white px-6 py-4">
                            <p>-</p>
                        </td>
                    )}
                </tr>
            ))
            }
        </>
    )
}
interface AksiCSF {
    buttonDelete: boolean;
    onDelete: () => void;
    onEdit: () => void;
}
export const AksiCsf: React.FC<AksiCSF> = ({ buttonDelete, onDelete, onEdit }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <ButtonGreenBorder
                className="flex items-center gap-1 w-full"
                onClick={onEdit}
            >
                <TbPencil />
                CSF
            </ButtonGreenBorder>
            {buttonDelete &&
                <ButtonRedBorder
                    className="flex items-center gap-1 w-full"
                    onClick={() => {
                        AlertQuestion("Hapus?", "Hapus CSF yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                            if (result.isConfirmed) {
                                onDelete();
                            }
                        });
                    }}
                >
                    <TbTrash />
                    Hapus
                </ButtonRedBorder>
            }
        </div>
    )
}
interface TableTematik {
    data: tematik;
    rowSpan?: number;
    onDelete: () => void;
}
export const TableTematik: React.FC<TableTematik> = ({ data, rowSpan, onDelete }) => {

    const [Loading, setLoading] = useState<boolean>(false);
    const [DataCSF, setDataCSF] = useState<any[]>([]);
    const [ErrorCSF, setErrorCSF] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [JenisModal, setJenisModal] = useState<string>("");
    const [DataToEdit, setDataToEdit] = useState<any>(null);
    const [DataTematik, setDataTematik] = useState<tematik | null>(null);

    useEffect(() => {
        const fetchCSF = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL_CSF;
            setLoading(true);
            setErrorCSF(false);
            try {
                const response = await fetch(`${API_URL}/csf/${data.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (result.code === 200 || result.code === 201) {
                    console.log(result.data);
                    setDataCSF(result.data);
                    setErrorCSF(false);
                } else {
                    console.log(result.data);
                    setDataCSF([]);
                    setErrorCSF(true);
                }
            } catch (err) {
                console.error(err);
                setErrorCSF(true);
            } finally {
                setLoading(false);
            }
        }
        fetchCSF();
    }, [data, FetchTrigger]);

    const hapusCsf = async (id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL_CSF;
        try {
            const response = await fetch(`${API_URL}/csf/${id}`, {
                method: "DELETE",
                headers: {
                    // Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (!response.ok) {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
                console.error(result);
            } else {
                AlertNotification("Berhasil", "Data CSF Berhasil dihapus", "success", 1000);
                setFetchTrigger((prev) => !prev);
            }
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };
    const handleModal = (jenis: string, tematik: tematik | null, data?: any) => {
        if (ModalOpen) {
            setModalOpen(false);
            setJenisModal("");
            setDataToEdit(null);
            setDataTematik(null);
        } else {
            setModalOpen(true);
            setJenisModal(jenis);
            setDataToEdit(data);
            setDataTematik(tematik);
        }
    }

    return (
        <React.Fragment>
            {Loading ?
                <td rowSpan={rowSpan} colSpan={5} className="border-r border-b px-6 py-4 text-center">
                    <div className="flex items-center gap-1">
                        <LoadingButtonClip2 />
                        Memuat data CSF
                    </div>
                </td>
                :
                DataCSF ?
                    // DATA CSF ADA
                    (DataCSF.map((csf: CSF, index: number) => (
                        <React.Fragment key={index}>
                            <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">{csf.pernyataan_kondisi_strategis || "-"}</td>
                            {/* ALASAN */}
                            {csf.alasan_kondisi ?
                                csf.alasan_kondisi.map((ak: AlasanKondisi, sub_index: number) => (
                                    <React.Fragment key={sub_index}>
                                        <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">{ak.alasan_kondisi_strategis || "_"}</td>
                                        {ak.data_terukur.map((dt: DataTerukur, sub_sub_index: number) => (
                                            <React.Fragment key={sub_sub_index}>
                                                <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">{dt.data_terukur || "-"}</td>
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))
                                :
                                <>
                                    <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">-</td>
                                    <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">-</td>
                                </>
                            }
                            <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <ButtonGreenBorder
                                        className="flex items-center gap-1 w-full"
                                        onClick={() => handleModal("edit", data, csf)}
                                    >
                                        <TbPencil />
                                        CSF
                                    </ButtonGreenBorder>
                                    <ButtonRedBorder
                                        className="flex items-center gap-1 w-full"
                                        onClick={() => {
                                            AlertQuestion("Hapus?", "Hapus CSF yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                if (result.isConfirmed) {
                                                    hapusCsf(csf.id);
                                                }
                                            });
                                        }}
                                    >
                                        <TbTrash />
                                        Hapus
                                    </ButtonRedBorder>
                                </div>
                            </td>
                        </React.Fragment>
                    )))
                    :
                    // DATA CSF TIDAK ADA / ERROR
                    (ErrorCSF ?
                        <td rowSpan={rowSpan} colSpan={4} className="border-r border-b bg-blue-100 px-6 py-4 text-center text-red-300 italic">*Error saat memuat data CSF</td>
                        :
                        <>
                            <td rowSpan={rowSpan} colSpan={3} className="border-r border-b bg-blue-100 px-6 py-4 text-center italic">CSF Kosong / belum di tambahkan</td>
                            <td rowSpan={rowSpan} className="border-r bg-blue-100 border-b px-6 py-4 text-center">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <ButtonGreenBorder
                                        className="flex items-center gap-1 w-full"
                                        onClick={() => handleModal("baru", data)}
                                    >
                                        <TbPencil />
                                        CSF
                                    </ButtonGreenBorder>
                                </div>
                            </td>
                        </>
                    )
            }
            <td rowSpan={rowSpan} className="border-r border-b px-6 py-4 text-center">{data.tema || "-"} ({data.id})</td>
            {data.indikator ?
                <>
                    <td rowSpan={rowSpan} className="border-r border-b px-6 py-4 text-center">
                        {data.indikator.map((item: indikator) => (
                            <p
                                key={item.id_indikator}
                                className={`${data.indikator.length > 1 && "border-b"} py-3`}
                            >
                                {item.nama_indikator || "-"}
                            </p>
                        ))}
                    </td>
                    <td rowSpan={rowSpan} className="border-r border-b px-6 py-4 text-center">
                        {data.indikator.map((item: indikator) => (
                            item.targets.map((t: target) => (
                                <p
                                    key={t.id_target}
                                    className={`${data.indikator.length > 1 && "border-b"} py-3`}
                                >
                                    {t.target} / {t.satuan}
                                </p>
                            ))
                        ))}
                    </td>
                </>
                :
                <>
                    <td rowSpan={rowSpan} className="border-r border-b px-6 py-4 text-center">-</td>
                    <td rowSpan={rowSpan} className="border-r border-b px-6 py-4 text-center">-</td>
                </>
            }
            <td rowSpan={rowSpan} className="border-r border-b px-6 py-4 text-center">{data.keterangan ? data.keterangan : "-"}</td>
            <td rowSpan={rowSpan} className="border-r border-b px-6 py-4">
                <div className="flex flex-col jutify-center items-center gap-2">
                    <ButtonGreenBorder
                        className="flex items-center gap-1 w-full"
                        halaman_url={`/tematikpemda/${data.id}`}
                    >

                        <TbPencil />
                        Tema
                    </ButtonGreenBorder>
                    <ButtonRedBorder
                        className="flex items-center gap-1 w-full"
                        onClick={() => {
                            AlertQuestion("Hapus?", "Data Tematik dan CSF akan di hapus?", "question", "Hapus", "Batal").then((result) => {
                                if (result.isConfirmed) {
                                    onDelete
                                }
                            });
                        }}
                    >
                        <TbTrash />
                        Hapus
                    </ButtonRedBorder>
                </div>
            </td>
            {ModalOpen &&
                <ModalCSF
                    isOpen={ModalOpen}
                    onClose={() => handleModal("", null)}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    jenis={JenisModal}
                    data={DataToEdit}
                    tematik={DataTematik}
                />
            }
        </React.Fragment>
    )
}

