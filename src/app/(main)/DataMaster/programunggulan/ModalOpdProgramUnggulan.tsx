'use client'

import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from '@/components/global/Button';
import { AlertNotification } from "@/components/global/Alert";
import { getToken } from "@/components/lib/Cookie";
import Select from 'react-select';
import { LoadingButtonClip } from "@/components/global/Loading";
import { TbCirclePlus, TbCircleX } from "react-icons/tb";
import { useBrandingContext } from "@/context/BrandingContext";

interface OptionTypeString {
    value: string,
    label: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    kode_program: string;
    onSuccess: () => void;
}

interface FormValue {
    kode_subkegiatan: string;
    kode_opd: string;
    review: string;
    keterangan: string;
}

export const ModalOpdProgramUnggulan: React.FC<ModalProps> = ({ isOpen, onClose, kode_program, onSuccess }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>();

    const [Opd, setOpd] = useState<OptionTypeString[]>([]);
    const [OpdOption, setOpdOption] = useState<OptionTypeString[]>([]);

    const [LoadingOption, setLoadingOption] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);

    const token = getToken();
    const { branding } = useBrandingContext();

    const handleClose = () => {
        setOpd([]);
        onClose();
        reset();
    };

    useEffect(() => {
        const fetchOpd = async () => {
            setLoadingOption(true);
            try {
                const response = await fetch(`${branding?.api_perencanaan}/opd/findall`, {
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
                const opd = data.data.map((item: any) => ({
                    value: item.kode_opd,
                    label: item.nama_opd,
                }));
                setOpdOption(opd);
            } catch (err) {
                console.log('gagal mendapatkan data opd');
            } finally {
                setLoadingOption(false);
            }
        };
        fetchOpd();
    }, [branding, token, isOpen])

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const opd = Opd.map(item => item.value);
        const formData = {
            //key : value
            kode_program_unggulan: kode_program,
            kode_opd: opd,
        };
        // console.log(formData);
        try {
            setProses(true);
            const response = await fetch(`${branding?.api_perencanaan}/program_unggulan/createopd`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", `${result.data.message || "Berhasil menambahkan sub kegiatan untuk opd"}`, "success", 1000);
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

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
            <div className="bg-white rounded-lg p-8 z-10 w-3/5 max-h-[80%] text-start">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-max-[500px] py-2 border-b font-bold text-center">
                        Tambah OPD di Program Prioritas Pusat
                    </div>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="kode_subkegiatan"
                        >
                            Perangkat Daerah (OPD) :
                        </label>
                        <Controller
                            name="kode_subkegiatan"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        placeholder="Pilih Perangkat Daerah (OPD)"
                                        options={OpdOption}
                                        isLoading={LoadingOption}
                                        isSearchable
                                        isClearable
                                        isMulti
                                        value={Opd}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setOpd(option as OptionTypeString[]);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            }),
                                            menuPortal: (base) => ({
                                                ...base, zIndex: 9999
                                            })
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <ButtonSky type="submit" className="w-full my-3" disabled={Proses}>
                        {Proses ?
                            <span className="flex items-center gap-1">
                                <LoadingButtonClip />
                                Menambahkan
                            </span>
                            :
                            <span className="flex items-center gap-1">
                                <TbCirclePlus />
                                Simpan
                            </span>
                        }
                    </ButtonSky>
                    <ButtonRed type="button" className="w-full my-3 flex items-center gap-1" onClick={handleClose} disabled={Proses}>
                        <TbCircleX />
                        Batal
                    </ButtonRed>
                </form>
            </div>
        </div>
    );
};
