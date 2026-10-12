'use client'

import React, { useState } from "react";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip } from "@/components/global/Loading";
import { AlertNotification } from "@/components/global/Alert";
import { useBrandingContext } from "@/context/BrandingContext";

interface FormValue {
    id?: number;
    jenis: string;
    kode: string;
    kode_opd: string;
    outcome: string;
}

interface OutcomeData {
    id: number;
    nama: string;
    kode: string;
    outcome: string;
}

interface modal {
    isOpen: boolean;
    onClose: () => void;
    Data: OutcomeData | null;
    jenis: string;
    nama: string;
    kode: string;
    kode_opd: string;
    metode: "tambah" | "edit";
    onSuccess: (data: OutcomeData) => void;
}

export const ModalOutcomeMatrix: React.FC<modal> = ({ isOpen, Data, nama, metode, jenis, kode, kode_opd, onClose, onSuccess }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            id: Data?.id ?? 0,
            jenis: jenis ?? "Program",
            kode: kode ?? "",
            kode_opd: kode_opd,
            outcome: Data?.outcome ?? ""
        }
    });

    const { branding } = useBrandingContext()
    const token = getToken();
    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payload = {
            id: data.id ?? 0,
            jenis: jenis,
            kode: data.kode ?? "",
            kode_opd: kode_opd,
            outcome: data.outcome ?? ""
        }
        // console.log(payload);
        try {
            let url = "";
            if (metode === "tambah") {
                url = `outcome_matrix/create`
            } else {
                url = `outcome_matrix/update/${Data?.id}`
            }
            setProses(true);
            const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                method: metode === "tambah" ? "POST" : "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.code === 201 || result.code === 200) {
                AlertNotification("Berhasil", `Mengubah outcome di kode nomenklatur ${nama || "unknown"}`, "success", 2000);
                onClose();
                const successData: OutcomeData = result.data ?? {
                    id: data.id ?? 0,
                    nama: nama,
                    kode: data.kode ?? "",
                    outcome: data.outcome ?? ""
                };
                onSuccess(successData);
                reset();
            } else {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
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
                        <h1 className="text-xl uppercase text-center">Edit Outcome</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                            >
                                {jenis || "Nomenklatur"} :
                            </label>
                            <div className="border px-4 py-2 rounded-lg">({kode || "-"}) {nama || "-"}</div>
                        </div>
                        <div className="flex flex-col py-3 w-full">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="outcome"
                            >
                                outcome :
                            </label>
                            <Controller
                                name="outcome"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <textarea
                                            {...field}
                                            rows={4}
                                            id="outcome"
                                            className="border px-4 py-2 rounded-lg w-full"
                                            placeholder="masukkan outcome"
                                        />
                                    )
                                }}
                            />
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