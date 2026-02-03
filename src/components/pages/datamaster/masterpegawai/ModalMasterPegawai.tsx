'use client'

import { useState } from "react";
import { TbDeviceFloppy, TbX, TbCheck } from "react-icons/tb";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from "@/components/global/Button";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import { OptionTypeString } from "@/types";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";

interface modal {
    jenis: "tambah" | "edit";
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    Data: pegawai | null;
    kode_opd: string;
    nama_opd: string;
}
interface pegawai {
    id: string;
    nama_pegawai: string;
    nip: string;
    kode_opd: string;
    nama_opd: string;
}
export interface FormValue {
    nama_pegawai: string;
    kode_opd: OptionTypeString;
    nip: string;
}

export const ModalMasterPegawai: React.FC<modal> = ({ isOpen, onClose, onSuccess, jenis, Data, kode_opd, nama_opd }) => {

    const { branding } = useBrandingContext();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            nama_pegawai: Data?.nama_pegawai,
            nip: Data?.nip,
            kode_opd: {
                value: kode_opd,
                label: nama_opd,
            }
        }
    });

    const [Nip, setNip] = useState<string>('');

    const [Plt, setPlt] = useState<boolean>(false);
    const [Pbt, setPbt] = useState<boolean>(false);

    const [Proses, setProses] = useState<boolean>(false);
    const token = getToken();

    const handleClose = () => {
        onClose();
        reset();
    }

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const formDataTambah = {
            nama_pegawai: `${data.nama_pegawai} ${Plt ? '(PLT)' : ''} ${Pbt ? "(PBT)" : ""}`,
            nip: `${Plt ? `${data.nip}_plt` : Pbt ? `${data.nip}_pbt` : data.nip}`,
            kode_opd: kode_opd,
        }
        const formDataEdit = {
            //key : value
            nama_pegawai: data.nama_pegawai,
            nip: data.nip,
            kode_opd: kode_opd,
        };
        const getBody = () => {
            if (jenis === "tambah") return formDataTambah;
            if (jenis === "edit") return formDataEdit;
            return {}; // Default jika jenis tidak sesuai
        };
        // console.log(getBody());
        let url = ''
        if(jenis === "tambah"){
            url = 'pegawai/create'
        } else {
            url = `pegawai/update/${Data?.id}`
        }
        try {
            setProses(true);
            const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                method: jenis === "tambah" ? "POST" : "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getBody()),
            });
            const result = await response.json();
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", "Berhasil menambahkan data master pegawai", "success", 1000);
                onSuccess();
                handleClose();
            } else {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
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
                <div className={`bg-white rounded-lg p-8 z-10 w-4/5 max-h-[80%] text-start overflow-auto`}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="w-max-[500px] py-2 mb-2 border-b-2 border-gray-300 text-center uppercase font-bold">
                            {jenis === "tambah" ? "Tambah" : "Edit"} Pegawai
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="_pegawai"
                            >
                                Nama :
                            </label>
                            <Controller
                                name="nama_pegawai"
                                control={control}
                                rules={{ required: "Nama Pegawai harus terisi" }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="nama_pegawai"
                                            type="text"
                                            placeholder="masukkan Nama Pegawai"
                                            value={field.value}
                                        />
                                        {errors.nama_pegawai ?
                                            <h1 className="text-red-500">
                                                {errors.nama_pegawai.message}
                                            </h1>
                                            :
                                            <h1 className="text-slate-300 text-xs">*Nama Pegawai Harus Terisi</h1>
                                        }
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="flex flex-col flex-wrap gap-2 uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="nip"
                            >
                                NIP :
                                {jenis === "tambah" &&
                                    <div className="flex items-center gap-2">
                                        {Plt ?
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPlt(false)
                                                    setPbt(false)
                                                }}
                                                className="w-[20px] h-[20px] bg-emerald-500 rounded-full text-white p-1 flex justify-center items-center"
                                            >
                                                <TbCheck />
                                            </button>
                                            :
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPlt(true)
                                                    setPbt(false)
                                                }}
                                                className="w-[20px] h-[20px] border border-black rounded-full"
                                            ></button>
                                        }
                                        <p className="text-lg">PLT</p>
                                        {Pbt ?
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPbt(false)
                                                    setPlt(false)
                                                }}
                                                className="w-[20px] h-[20px] bg-emerald-500 rounded-full text-white p-1 flex justify-center items-center"
                                            >
                                                <TbCheck />
                                            </button>
                                            :
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPbt(true)
                                                    setPlt(false)
                                                }}
                                                className="w-[20px] h-[20px] border border-black rounded-full"
                                            ></button>
                                        }
                                        <p className="text-lg">PBT</p>
                                    </div>
                                }
                            </label>
                            <Controller
                                name="nip"
                                control={control}
                                rules={{ required: "NIP harus terisi" }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="nip"
                                            type="text"
                                            maxLength={18}
                                            placeholder="masukkan NIP"
                                            value={field.value || Nip}
                                            onChange={(e) => {
                                                const newValue = e.target.value.replace(/\s/g, ''); // Hilangkan semua spasi
                                                field.onChange(newValue);
                                                setNip(newValue);
                                            }}
                                        />
                                        {errors.nip ?
                                            <h1 className="text-red-500">
                                                {errors.nip.message}
                                            </h1>
                                            :
                                            <h1 className="text-slate-300 text-xs">*NIP Harus Terisi, Max 18 Digit, centang lingkaran PLT jika pegawai PLT</h1>
                                        }
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kode_opd"
                            >
                                Perangkat Daerah
                            </label>
                            <div className="border px-4 py-2 rounded-lg">{nama_opd}</div>
                        </div>
                        <ButtonSky type="submit" className="w-full my-3 gap-1" disabled={Proses}>
                            {Proses ?
                                <>
                                    <LoadingButtonClip />
                                    <span>menyimpan</span>
                                </>
                                :
                                <>
                                    <TbDeviceFloppy />
                                    <span>Simpan</span>
                                </>
                            }
                        </ButtonSky>
                        <ButtonRed className="flex items-center gap-1 w-full my-3" onClick={handleClose} disabled={Proses}>
                            <TbX />
                            Batal
                        </ButtonRed>
                    </form>
                </div>
            </div>
        )
    }
}