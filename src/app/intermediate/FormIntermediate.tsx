'use client'

import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { ButtonGreen, ButtonRedBorder, ButtonSkyBorder, ButtonRed } from "@/components/global/Button";
import { LoadingClip, LoadingButtonClip } from "@/components/global/Loading";
import { AlertNotification } from "@/components/global/Alert";
import { useParams, useRouter } from "next/navigation";
import Select from 'react-select';
import { getToken } from "@/components/lib/Cookie";

interface OptionTypeString {
    value: string;
    label: string;
}
interface FormValue {
    id: number;
    intermediate_outcome: string;
    penyebab_permasalahan: string;
    data_terukur_terkait_csf: string;
    kondisi_terukur_yang_diharapkan: string;
    kondisi_yang_diperlukan: string;
}

export const FormIntermediate = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValue>();
    const [IntermediateOutcome, setIntermediateOutcome] = useState<string>('');
    const [PenyebabPermasalahan, setPenyebabPermasalahan] = useState<string>('');
    const [DataTerukur, setDataTerukur] = useState<string>('');
    const [KondisiDiharapkan, setKondisiDiharapkan] = useState<string>('');
    const [KondisiDiperlukan, setKondisiDiperlukan] = useState<string>('');
    const [Proses, setProses] = useState<boolean>(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const token = getToken();

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const formData = {
            //key : value
            intermediate_outcome: data.intermediate_outcome,
            penyebab_permasalahan: data.penyebab_permasalahan,
            data_terukur_terkait_csf: data.data_terukur_terkait_csf,
            kondisi_terukur_yang_diharapkan: data.kondisi_terukur_yang_diharapkan,
            kondisi_yang_diperlukan: data.kondisi_yang_diperlukan,
        };
        console.log(formData);
        // try {
        //     setProses(true);
        //     const response = await fetch(`${API_URL}/pohon_kinerja_admin/create`, {
        //         method: "POST",
        //         headers: {
        //             Authorization: `${token}`,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //     if (response.ok) {
        //         AlertNotification("Berhasil", "Berhasil menambahkan data tematik pemda", "success", 1000);
        //         router.push("/intermediate");
        //     } else {
        //         AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
        //     }
        // } catch (err) {
        //     AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
        // } finally {
        //     setProses(false);
        // }
    };

    return (
        <>
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Tambah Data Intermediate :</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mx-5 py-5"
                >
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="intermediate_outcome"
                        >
                            Intermediate Outcome :
                        </label>
                        <Controller
                            name="intermediate_outcome"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="intermediate_outcome"
                                        type="text"
                                        placeholder="masukkan Intermediate Outcome"
                                        value={field.value || IntermediateOutcome}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setIntermediateOutcome(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="penyebab_permasalahan"
                        >
                            Penyebab Permasalahan :
                        </label>
                        <Controller
                            name="penyebab_permasalahan"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="penyebab_permasalahan"
                                        type="text"
                                        placeholder="masukkan Penyebab Permasalahan"
                                        value={field.value || PenyebabPermasalahan}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setPenyebabPermasalahan(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="data_terukur_terkait_csf"
                        >
                            Data Terukur Terkait CSF :
                        </label>
                        <Controller
                            name="data_terukur_terkait_csf"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="data_terukur_terkait_csf"
                                        type="text"
                                        placeholder="masukkan Data Terukur Terkait CSF"
                                        value={field.value || DataTerukur}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setDataTerukur(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="kondisi_terukur_yang_diharapkan"
                        >
                            Kondisi Terukur Yang Diharapkan :
                        </label>
                        <Controller
                            name="kondisi_terukur_yang_diharapkan"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="kondisi_terukur_yang_diharapkan"
                                        type="text"
                                        placeholder="masukkan Kondisi Terukur Yang Diharapkan"
                                        value={field.value || KondisiDiharapkan}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setKondisiDiharapkan(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="kondisi_yang_diperlukan"
                        >
                            Kondisi Yang Diperlukan :
                        </label>
                        <Controller
                            name="kondisi_yang_diperlukan"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded-lg"
                                        id="kondisi_yang_diperlukan"
                                        type="text"
                                        placeholder="masukkan Kondisi Yang Diperlukan"
                                        value={field.value || KondisiDiperlukan}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setKondisiDiperlukan(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <ButtonGreen
                        type="submit"
                        className="my-4"
                        disabled={Proses}
                    >
                        {Proses ?
                            <span className="flex">
                                <LoadingButtonClip />
                                Menyimpan...
                            </span>
                            :
                            "Simpan"
                        }
                    </ButtonGreen>
                    <ButtonRed type="button" halaman_url="/intermediate">
                        Kembali
                    </ButtonRed>
                </form>
            </div>
        </>
    )
}
export const FormEditIntermediate = () => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValue>();
    const [IntermediateOutcome, setIntermediateOutcome] = useState<string>('');
    const [PenyebabPermasalahan, setPenyebabPermasalahan] = useState<string>('');
    const [DataTerukur, setDataTerukur] = useState<string>('');
    const [KondisiDiharapkan, setKondisiDiharapkan] = useState<string>('');
    const [KondisiDiperlukan, setKondisiDiperlukan] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [idNull, setIdNull] = useState<boolean | null>(null);
    const [Proses, setProses] = useState<boolean>(false);
    const router = useRouter();
    const { id } = useParams();
    const token = getToken();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchTematikKab = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/pohon_kinerja_admin/detail/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('terdapat kesalahan di koneksi backend');
                }
                const result = await response.json();
                if (result.code == 500 || result.code == 400) {
                    setIdNull(true);
                } else {
                    const data = result.data;
                    if (data.intermediate_outcome) {
                        setIntermediateOutcome(data.intermediate_outcome);
                        reset((prev) => ({ ...prev, intermediate_outcome: data.intermediate_outcome }))
                    }
                    if (data.penyebab_permasalahan) {
                        setPenyebabPermasalahan(data.penyebab_permasalahan);
                        reset((prev) => ({ ...prev, penyebab_permasalahan: data.penyebab_permasalahan }))
                    }
                    if (data.data_terukur_pendukung_pernyataan) {
                        setDataTerukur(data.data_terukur_pendukung_pernyataan);
                        reset((prev) => ({ ...prev, data_terukur_pendukung_pernyataan: data.data_terukur_pendukung_pernyataan }))
                    }
                    if (data.kondisi_terukur_yang_diharapkan) {
                        setKondisiDiharapkan(data.kondisi_terukur_yang_diharapkan);
                        reset((prev) => ({ ...prev, kondisi_terukur_yang_diharapkan: data.kondisi_terukur_yang_diharapkan }))
                    }
                    if (data.kondisi_yang_diperlukan) {
                        setKondisiDiperlukan(data.kondisi_yang_diperlukan);
                        reset((prev) => ({ ...prev, kondisi_yang_diperlukan: data.kondisi_yang_diperlukan }))
                    }
                }
            } catch (err) {
                setError('gagal mendapatkan data, periksa koneksi internet atau database server')
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTematikKab();
    }, [id, reset, token]);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            //key : value
            id: id,
            intermediate_outcome: data.intermediate_outcome,
            penyebab_permasalahan: data.penyebab_permasalahan,
            data_terukur_terkait_csf: data.data_terukur_terkait_csf,
            kondisi_terukur_yang_diharapkan: data.kondisi_terukur_yang_diharapkan,
            kondisi_yang_diperlukan: data.kondisi_yang_diperlukan,
        };
        console.log(formData);
        // try {
        //     setProses(true);
        //     const response = await fetch(`${API_URL}/pohon_kinerja_admin/update/${id}`, {
        //         method: "PUT",
        //         headers: {
        //             Authorization: `${token}`,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //     if (response.ok) {
        //         AlertNotification("Berhasil", "Berhasil edit data tematik kabupaten", "success", 1000);
        //         router.push("/intermediate");
        //     } else {
        //         AlertNotification("Gagal", "terdapat kesalahan pada backend / database server", "error", 2000);
        //     }
        // } catch (err) {
        //     AlertNotification("Gagal", "cek koneksi internet/terdapat kesalahan pada database server", "error", 2000);
        // } finally {
        //     setProses(false);
        // }
    };

    if (loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Edit Intermediate :</h1>
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Edit Intermediate :</h1>
                <h1 className="text-red-500 mx-5 py-5">{error}</h1>
            </div>
        )
    } else if (idNull) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Edit Intermediate :</h1>
                <h1 className="text-red-500 mx-5 py-5">id data tidak ditemukan</h1>
            </div>
        )
    } else {
        return (
            <>
                <div className="border p-5 rounded-xl shadow-xl">
                    <h1 className="uppercase font-bold">Form Edit Intermediate :</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-5 py-5"
                    >
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="intermediate_outcome"
                            >
                                Intermediate Outcome :
                            </label>
                            <Controller
                                name="intermediate_outcome"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="intermediate_outcome"
                                            type="text"
                                            placeholder="masukkan Intermediate Outcome"
                                            value={field.value || IntermediateOutcome}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setIntermediateOutcome(e.target.value);
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="penyebab_permasalahan"
                            >
                                Penyebab Permasalahan :
                            </label>
                            <Controller
                                name="penyebab_permasalahan"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="penyebab_permasalahan"
                                            type="text"
                                            placeholder="masukkan Penyebab Permasalahan"
                                            value={field.value || PenyebabPermasalahan}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setPenyebabPermasalahan(e.target.value);
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="data_terukur_terkait_csf"
                            >
                                Data Terukur Terkait CSF :
                            </label>
                            <Controller
                                name="data_terukur_terkait_csf"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="data_terukur_terkait_csf"
                                            type="text"
                                            placeholder="masukkan Data Terukur Terkait CSF"
                                            value={field.value || DataTerukur}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setDataTerukur(e.target.value);
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kondisi_terukur_yang_diharapkan"
                            >
                                Kondisi Terukur Yang Diharapkan :
                            </label>
                            <Controller
                                name="kondisi_terukur_yang_diharapkan"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="kondisi_terukur_yang_diharapkan"
                                            type="text"
                                            placeholder="masukkan Kondisi Terukur Yang Diharapkan"
                                            value={field.value || KondisiDiharapkan}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setKondisiDiharapkan(e.target.value);
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="kondisi_yang_diperlukan"
                            >
                                Kondisi Yang Diperlukan :
                            </label>
                            <Controller
                                name="kondisi_yang_diperlukan"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id="kondisi_yang_diperlukan"
                                            type="text"
                                            placeholder="masukkan Kondisi Yang Diperlukan"
                                            value={field.value || KondisiDiperlukan}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setKondisiDiperlukan(e.target.value);
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <ButtonGreen
                            type="submit"
                            className="my-4"
                            disabled={Proses}
                        >
                            {Proses ?
                                <span className="flex">
                                    <LoadingButtonClip />
                                    Menyimpan...
                                </span>
                                :
                                "Simpan"
                            }
                        </ButtonGreen>
                        <ButtonRed type="button" halaman_url="/intermediate">
                            Kembali
                        </ButtonRed>
                    </form>
                </div >
            </>
        )
    }
}