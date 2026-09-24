'use client'

import React, { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip } from "@/components/global/Loading";
import { useBrandingContext } from "@/context/BrandingContext";
import { AlertNotification } from "@/components/global/Alert";
import { Indikator } from "./TableV2";

interface FormValue {
    indikator: IndikatorForm[];
}

interface IndikatorForm {
    indikator: string,
    kode: string,
    kode_indikator: string,
    kode_opd: string,
    tahun: string,
    target: Target[];
}
interface Target {
    id: string,
    indikator_id: string,
    satuan: string,
    tahun: string,
    target: number
}

interface modal {
    isOpen: boolean;
    onClose: () => void;
    jenis: string;
    nama: string;
    kode: string;
    kode_opd: string;
    tahun: number;
    tahun_list: string[];
    onSuccess: () => void;
}

export const ModalCreateIndikatorRenstraV2: React.FC<modal> = ({ isOpen, onClose, jenis, nama, kode, kode_opd, tahun, tahun_list, onSuccess }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            indikator: [
                {
                    indikator: "",
                    kode_indikator: "",
                    kode_opd: kode_opd ?? "",
                    kode: kode ?? "",
                    tahun: String(tahun),
                    target: tahun_list.map((t: string) => ({
                        id: "",
                        indikator_id: "",
                        satuan: "",
                        tahun: t,
                        target: 0
                    }))
                }
            ]
        }
    });

    const { branding } = useBrandingContext();
    const token = getToken();
    const [Proses, setProses] = useState<boolean>(false);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "indikator",
    });

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payload = data.indikator.map((item) => ({
            kode: item.kode,
            kode_opd: item.kode_opd,
            tahun: item.tahun,
            indikator: item.indikator,
            target: item.target.map((t: Target) => ({
                id: t.id,
                indikator_id: t.indikator_id,
                satuan: t.satuan,
                tahun: t.tahun,
                target: String(t.target)
            }))

        }));
        // console.log(payload);
        try {
            let url = `matrix_renstra/indikator/create`;
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
                AlertNotification("Berhasil", `Berhasil Menambahkan Indikator`, "success", 1000);
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
                        <h1 className="text-xl uppercase text-center">Tambah Indikator Baru</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                            >
                                {jenis}:
                            </label>
                            <div className="border px-4 py-2 rounded-lg">{kode} - {nama}</div>
                        </div>
                        {fields?.map((field, index: number) => (
                            <div key={field.id} className="flex flex-col my-2 py-2 px-5 border border-sky-700 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h1 className="uppercase font-bold text-sky-700">Indikator ke {index + 1}</h1>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
                                        title="Hapus Indikator Ini"
                                    >
                                        <TbTrash size={14} />
                                    </button>
                                </div>
                                <div className="flex flex-col py-3">
                                    <label
                                        className="uppercase text-xs font-bold text-gray-700 my-2"
                                        htmlFor="indikator"
                                    >
                                        Indikator:
                                    </label>
                                    <Controller
                                        name={`indikator.${index}.indikator`}
                                        control={control}
                                        render={({ field: controlledField }) => (
                                            <textarea
                                                {...controlledField}
                                                className="border px-4 py-2 rounded-lg"
                                                id="indikator"
                                                placeholder="masukkan Indikator"
                                            />
                                        )}
                                    />
                                </div>
                                {tahun_list.map((t, t_index: number) => (
                                    <div key={t_index} className="flex gap-2 justify-between my-2 p-3 border border-gray-200 rounded-lg">
                                        <Controller
                                            name={`indikator.${index}.target.${t_index}.target`}
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex flex-col py-1 w-full">
                                                    <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                        Target {t} :
                                                    </label>
                                                    <input
                                                        {...field}
                                                        type="number"
                                                        className="border px-4 py-2 rounded-lg"
                                                        placeholder="Masukkan target"
                                                    />
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name={`indikator.${index}.target.${t_index}.satuan`}
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex flex-col py-1 w-full">
                                                    <label className="uppercase text-xs font-bold text-gray-700 mb-2">
                                                        Satuan {t} :
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
                                ))}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ kode: kode, kode_indikator: "", kode_opd: kode_opd ?? "", indikator: "", tahun: String(tahun), target: tahun_list.map((t: string) => ({ id: "", indikator_id: "", satuan: "", tahun: t, target: 0 })) })}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Tambah Indikator
                        </button>
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
                </div>
            </div>
        )
    }
}

interface ModalEditIndikator {
    isOpen: boolean;
    onClose: () => void;
    indikator: Indikator | null;
    jenis: string;
    nama: string;
    kode: string;
    onSuccess: () => void;
}
interface FormIndikator {
    indikator: string;
    kode_indikator: string;
}

export const ModalEditIndikatorV2: React.FC<ModalEditIndikator> = ({ isOpen, onClose, onSuccess, indikator, jenis, nama, kode }) => {

    const { control, handleSubmit, reset } = useForm<FormIndikator>({
        defaultValues: {
            indikator: indikator?.indikator ?? "",
            kode_indikator: indikator?.kode_indikator ?? ""
        }
    });

    const { branding } = useBrandingContext();
    const token = getToken();
    const [Proses, setProses] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormIndikator> = async (data) => {
        const payload = {
            indikator: data.indikator,
            kode_indikator: data.kode_indikator,
        }
        // console.log(payload);
        try {
            let url = `matrix_renstra/indikator/update`;
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
                AlertNotification("Berhasil", `Berhasil Mengubah Nama Indikator`, "success", 1000);
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
                        <h1 className="text-xl uppercase text-center">Ubah Nama Indikator</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                            >
                                {jenis}:
                            </label>
                            <div className="border px-4 py-2 rounded-lg">{kode} - {nama}</div>
                        </div>
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
                                    render={({ field: controlledField }) => (
                                        <textarea
                                            {...controlledField}
                                            className="border px-4 py-2 rounded-lg"
                                            id="indikator"
                                            placeholder="masukkan Indikator"
                                        />
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
                </div>
            </div>
        )
    }
}