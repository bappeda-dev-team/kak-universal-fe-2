'use client'

import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { AlertNotification } from "@/components/global/Alert";
import { getToken } from "@/components/lib/Cookie";
import { LoadingClip, LoadingButtonClip } from "@/components/global/Loading";
import { useBrandingContext } from "@/context/BrandingContext";
import Select from "react-select";
import { OptionTypeString } from "@/types";
import { TbCheck, TbDeviceFloppy, TbX } from "react-icons/tb";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | null;
    idPohon: number;
    jenis?: "baru" | "lama";
    pokin: "pemda" | "opd";
    onSuccess: () => void;
}

interface FormValue {
    id: number;
    id_pohon_kinerja: number;
    review: OptionTypeString | null;
    catatan: string;
    keterangan: string;
}

export const ModalReview: React.FC<ModalProps> = ({ isOpen, onClose, id, jenis, idPohon, onSuccess, pokin }) => {
    const { branding } = useBrandingContext();
    const { control, handleSubmit, reset } = useForm<FormValue>();

    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);
    const token = getToken();

    useEffect(() => {
        const fetchDetailReview = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                const response = await fetch(`${branding?.api_perencanaan}/review_pokin/detail/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Terjadi kesalahan pada koneksi backend');
                }

                const result = await response.json();
                const data = result.data;

                reset({
                    review: data.review || '',
                    keterangan: data.keterangan || '',
                });

            } catch (err) {
                console.error(err, 'Gagal mengambil data sesuai id pohon');
            } finally {
                setIsLoading(false);
            }
        };

        if ((jenis === 'lama') && isOpen) {
            fetchDetailReview();
        } else {
            reset({ review: null, catatan: '', keterangan: '' });
        }
    }, [id, isOpen, jenis, reset, token]);

    const ValueReview = useWatch({
        name: "review",
        control
    })

    const handleClose = () => {
        reset({ review: null, keterangan: '', catatan: "" });
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
            review: data.review?.value,
            catatan: data.catatan,
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
                AlertNotification("Berhasil", jenis === 'baru' ? "Berhasil menambahkan crosscutting" : "Berhasil mengupdate crosscutting", "success", 1000);
                onClose();
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

    const optionReview = [
        { value: "Kesesuaian", label: "Kesesuaian" },
        { value: "Kelengkapan", label: "Kelengkapan" },
        { value: "Substansi", label: "Substansi" }
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
            <div className="bg-white rounded-lg p-8 z-10 w-3/5 text-start">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-max-[500px] py-2 border-b font-bold text-center uppercase">
                        {jenis === 'baru' ? "Tambah Review" : "Edit Review"} Pohon
                    </div>

                    {IsLoading ?
                        <LoadingClip />
                        :
                        <>
                            <div className="flex flex-col py-3">
                                <label className="uppercase text-xs font-medium text-gray-700 my-2" htmlFor="review">Review</label>
                                <Controller
                                    name="review"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={optionReview}
                                            id="review"
                                            placeholder="Pilih jenis review"
                                            isClearable
                                        />
                                    )}
                                />
                            </div>

                            {(ValueReview?.value === "Kesesuaian" || ValueReview?.value === "Kelengkapan") ?
                                <Controller
                                    name="catatan"
                                    control={control}
                                    render={({ field }) => {
                                        const ya = ValueReview?.value === "Kesesuaian" ? "Sesuai" : "Lengkap";
                                        const tidak = ValueReview?.value === "Kesesuaian" ? "Tidak Sesuai" : "Tidak Lengkap";
                                        return (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => field.onChange(ya)}
                                                    className={`flex items-center gap-1 p-2 rounded-lg border-2 border-green-500
                                                                ${field.value === ya ? "bg-green-500 text-white"
                                                            : "text-green-500 hover:bg-green-100"}
                                                            `}
                                                >
                                                    <TbCheck />
                                                    {ya}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => field.onChange(tidak)}
                                                    className={`flex items-center gap-1 p-2 rounded-lg border-2 border-red-500
                                                                ${field.value === tidak ? "bg-red-500 text-white"
                                                            : "text-red-500 hover:bg-red-100"}
                                                            `}
                                                >
                                                    <TbX />
                                                    {tidak}
                                                </button>
                                            </div>
                                        );
                                    }}
                                />
                                :
                                <Controller
                                    name="catatan"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            className="w-full border px-4 py-2 rounded-lg"
                                            id="catatan"
                                            placeholder="Masukkan review mengenai substansi"
                                        />
                                    )}
                                />
                            }

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
                        </>
                    }

                </form>
            </div>
        </div>
    );
};
