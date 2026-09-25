'use client'

import React, { useState } from "react";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip } from "@/components/global/Loading";
import { AlertNotification } from "@/components/global/Alert";
import { Indikator, Target } from "./TableV2";
import { useBrandingContext } from "@/context/BrandingContext";

interface FormValue {
    id: string;
    kode_indikator: string;
    satuan: string;
    tahun: string;
    target: number;
}

interface modal {
    isOpen: boolean;
    onClose: () => void;
    indikator: Indikator | null;
    target: Target | null;
    onSuccess: () => void;
}

export const ModalTargetSatuanRenstra: React.FC<modal> = ({ isOpen, indikator, target, onClose, onSuccess }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            id: target?.id ?? "",
            kode_indikator: indikator?.kode_indikator ?? "",
            satuan: target?.satuan ?? "",
            target: Number(target?.target) ?? 0,
            tahun: target?.tahun ?? ""
        }
    });

    const { branding } = useBrandingContext()
    const token = getToken();
    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payload = {
            id: data.id ?? "",
            kode_indikator: data.kode_indikator ?? "",
            satuan: data.satuan ?? "",
            target: String(data.target) ?? 0,
            tahun: data.tahun ?? ""
        }
        // console.log(payload);
        try {
            let url = "matrix_renstra/target/upsert";
            setProses(true);
            const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.code === 201 || result.code === 200) {
                AlertNotification("Berhasil", `Mengubah Target di indikator ${indikator?.indikator || "unknown"} tahun ${target?.tahun || "unknown"}`, "success", 2000);
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

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
                <div className={`bg-white rounded-lg p-8 z-10 w-5/6 max-h-[80%] overflow-auto`}>
                    <div className="w-max-[500px] py-2 border-b">
                        <h1 className="text-xl uppercase text-center">Edit Target / Satuan tahun {target?.tahun || "unknown"}</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                            >
                                Indikator :
                            </label>
                            <div className="border px-4 py-2 rounded-lg">{indikator?.indikator || "-"}</div>
                        </div>
                        <div className="flex items-center gap-1 w-full">
                            <div className="flex flex-col py-3 w-full">
                                <label
                                    className="uppercase text-xs font-bold text-gray-700 my-2"
                                    htmlFor="target"
                                >
                                    Target :
                                </label>
                                <Controller
                                    name="target"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <input
                                                {...field}
                                                type="number"
                                                id="target"
                                                className="border px-4 py-2 rounded-lg"
                                                placeholder="masukkan target terbaru"
                                            />
                                        )
                                    }}
                                />
                            </div>
                            <div className="flex flex-col py-3 w-full">
                                <label
                                    className="uppercase text-xs font-bold text-gray-700 my-2"
                                    htmlFor="satuan"
                                >
                                    Satuan :
                                </label>
                                <Controller
                                    name="satuan"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <input
                                                {...field}
                                                type="text"
                                                id="satuan"
                                                className="border px-4 py-2 rounded-lg"
                                                placeholder="masukkan satuan terbaru"
                                            />
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        <ButtonSky className="w-full mt-3" type="submit" disabled={Proses}>
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
                        <ButtonRed type="button" className="w-full my-2" onClick={handleClose}>
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