'use client'

import { useState } from "react";
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import { useBrandingContext } from "@/context/BrandingContext";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import { IndikatorSasaran, TargetTujuan } from "../type";

interface FormValue {
    targets: Targets[];
}
interface Targets extends TargetTujuan {
    kode_indikator?: string;
    tahun: string;
    id: number,
    target: number;
    satuan: string;
}
interface modal {
    isOpen: boolean;
    onClose: () => void;
    indikator: IndikatorSasaran | null;
    target_awal: Targets[];
    target_edit: Targets[];
    tahun: string;
    fetchTrigger: () => void;
    jenis: "ranwal" | "rankhir" | "penetapan";
    metode: "edit" | "tambah"

}

export const ModalTargetSasaranRKPD: React.FC<modal> = ({ tahun, isOpen, onClose, indikator, target_awal, target_edit, jenis, fetchTrigger, metode }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            targets: metode === "edit"
                ? (target_edit && target_edit.length > 0
                    ? target_edit.map((t: TargetTujuan) => ({
                        id: t.id || 0,
                        target: t.target || 0,
                        satuan: t.satuan || "",
                    }))
                    : [
                        {
                            id: 0,
                            kode_indikator: indikator?.kode_indikator || '',
                            tahun: tahun || '',
                            target: 0,
                            satuan: "",
                        }
                    ]
                )
                : [
                    {
                        kode_indikator: indikator?.kode_indikator || '',
                        tahun: tahun || '',
                        target: 0,
                        satuan: "",
                    }
                ]
        }
    });

    const { fields } = useFieldArray({
        name: "targets",
        control,
    });

    const [Proses, setProses] = useState<boolean>(false);

    const { branding } = useBrandingContext();
    const token = getToken();

    const handleClose = () => {
        onClose();
        reset();
    }

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const formDataTambah = {
            //key : value
            targets: data.targets.map((t) => ({
                kode_indikator: indikator?.kode_indikator || "",
                target: Number(t.target),
                satuan: t.satuan,
                tahun: tahun,
            }))
        };
        const formDataEdit = {
            //key : value
            targets: data.targets.map((t) => ({
                id: t.id,
                target: Number(t.target),
                satuan: t.satuan,
                tahun: tahun,
            }))
        };
        const getBody = () => {
            if (metode === "tambah") return formDataTambah;
            if (metode === "edit") return formDataEdit;
            return {};
        };
        // if(metode === "tambah"){
        //     console.log(formDataTambah);
        // } else {
        //     console.log(formDataEdit);
        // }
        try {
            setProses(true);
            let url = ""
            if (metode === "tambah") {
                url = `sasaran_pemda/target/${jenis}/create`
            } else {
                url = `sasaran_pemda/target/${jenis}/update`
            }
            const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                method: metode === "tambah" ? "POST" : "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getBody()),
            });
            if (response.ok) {
                AlertNotification("Berhasil", "Berhasil mengubah Target Satuan", "success", 1000);
                handleClose();
                fetchTrigger();
            } else {
                AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
            }
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
        } finally {
            setProses(false);
        }
    };

    if (!isOpen) {
        return null;
    } else {

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className={`fixed inset-0 bg-black opacity-30`} onClick={handleClose}></div>
                <div className={`bg-white rounded-lg p-8 z-10 w-4/5 text-start`}>
                    <div className="w-max-[500px] py-2 border-b text-center">
                        <h1 className="text-xl uppercase">{metode} Target {jenis}</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="uppercase text-xs font-bold text-gray-700 my-1 ml-1">
                                Indikator :
                            </label>
                            <h1 className="border border-gray-700 rounded-lg p-2">{indikator?.indikator || "-"}</h1>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="uppercase text-xs font-bold text-gray-700 my-1 ml-1">
                                Definisi Operasional :
                            </label>
                            <h1 className="border border-gray-700 rounded-lg p-2">{indikator?.definisi_operasional || "-"}</h1>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="uppercase text-xs font-bold text-gray-700 my-1 ml-1">
                                Rumus Perhitungan :
                            </label>
                            <h1 className="border border-gray-700 rounded-lg p-2">{indikator?.rumus_perhitungan || "-"}</h1>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="uppercase text-xs font-bold text-gray-700 my-1 ml-1">
                                Sumber Data:
                            </label>
                            <h1 className="border border-gray-700 rounded-lg p-2">{indikator?.sumber_data || "-"}</h1>
                            {target_awal.map((ta: Targets, index: number) => (
                                <div key={index} className="flex flex-col gap-1 my-1 border border-emerald-500 p-2 rounded-lg">
                                    <h1 className={`font-bold text-xl uppercase ${jenis === "rankhir" ? "text-red-600" : "text-yellow-600"}`}>
                                        {jenis === "rankhir" ? "Target Ranwal" : "Target Rankir"}
                                    </h1>
                                    <div className="flex items-center gap-1">
                                        <div className="flex flex-col py-3 w-full">
                                            <label className="uppercase text-xs font-bold text-gray-700 my-2">
                                                Target:
                                            </label>
                                            <h1 className="border border-gray-700 rounded-lg p-2">{ta.target || "-"}</h1>
                                        </div>
                                        <div className="flex flex-col py-3 w-full">
                                            <label className="uppercase text-xs font-bold text-gray-700 my-2">
                                                Satuan:
                                            </label>
                                            <h1 className="border border-gray-700 rounded-lg p-2">{ta.satuan || "-"}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {fields.map((field, index: number) => (
                            <div key={field.id} className="flex flex-col gap-1 my-1 border border-emerald-500 p-2 rounded-lg">
                                <h1 className={`font-bold text-xl uppercase ${jenis === "rankhir" ? "text-yellow-600" : "text-blue-600"}`}>
                                    Target {jenis}
                                </h1>
                                <div className="flex items-center gap-1">
                                    <div className="flex flex-col py-3 w-full">
                                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                                            Target:
                                        </label>
                                        <Controller
                                            name={`targets.${index}.target`}
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="number"
                                                    className="border px-4 py-2 rounded-lg"
                                                    placeholder="Masukkan Target"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col py-3 w-full">
                                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                                            Satuan:
                                        </label>
                                        <Controller
                                            name={`targets.${index}.satuan`}
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    className="border px-4 py-2 rounded-lg"
                                                    placeholder="Masukkan Satuan"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center gap-1 mt-5">
                            <ButtonSky className="w-full" type="submit" disabled={Proses}>
                                {Proses ?
                                    <span className="flex">
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
                            <ButtonRed className="w-full flex items-center gap-1" onClick={handleClose}>
                                <TbX />
                                Batal
                            </ButtonRed>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}