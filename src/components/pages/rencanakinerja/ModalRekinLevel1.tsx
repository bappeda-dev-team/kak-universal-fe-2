'use client'

import React, { useState } from "react";
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { ButtonRed, ButtonGreen } from '@/components/global/Button';
import { AlertNotification } from "@/components/global/Alert";
import { getToken } from "@/components/lib/Cookie";
import Select from 'react-select';
import { LoadingButtonClip, LoadingBeat } from "@/components/global/Loading";
import { OptionType, OptionTypeString } from "@/types";
import { useBrandingContext } from "@/context/BrandingContext";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    nip: string;
    kode_opd: string;
    tahun: string;
    onSuccess: () => void;
}
interface FormValue {
    id?: string;
    id_pohon: OptionType;
    sasaranopd_id?: OptionType;
    nama_rencana_kinerja: string;
    tahun: string;
    status_rencana_kinerja: OptionTypeString;
    catatan: string;
    kode_opd: string;
    pegawai_id: string;
    indikator: IndikatorSasaran[];
}

interface TargetSasaran {
    id: string;
    tahun: string;
    target: string;
    satuan: string;
}

interface IndikatorSasaran {
    id: string;
    kode_indikator: string;
    jenis: string;
    definisi_operasional: string;
    indikator: string;
    rumus_perhitungan: string;
    sumber_data: string;
    target: TargetSasaran[];
}

interface PelaksanaOPD {
    id: string;
    pegawai_id: string;
    nip: string;
    nama_pegawai: string;
}

interface PohonStrategicOPD {
    id_pohon: number;
    kode_opd: string;
    nama_opd: string;
    nama_pohon: string;
    jenis_pohon: "Strategic Pemda" | string;
    tahun_pohon: string;
    level_pohon: number;
    is_hide: boolean;
    id_sasaran_opd: string;
    nama_sasaran_opd: string;
    id_tujuan_opd: number;
    nama_tujuan_opd: string;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
    indikator: IndikatorSasaran[];
    pelaksana: PelaksanaOPD[];
}

export const ModalRekinLevel1: React.FC<ModalProps> = ({ isOpen, onClose, tahun, nip, kode_opd, onSuccess }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValue>();
    const { branding } = useBrandingContext();

    const [Rekin, setRekin] = useState<string>('');
    const [PreviewPohon, setPreviewPohon] = useState<boolean>(false);

    const [Sasaran, setSasaran] = useState<PohonStrategicOPD | null>(null);
    const [SasaranOption, setSasaranOption] = useState<PohonStrategicOPD[]>([]);

    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [LoadingDetail, setLoadingDetail] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);
    const token = getToken();

    const fetchOptionSasaranOpd = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/sasaran_opd/pegawai_level_1/${nip}/${kode_opd}/${tahun}`, {
                headers: {
                    "Authorization": `${token}`
                }
            });
            const result = await response.json();
            const data = result.data;
            if (result.code === 200) {
                const sasaran = data.map((s: PohonStrategicOPD) => ({
                    ...s,
                    value: s.id_sasaran_opd,
                    label: `${s.nama_sasaran_opd} - (${s.tahun_awal} - ${s.tahun_akhir})`,
                }));
                setSasaranOption(sasaran);
            } else {
                console.log("code: ", result.code, "data: ", result.data);
                setSasaranOption([]);
            }
        } catch (err) {
            console.log("error saat fetch option sasaran opd", err);
        } finally {
            setIsLoading(false);
        }
    }
    const formatOptionLabel = (option: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'black', marginRight: '5px' }}>
                {option.nama_sasaran_opd}
            </span>
            <span style={{ color: 'grey' }}>
                ({option.tahun_awal} - {option.tahun_akhir})
            </span>
        </div>
    );

    const onSubmit: SubmitHandler<FormValue> = async () => {
        const formDataNew = {
            //key : value
            id_pohon: Sasaran?.id_pohon,
            sasaranopd_id: Number(Sasaran?.id_tujuan_opd),
            nama_rencana_kinerja: Sasaran?.nama_sasaran_opd || "",
            status_rencana_kinerja: "aktif",
            tahun: String(tahun),
            kode_opd: kode_opd,
            pegawai_id: nip,
            indikator: Sasaran?.indikator,
        };
        if (Sasaran === null) {
            AlertNotification('Sasaran', 'sasaran opd wajib terisi', 'warning', 2000);
        } else {
            // console.log(formDataNew);
            try {
                let url = `rencana_kinerja/create_level1`;
                setProses(true);
                const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
                    method: "POST",
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataNew),
                });
                const result = await response.json();
                if (result.code === 200 || result.code === 201) {
                    AlertNotification("Berhasil", "Berhasil menambahkan rencana kinerja", "success", 1000);
                    onClose();
                    onSuccess();
                } else {
                    AlertNotification("Gagal", `${result.rencana_kinerja}`, "error", 2000);
                    console.log(result);
                }
            } catch (err) {
                console.log(err);
                AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
            } finally {
                setProses(false);
            }
        }
    };

    const handleClose = () => {
        onClose();
        setSasaran(null);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
            <div className="bg-white rounded-lg p-5 z-10 w-3/5 text-start max-h-[90%] overflow-auto">
                <div className="w-max-[500px] py-2 border-b">
                    <h1 className="text-xl uppercase text-center">Tambah Rencana Kinerja Level 1</h1>
                </div>
                {LoadingDetail ?
                    <LoadingBeat />
                    :
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="sasaranopd_id"
                            >
                                Sasaran OPD :
                            </label>
                            <Controller
                                name="sasaranopd_id"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            placeholder="Masukkan Sasaran OPD"
                                            value={Sasaran}
                                            options={SasaranOption}
                                            isLoading={IsLoading}
                                            isSearchable
                                            isClearable
                                            formatOptionLabel={formatOptionLabel}
                                            noOptionsMessage={() => "Sasaran OPD belum di tambahkan di pohon ini"}
                                            onMenuOpen={() => {
                                                fetchOptionSasaranOpd();
                                            }}
                                            onChange={(option) => {
                                                field.onChange(option);
                                                setSasaran(option);
                                                if (option) {
                                                    setRekin(option?.nama_sasaran_opd);
                                                }
                                            }}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderRadius: '8px',
                                                })
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <ButtonGreen type="submit" className="my-4" disabled={Proses}>
                            {Proses ?
                                <span className="flex">
                                    <LoadingButtonClip />
                                    Menyimpan...
                                </span>
                                :
                                "Simpan"
                            }
                        </ButtonGreen>
                        <ButtonRed type="button" onClick={handleClose} disabled={Proses}>
                            Kembali
                        </ButtonRed>
                    </form>
                }
            </div>
        </div>
    );
};
