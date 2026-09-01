'use client'

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken } from "@/components/lib/Cookie";
import { LoadingButtonClip } from "@/components/global/Loading";
import { AlertNotification } from "@/components/global/Alert";
import { useBrandingContext } from "@/context/BrandingContext";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import { LaporanRincianBelanja, PPTK } from "./type";
import Select from 'react-select';
import { OptionTypeString } from "@/types";

interface FormValue {
    nip: OptionTypeString;
    tahun: number;
    kode_opd: string;
    kode_sub_kegiatan: string
    nip_atasan: OptionTypeString;
    nonaktif_at: string;
    level: OptionTypeString;
}

interface modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: PPTK) => void;
    Data: LaporanRincianBelanja | null;
    kode_opd: string;
    metode: "tambah" | "edit";
    DataEdit?: PPTK | null;
}


export const ModalPenanggungJawab: React.FC<modal> = ({ isOpen, onClose, onSuccess, kode_opd, Data, DataEdit, metode }) => {

    const token = getToken();
    const { branding } = useBrandingContext();

    const { reset, control, handleSubmit } = useForm<FormValue>({
        defaultValues: {
            nip: {
                value: DataEdit?.nip,
                label: DataEdit?.nama_pegawai
            },
            tahun: branding?.tahun?.value,
            kode_opd: kode_opd,
            kode_sub_kegiatan: Data?.kode_subkegiatan,
            nip_atasan: {
                value: DataEdit?.nip_atasan,
                label: DataEdit?.nama_atasan
            },
            nonaktif_at: "",
        }
    });

    const [Proses, setProses] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);

    const [Level, setLevel] = useState<OptionTypeString | null>(null);
    const [OptionPegawai, setOptionPegawai] = useState<OptionTypeString[]>([]);
    const [OptionAtasan, setOptionAtasan] = useState<OptionTypeString[]>([]);

    useEffect(() => {
        const options: OptionTypeString[] = Array.from(
            new Map(
                (Data?.rincian_belanja ?? []).map(item => [
                    item.pegawai_id,
                    {
                        label: item.nama_pegawai ?? "",
                        value: item.pegawai_id ?? "",
                    }
                ])
            ).values()
        );
        setOptionPegawai(options);
    }, [Data]);

    const OptionLevel = [
        { label: "level 1", value: "level_1" },
        { label: "level 2", value: "level_2" },
        { label: "level 3", value: "level_3" },
        { label: "level 4", value: "level_4" },
    ]

    const fetchPelaksana = async (role: string) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        setLoading(true);
        try {
            const url = `user/findbykodeopdandrole?kode_opd=${kode_opd}&role=${role}`
            const response = await fetch(`${API_URL}/${url}`, {
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('cant fetch data opd');
            }
            const data = await response.json();
            if (data == null) {
                setOptionAtasan([]);
                console.log(`data user dengan ${role} tidak ditemukan`)
            } else {
                const opd = data.data.map((item: any) => ({
                    value: item.nip,
                    label: item.nama_pegawai,
                }));
                setOptionAtasan(opd);
            }
        } catch (err) {
            console.log(`error saat mendapatkan data user ${role}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payload = {
            //key : value
            ...data,
            nonaktif_at: data.nonaktif_at
                ? `${data.nonaktif_at}:00+07:00`
                : null,
            nip: data.nip?.value,
            kode_opd: kode_opd,
            tahun: Number(branding?.tahun?.value),
            kode_sub_kegiatan: Data?.kode_subkegiatan,
            nip_atasan: data.nip_atasan?.value,
        };
        // console.log(payload);
        try {
            let url = "";
            if (metode === "tambah") {
                url = `pptk/create`;
            } else {
                url = `pptk/update/${DataEdit?.id}`;
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
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", `Berhasil mengubah data PPTK`, "success", 1000);
                onClose();
                onSuccess(result.data);
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
        reset();
        setLevel(null);
    }

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
                <div className={`bg-white rounded-lg p-8 z-10 w-4/5`}>
                    <div className="w-max-[500px] py-2 border-b">
                        <h1 className="text-xl uppercase text-center">Edit Penanggung Jawab</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2">Sub Kegiatan :</label>
                            <div className="border border-green-600 px-4 py-2 rounded-lg">
                                ({Data?.kode_subkegiatan || "kode unknown"}) - {Data?.nama_subkegiatan || "subkegiatan unknown"}
                            </div>
                        </div>
                        <Controller
                            name="nip"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col py-3">
                                    <label
                                        className="uppercase text-xs font-bold text-gray-700 my-2"
                                        htmlFor="nip"
                                    >
                                        Pelaksana
                                    </label>
                                    <Select
                                        {...field}
                                        placeholder="Pilih Pelaksana"
                                        options={OptionPegawai}
                                        isSearchable
                                        isClearable
                                        onChange={(option) => {
                                            field.onChange(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                                textAlign: 'start',
                                            })
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <div className="flex flex-col gap-2 p-3 border border-green-600 rounded-lg">
                            <Controller
                                name="level"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-col py-3">
                                        <label
                                            className="uppercase text-xs font-bold text-gray-700 my-2"
                                            htmlFor="level"
                                        >
                                            Level Penanggung Jawab
                                        </label>
                                        <Select
                                            {...field}
                                            placeholder="Pilih Level"
                                            options={OptionLevel}
                                            isSearchable
                                            isClearable
                                            value={Level}
                                            onChange={(option) => {
                                                field.onChange(option);
                                                setLevel(option);
                                            }}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderRadius: '8px',
                                                    textAlign: 'start',
                                                })
                                            }}
                                        />
                                    </div>
                                )}
                            />
                            <Controller
                                name="nip_atasan"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-col py-3">
                                        <label
                                            className="uppercase text-xs font-bold text-gray-700 my-2"
                                            htmlFor="nip atasan"
                                        >
                                            Penanggung Jawab
                                        </label>
                                        <Select
                                            {...field}
                                            placeholder="Pilih Penanggung Jawab"
                                            options={OptionAtasan}
                                            isSearchable
                                            isClearable
                                            isLoading={Loading}
                                            isDisabled={Level === undefined || Level === null}
                                            onMenuOpen={() => {
                                                fetchPelaksana(Level?.value ?? "");
                                            }}
                                            onChange={(option) => {
                                                field.onChange(option);
                                            }}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderRadius: '8px',
                                                    textAlign: 'start',
                                                })
                                            }}
                                        />
                                    </div>
                                )}
                            />
                        </div>

                        <Controller
                            name="nonaktif_at"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col py-3">
                                    <label
                                        className="flex items-center gap-1 uppercase text-xs font-bold text-gray-700 my-2"
                                        htmlFor="nonaktif_at"
                                    >
                                        <p>Non Aktif</p>
                                        <p className="font-light italic text-xs text-slate-400">Kosongkan jika tidak di non aktifkan</p>
                                    </label>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        type="date"
                                    />
                                </div>
                            )}
                        />

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
                        <ButtonRed className="w-full mb-3 flex items-center gap-1" onClick={handleClose}>
                            <TbX />
                            Batal
                        </ButtonRed>
                    </form>
                </div>
            </div>
        )
    }
}