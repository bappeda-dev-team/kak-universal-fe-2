'use client'

import React, { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip, LoadingClip } from "@/components/global/Loading";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { useBrandingContext } from "@/context/BrandingContext";

interface Indikator {
    kode_indikator: string;
    kode: string;
    kode_opd: string;
    indikator: string;
    tahun: string;
    target_id: number;
    target: string;
    satuan: string;
}

interface modal {
    isOpen: boolean;
    onClose(): void;
    menu: "ranwal" | "rankhir" | "penetapan";
    Data: Indikator | null;
    onSuccess(): void;
}

export const ModalTargetSatuanRenja: React.FC<modal> = ({ isOpen, onClose, Data, menu, onSuccess }) => {

    const { branding } = useBrandingContext();
    const { control, handleSubmit, reset } = useForm<Indikator>({
        defaultValues: {
            indikator: Data?.indikator || "indikator kosong / tidak terbaca",
            kode_indikator: Data?.kode_indikator || "",
            target: Data?.target || "0",
            satuan: Data?.satuan || "",
            tahun: Data?.tahun || String(branding?.tahun?.value),
        }
    });

    const token = getToken();

    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Indikator> = async (data) => {
        const payload = {
            kode_indikator: data.kode_indikator,
            tahun: data.tahun,
            target: data.target,
            satuan: data.satuan,
        }
        try {
            let url = `matrix_renja/target/${menu}`;
            setProses(true);
            const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                method: "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.code === 201 || result.code === 200) {
                AlertNotification("Berhasil", `Berhasil Mengubah Target Satuan dalam Indikator`, "success", 1000);
                onClose();
                onSuccess();
                reset();
            } else if (result.code === 500) {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
            } else {
                AlertNotification("Gagal", "terdapat kesalahan pada backend / database server dengan response !ok", "error", 2000);
                console.error(result);
            }
        } catch (err) {
            AlertNotification("Gagal", `${err}`, "error", 2000);
        } finally {
            setProses(false);
        }
    };

    const handleClose = () => {
        onClose();
        reset();
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
            <div className={`bg-white rounded-lg p-8 z-10 w-5/6 max-h-[80%] overflow-auto`}>
                {IsLoading ?
                    <LoadingClip />
                    :
                    <>
                        <div className="w-max-[500px] py-2 border-b">
                            <h1 className="text-xl uppercase text-center">Ubah Target Satuan dalam Indikator Matrix</h1>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col mx-5 py-5"
                        >
                            <div className="flex flex-col my-2 py-2 px-5 border border-sky-700 rounded-lg">
                                <div className="flex flex-col py-3">
                                    <label
                                        className="uppercase text-xs font-bold text-gray-700 my-2"
                                        htmlFor="indikator"
                                    >
                                        Indikator:
                                    </label>
                                    <Controller
                                        name={`indikator`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                className="border px-4 py-2 rounded-lg"
                                                id="indikator"
                                                disabled
                                                placeholder="masukkan Indikator"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2 justify-between my-2 p-3 border border-gray-200 rounded-lg">
                                    <Controller
                                        name={`target`}
                                        control={control}
                                        render={({ field }) => (
                                            <div className="flex flex-col py-1 w-full">
                                                <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                    Target :
                                                </label>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    inputMode="decimal"
                                                    className="border px-4 py-2 rounded-lg"
                                                    placeholder="Masukkan target"
                                                    onChange={(e) => {
                                                        const value = e.target.value;

                                                        if (/^[0-9.,-]*$/.test(value)) {
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name={`satuan`}
                                        control={control}
                                        render={({ field }) => (
                                            <div className="flex flex-col py-1 w-full">
                                                <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                    Satuan :
                                                </label>
                                                <input
                                                    {...field}
                                                    className="border px-4 py-2 rounded-lg"
                                                    placeholder="Masukkan satuan"
                                                />
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <ButtonSky className="w-full mt-3" type="submit" disabled={Proses}>
                                {Proses ?
                                    <span className="flex">
                                        <LoadingButtonClip />
                                        Menyimpan...
                                    </span>
                                    :
                                    "Simpan"
                                }
                            </ButtonSky>
                            <ButtonRed type="button" className="w-full my-2" onClick={handleClose}>
                                Batal
                            </ButtonRed>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}
