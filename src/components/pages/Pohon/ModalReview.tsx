'use client'

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { AlertNotification } from "@/components/global/Alert";
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip } from "@/components/global/Loading";
import { useBrandingContext } from "@/context/BrandingContext";
import { TbCheck, TbDeviceFloppy, TbX } from "react-icons/tb";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | null;
    idPohon: number;
    Data?: Review | null;
    jenis?: "baru" | "lama";
    pokin: "pemda" | "opd";
    onSuccess: () => void;
}

interface Review {
    id: number;
    id_pohon_kinerja: number;
    review: string;
    catatan: string;
    keterangan: string;
    substansi: string;
    nama_pegawai: string;
    created_by: string;
}

interface FormValue {
    id: number;
    id_pohon_kinerja: number;
    review: string;
    catatan: string;
    substansi: string;
    keterangan: string;
}

export const ModalReview: React.FC<ModalProps> = ({ isOpen, onClose, id, jenis, idPohon, onSuccess, pokin, Data }) => {
    const { branding } = useBrandingContext();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            id: id ?? Data?.id ?? 0,
            id_pohon_kinerja: idPohon ?? Data?.id_pohon_kinerja ?? 0,
            substansi: Data?.substansi,
            review: Data?.review,
            catatan: Data?.catatan,
            keterangan: Data?.keterangan
        }
    });
    const [Proses, setProses] = useState<boolean>(false);
    const token = getToken();

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        let endpoint = "";
        if (jenis === "lama") {
            endpoint = `review_pokin/update/${id}`;
        } else if (jenis === "baru") {
            endpoint = `review_pokin/create/${idPohon}`;
        } else {
            endpoint = '';
        }
        const formData = {
            //key : value
            id_pohon_kinerja: idPohon,
            review: data.review,
            catatan: data.catatan,
            substansi: data.substansi,
            keterangan: data.keterangan,
            jenis_pokin: pokin === "pemda" ? "pokin_pemda" : "pokin_opd",
        };
        // console.log(formData);
        // console.log("endpoint", endpoint);
        try {
            setProses(true);
            const response = await fetch(`${branding?.api_perencanaan}/${endpoint}`, {
                method: jenis === 'lama' ? "PUT" : "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", jenis === 'baru' ? "Berhasil menambahkan review pohon" : "Berhasil mengupdate crosscutting", "success", 1000);
                handleClose();
                onSuccess();
            } else {
                console.log(result);
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
            }
        } catch (err) {
            AlertNotification("Gagal", "Cek koneksi internet / terdapat kesalahan pada server", "error", 2000);
            console.error(err);
        } finally {
            setProses(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
            <div className="bg-white rounded-lg p-8 z-10 w-3/5 text-start">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-max-[500px] py-2 border-b font-bold text-center uppercase">
                        {jenis === 'baru' ? "Tambah Review" : "Edit Review"} Pohon
                    </div>

                    {/* REVIEW ADALAH KELENGKAPAN */}
                    <p className="uppercase text-xs font-medium text-gray-700 my-3">Kelengkapan</p>
                    <Controller
                        name="review"
                        control={control}
                        rules={{ required: "Wajib Dipilih" }}
                        render={({ field }) => {
                            const ya = "Lengkap";
                            const tidak = "Tidak Lengkap";
                            return (
                                <>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => field.onChange(ya)}
                                            className={`min-w-[200px] flex items-center justify-center gap-1 p-1 rounded-lg border-2 border-green-500 ${field.value === ya ? "bg-green-500 text-white" : "text-green-500 hover:bg-green-100"}`}
                                        >
                                            <TbCheck />
                                            {ya}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => field.onChange(tidak)}
                                            className={`min-w-[200px] flex items-center justify-center gap-1 p-1 rounded-lg border-2 border-red-500 ${field.value === tidak ? "bg-red-500 text-white" : "text-red-500 hover:bg-red-100"}`}
                                        >
                                            <TbX />
                                            {tidak}
                                        </button>
                                    </div>
                                    {errors.review &&
                                        <p className="text-sm italic text-red-400">{errors.review.message}</p>
                                    }
                                </>
                            );
                        }}
                    />
                    {/* CATATAN ADALAH KESESUAIAN LEVEL */}
                    <p className="uppercase text-xs font-medium text-gray-700 my-3">Kesesuaian Level</p>
                    <Controller
                        name="catatan"
                        control={control}
                        render={({ field }) => {
                            const ya = "Sesuai";
                            const tidak = "Tidak Sesuai";
                            return (
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => field.onChange(ya)}
                                        className={`min-w-[200px] flex items-center justify-center gap-1 p-1 rounded-lg border-2 border-green-500 ${field.value === ya ? "bg-green-500 text-white" : "text-green-500 hover:bg-green-100"}                       `}
                                    >
                                        <TbCheck />
                                        {ya}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => field.onChange(tidak)}
                                        className={`min-w-[200px] flex items-center justify-center gap-1 p-1 rounded-lg border-2 border-red-500  ${field.value === tidak ? "bg-red-500 text-white" : "text-red-500 hover:bg-red-100"}`}
                                    >
                                        <TbX />
                                        {tidak}
                                    </button>
                                </div>
                            );
                        }}
                    />
                    <p className="uppercase text-xs font-medium text-gray-700 my-3">Substansi</p>
                    <Controller
                        name="substansi"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="w-full border px-4 py-2 rounded-lg"
                                id="substansi"
                                placeholder="Masukkan review mengenai substansi"
                            />
                        )}
                    />

                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-medium text-gray-700 my-2" htmlFor="keterangan">Keterangan</label>
                        <Controller
                            name="keterangan"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="border px-4 py-2 rounded-lg"
                                    id="keterangan"
                                    placeholder="Masukkan keterangan"
                                />
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <ButtonRed type="button" className="w-full my-3 flex items-center gap-1" onClick={handleClose}>
                            <TbX />
                            Batal
                        </ButtonRed>
                        <ButtonSky type="submit" className="w-full my-3">
                            {Proses ?
                                <span className="flex">
                                    <LoadingButtonClip />
                                    {jenis === 'baru' ? "Menambahkan" : "Menyimpan"}
                                </span>
                                :
                                <span className="flex items-center gap-1">
                                    <TbDeviceFloppy />
                                    {jenis === 'baru' ? "Tambah" : "Simpan"}
                                </span>
                            }
                        </ButtonSky>
                    </div>
                </form>
            </div>
        </div>
    );
};
