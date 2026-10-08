'use client'

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip } from "@/components/global/Loading";
import { AlertNotification } from "@/components/global/Alert";
import { TbDeviceFloppy, TbX } from "react-icons/tb";

interface FormValue {
    id: number;
    id_tujuan_opd: number;
    keterangan: string;
    review: string;
}
interface ReviewTujuan {
    id: number;
    id_tujuan_opd: number;
    id_pohon_kinerja: number;
    review: string;
    keterangan: string;
    created_by: string;
    nama_pegawai: string;
}

interface modal {
    isOpen: boolean;
    onClose: () => void;
    id_tujuan: number;
    nama_tujuan: string;
    Data: ReviewTujuan;
    metode: "tambah" | "edit"
    onSuccess: () => void;
}


export const ModalCatatanTujuanOpd: React.FC<modal> = ({ isOpen, onClose, id_tujuan, Data, nama_tujuan, onSuccess, metode }) => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            review: Data?.review,
            keterangan: "-"
        }
    });

    const token = getToken();
    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const payload_post = {
            //key : value
            id_tujuan_opd: id_tujuan,
            review: data.review,
            keterangan: "-"
        };
        const payload_put = {
            //key : value
            id: data.id,
            review: data.review,
            keterangan: "-"
        };
        const getBody = () => {
            if (metode === "edit") return payload_put;
            if (metode === "tambah") return payload_post;
            return {}; // Default jika metode tidak sesuai
        };
        // metode === 'baru' && console.log("baru :", formDataNew);
        // metode === 'lama' && console.log("lama :", formDataEdit);
        try {
            let url = "";
            if (metode === "tambah") {
                url = `review_tujuan_opd/create/${id_tujuan}`;
            } else {
                url = `review_tujuan_opd/update/${Data?.id}`;
            }
            setProses(true);
            const response = await fetch(`${API_URL}/${url}`, {
                method: metode === "tambah" ? "POST" : "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getBody()),
            });
            const result = await response.json();
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", `Berhasil menyimpan Anggaran Renaksi`, "success", 1000);
                onClose();
                onSuccess();
            } else {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
            }
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
        } finally {
            setProses(false);
        }
    };

    const handleClose = () => {
        onClose();
    }

    if (!isOpen) {
        return null;
    } else {

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
                <div className={`bg-white rounded-lg p-8 z-10 w-4/5`}>
                    <div className="w-max-[500px] py-2 border-b">
                        <h1 className="text-xl uppercase text-center">Catatan / Review Tujuan OPD{Data?.id || "unknown id"}</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2">
                                Tujuan :
                            </label>
                            <div className="border px-4 py-2 rounded-lg">{nama_tujuan || "-"}</div>
                        </div>
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-medium text-gray-700 my-2" htmlFor="review">Review</label>
                            <Controller
                                name="review"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="review"
                                        placeholder="Masukkan review untuk tujuan opd"
                                    />
                                )}
                            />
                        </div>
                        <ButtonSky className="w-full mt-3 mb-2" type="submit" disabled={Proses}>
                            {Proses ?
                                <span className="flex items-center gap-1">
                                    <LoadingButtonClip />
                                    Menyimpan...
                                </span>
                                :
                                <span className="flex items-center gap-1">
                                    <TbDeviceFloppy />
                                    Simpan
                                </span>
                            }
                        </ButtonSky>
                        <ButtonRed className="w-full mb-3" onClick={handleClose}>
                            <span className="flex items-center gap-1">
                                <TbX />
                                Batal
                            </span>
                        </ButtonRed>
                    </form>
                </div>
            </div>
        )
    }
}