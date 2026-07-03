'use client'

import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { getToken, getUser } from "@/components/lib/Cookie";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import { OptionTypeString } from "@/types";
import Select from 'react-select';

interface FormValue {
    rekin_id: string;
    permasalahan: OptionTypeString | null;
    penyebab_internal: string;
    penyebab_eksternal: string;
    jenis_permasalahan: string;
}
interface modal {
    isOpen: boolean;
    onClose: () => void;
    id_rekin: string;
    id: number;
    kode_opd: string;
    tahun: string;
    fetchTrigger: () => void;
    jenis: "tambah" | "edit";
}
interface Permasalahan {
    id: number;
    id_permasalahan: number;
    parent: number | null;
    nama_pohon: string;
    level_pohon: number;
    jenis_masalah: string;
}

export const ModalPermasalahan: React.FC<modal> = ({ kode_opd, tahun, isOpen, onClose, id_rekin, id, jenis, fetchTrigger }) => {

    const {
        control,
        handleSubmit,
        reset, 
        formState: { errors },
    } = useForm<FormValue>();
    const [user, setUser] = useState<any>(null);
    const [Proses, setProses] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const [OptionPermasalahan, setOptionPermasalahan] = useState<OptionTypeString[]>([]);
    const token = getToken();

    useEffect(() => {
        const fetchUser = getUser();
        if (fetchUser) {
            setUser(fetchUser.user);
        }
    }, []);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchId = async () => {
            try {
                const response = await fetch(`${API_URL}/permasalahan_rekin/detail/${id}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                const result = await response.json();
                const data = result.data;
                if(result.code === 200){
                    reset({
                        permasalahan: {
                            label: `${data.Permasalahan}`,
                            value: `${data.Permasalahan}`
                        },
                        penyebab_internal: data.PenyebabInternal,
                        penyebab_eksternal: data.PenyebabEksternal,
                        jenis_permasalahan: "umum"
                    })
                } else {
                    reset();
                }
            } catch (err) {
                console.error(err);
            }
        };
        if (jenis === "edit") {
            fetchId();
        }
    }, [id, token, jenis]);

    const fetchPermasalahanTerpilih = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL_PERMASALAHAN;
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/permasalahan_terpilih/findall?kode_opd=${kode_opd}&tahun=${tahun}`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            const hasil = result.data;
            const data = hasil.map((item: Permasalahan) => ({
                value: item.nama_pohon || "",
                label: `${item.jenis_masalah || "unknown jenis"} - ${item.nama_pohon || "unknown permasalahan"}`
            }));
            setOptionPermasalahan(data);
        } catch (err) {
            console.error("error fetch periode", err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            //key : value
            id: id,
            rekin_id: id_rekin,
            permasalahan: data.permasalahan?.value,
            penyebab_internal: data.penyebab_internal,
            penyebab_eksternal: data.penyebab_eksternal,
            jenis_permasalahan: "umum",
        };
        //   console.log(formData);
        let url = ""
        if (jenis === "tambah") {
            url = "permasalahan_rekin/create"
        } else {
            url = `permasalahan_rekin/update/${id}`
        }
        try {
            setProses(true);
            const response = await fetch(`${API_URL}/${url}`, {
                method: jenis === "tambah" ? "POST" : "PUT",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                AlertNotification("Berhasil", "Berhasil mengubah Permasalahan", "success", 1000);
                onClose();
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
                <div className={`fixed inset-0 bg-black opacity-30`} onClick={onClose}></div>
                <div className={`bg-white rounded-lg p-8 z-10 w-4/5 text-start`}>
                    <div className="w-max-[500px] py-2 border-b text-center">
                        <h1 className="text-xl uppercase">{jenis} Permasalahan</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="permasalahan"
                            >
                                Permasalahan:
                            </label>
                            <Controller
                                name="permasalahan"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Pilih Permasalahan"
                                        options={OptionPermasalahan}
                                        isLoading={Loading}
                                        isSearchable
                                        isClearable
                                        onMenuOpen={() => {
                                            fetchPermasalahanTerpilih();
                                        }}
                                        onChange={(option) => {
                                            field.onChange(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            })
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="penyebab_internal"
                            >
                                Penyebab Internal:
                            </label>
                            <Controller
                                name="penyebab_internal"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="penyebab_internal"
                                        placeholder="masukkan penyebab_internal"
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="penyebab_eksternal"
                            >
                                Penyebab Eksternal:
                            </label>
                            <Controller
                                name="penyebab_eksternal"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="penyebab_eksternal"
                                        placeholder="masukkan penyebab eksternal"
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="jenis_permasalahan"
                            >
                                Jenis Permasalahan:
                            </label>
                            <Controller
                                name="jenis_permasalahan"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="border px-4 py-2 rounded-lg"
                                        id="jenis_permasalahan"
                                        disabled
                                        placeholder="masukkan jenis permasalahan"
                                        value='umum'
                                    />
                                )}
                            />
                        </div>
                        <ButtonSky className="w-full my-3" type="submit" disabled={Proses}>
                            {Proses ?
                                <span className="flex">
                                    <LoadingButtonClip />
                                    Menyimpan...
                                </span>
                                :
                                "Simpan"
                            }
                        </ButtonSky>
                        <ButtonRed className="w-full my-3" onClick={onClose}>
                            Batal
                        </ButtonRed>
                    </form>
                </div>
            </div>
        )
    }
}