'use client'

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken, getUser } from "@/components/lib/Cookie";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import Select from 'react-select';
import { OptionTypeString } from "@/types";

interface FormValue {
    kode_bidang_urusan: OptionTypeString | null;
    jenis: OptionTypeString | null;
    nama_indikator: string;
    target: string;
    satuan: string;
    keterangan: string;
}
interface IKK {
    id: number;
    kode_bidang_urusan: string;
    nama_bidang_urusan: string;
    nama_opd: string;
    jenis: "output" | string;
    nama_indikator: string;
    target: string;
    satuan: string;
    keterangan: string;
    created_at: string; // ISO 8601 Date String
    updated_at: string; // ISO 8601 Date String
}
interface modal {
    isOpen: boolean;
    onClose: () => void;
    Data: IKK | null;
    jenis: 'tambah' | 'edit';
    kode_opd: string;
    onSuccess: () => void;
}

export const ModalIkk: React.FC<modal> = ({ isOpen, onClose, jenis, kode_opd, Data, onSuccess }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            kode_bidang_urusan: Data?.kode_bidang_urusan
                ? {
                    value: Data?.kode_bidang_urusan,
                    label: Data?.nama_bidang_urusan
                }
                : null,
            jenis: Data?.jenis
                ? {
                    value: Data?.jenis,
                    label: Data?.jenis
                }
                : null,
            nama_indikator: Data?.nama_indikator || "",
            target: Data?.target || '',
            satuan: Data?.satuan || '',
            keterangan: Data?.keterangan || ''
        }
    });

    const [Proses, setProses] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const token = getToken();

    const [OptionBidangUrusan, setOptionBidangUrusan] = useState<OptionTypeString[]>([])

    const fetchOptionBidangUrusan = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/bidang_urusan/findall/${kode_opd}`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            const data = result.data;
            const hasil = data.map((item: any) => ({
                value: item.kode_bidang_urusan,
                label: `${item.kode_bidang_urusan} - ${item.nama_bidang_urusan}`,
            }));
            setOptionBidangUrusan(hasil);
        } catch (err) {
            console.error(err, "gagal fetch option bidang urusan");
        } finally {
            setLoading(false);
        }
    }

    const OptionJenis = [
        {value: "output", label: "output"},
        {value: "outcome", label: "outcome"}
    ]

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            //key : value
            kode_bidang_urusan: data.kode_bidang_urusan?.value,
            jenis: data.jenis?.value,
            nama_indikator: data.nama_indikator,
            target: data.target,
            satuan: data.satuan,
            keterangan: data.keterangan,
        };
        // console.log(formData);
        try {
            setProses(true);
            const response = await fetch(`${API_URL}/ikk/create`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.code === 201) {
                AlertNotification("Berhasil", "Berhasil menambahkan Permasalahan", "success", 1000);
                onSuccess();
                onClose();
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
                <div className={`fixed inset-0 bg-black opacity-30`} onClick={onClose}></div>
                <div className={`bg-white rounded-lg p-8 z-10 w-4/5 text-start`}>
                    <div className="w-max-[500px] py-2 border-b text-center">
                        <h1 className="text-xl uppercase">{jenis} Indikator Kinerja Kunci</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kode_bidang_urusan"
                            >
                                Bidang Urusan:
                            </label>
                            <Controller
                                name="kode_bidang_urusan"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        id="kode_bidang_urusan"
                                        placeholder="Pilih Bidang Urusan"
                                        options={OptionBidangUrusan}
                                        isLoading={Loading}
                                        onMenuOpen={() => {
                                            fetchOptionBidangUrusan();
                                        }}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                                borderColor: 'black', // Warna default border menjadi merah
                                                '&:hover': {
                                                    borderColor: '#3673CA', // Warna border tetap merah saat hover
                                                },
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="jenis"
                            >
                                Jenis:
                            </label>
                            <Controller
                                name="jenis"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        id="jenis"
                                        placeholder="Pilih Jenis"
                                        options={OptionJenis}
                                        isLoading={Loading}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                                borderColor: 'black', // Warna default border menjadi merah
                                                '&:hover': {
                                                    borderColor: '#3673CA', // Warna border tetap merah saat hover
                                                },
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="nama_indikator"
                            >
                                Nama Indikator:
                            </label>
                            <Controller
                                name="nama_indikator"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="nama_indikator"
                                        placeholder="masukkan Nama Indikator"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex flex-col py-3 w-full">
                                <label
                                    className="uppercase text-xs font-bold text-gray-700 my-2"
                                    htmlFor="target"
                                >
                                    Target:
                                </label>
                                <Controller
                                    name={`target`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type='text'
                                            className="border px-4 py-2 rounded-lg"
                                            id="target"
                                            placeholder="masukkan Target"
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex flex-col py-3 w-full">
                                <label
                                    className="uppercase text-xs font-bold text-gray-700 my-2"
                                    htmlFor="satuan"
                                >
                                    Satuan:
                                </label>
                                <Controller
                                    name={`satuan`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type='text'
                                            className="border px-4 py-2 rounded-lg"
                                            id="satuan"
                                            placeholder="masukkan Satuan"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="keterangan"
                            >
                                Keterangan:
                            </label>
                            <Controller
                                name="keterangan"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="keterangan"
                                        placeholder="masukkan Keterangan"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <ButtonSky className="w-full" type="submit" disabled={Proses}>
                                {Proses ?
                                    <span className="flex">
                                        <LoadingButtonClip />
                                        Menyimpan...
                                    </span>
                                    :
                                    "Simpan"
                                }
                            </ButtonSky>
                            <ButtonRed className="w-full" onClick={onClose}>
                                Batal
                            </ButtonRed>
                        </div>
                    </form>
                </div >
            </div >
        )
    }
}