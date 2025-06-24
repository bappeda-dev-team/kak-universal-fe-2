'use client'

import { ButtonRed, ButtonGreen } from "@/components/global/Button";
import { useEffect, useState } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { getOpdTahun } from "@/components/lib/Cookie";
import { TahunNull } from "@/components/global/OpdTahunNull";
import { getToken } from "@/components/lib/Cookie";

interface tematik {
    id: number;
    outcome_yang_ingin_diwujudkan: string;
    penyebab_permasalahan: string;
    data_terukur: string;
    kondisi_terukur: string;
    kondisi_yang_diperlukan: string;
}

const Table = () => {

    const [Tematik, setTematik] = useState<tematik[]>([]);
    const [Loading, setLoading] = useState<boolean | null>(null);
    const [Error, setError] = useState<boolean | null>(null);
    const [DataNull, setDataNull] = useState<boolean | null>(null);
    const [Tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const token = getToken();
    
    useEffect(() => {
        const data = getOpdTahun();
        if(data.tahun){
            const tahun = {
                value: data.tahun.value,
                label: data.tahun.label,
            }
            setTahun(tahun);
        }
        if(data.opd){
            const opd = {
                value: data.opd.value,
                label: data.opd.label,
            }
            setSelectedOpd(opd);
        }
    },[]);
    
    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchTematik = async() => {
            setLoading(true)
            try{
                const response = await fetch(`${API_URL}/pohon_kinerja_admin/findall/${Tahun?.value}`, {
                    headers: {
                      Authorization: `${token}`,
                      'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data.tematiks;
                if(data == null){
                    setDataNull(true);
                    setTematik([]);
                } else if(data.code == 500){
                    setError(true);
                    setTematik([]);
                } else {
                    setDataNull(false);
                    setTematik(data);
                }
                setTematik(data);
            } catch(err){
                setError(true);
                console.error(err)
            } finally{
                setLoading(false);
            }
        }
        if(Tahun?.value != undefined){   
            fetchTematik();
        }
    }, [Tahun, token]);

    const hapusTematik = async(id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/pohon_kinerja_admin/delete/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
                },
            })
            if(!response.ok){
                alert("cant fetch data")
            }
            setTematik(Tematik.filter((data) => (data.id !== id)))
            AlertNotification("Berhasil", "Data lembaga Berhasil Dihapus", "success", 1000);
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    if(Loading){
        return (    
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5"/>
            </div>
        );
    } else if(Error){
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 mx-5 py-5">Reload Halaman, Periksa koneksi internet atau database server</h1>
            </div>
        )
    } else if(Tahun?.value == undefined){
        return <TahunNull />
    }

    return(
        <>
            <div className="overflow-auto m-2 rounded-t-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-sky-700 text-white">
                            <th className="border-r border-b px-6 py-3 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Outcome Yang Ingin Diwujudkan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Faktor yang Berpengaruh Terhadap Capaian Outcome/Penyebab Permasalahan(CSF)</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Data Terukur Terkait CSF</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Kondisi Terukur Yang Diharapkan</th>
                            <th className="border-r border-b px-6 py-3 min-w-[200px]">Kondisi Yang Diperlukan Untuk Mencapai Outcome/Mengatasi Permasalahan (Intermediate Outcome)</th>
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
                        Tematik.map((data, index) => (
                        <tr key={data.id}>
                            <td className="border-r border-b px-6 py-4 text-center">{index + 1}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.outcome_yang_ingin_diwujudkan || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.penyebab_permasalahan || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.data_terukur || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.kondisi_terukur || "-"}</td>
                            <td className="border-r border-b px-6 py-4 text-center">{data.kondisi_yang_diperlukan || "-"}</td>
                            <td className="border-r border-b px-6 py-4">
                                <div className="flex flex-col jutify-center items-center gap-2">
                                    <ButtonGreen className="w-full" halaman_url={`/outcome/${data.id}`}>Edit</ButtonGreen>
                                    <ButtonRed 
                                        className="w-full"
                                        onClick={() => {
                                            AlertQuestion("Hapus?", "Hapus tematik pemda yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    hapusTematik(data.id);
                                                }
                                            });
                                        }}
                                    >
                                        Hapus
                                    </ButtonRed>
                                </div>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;
