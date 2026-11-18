'use client'

import { useEffect, useState } from "react";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ButtonSky, ButtonRed } from "@/components/global/Button";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import { GetResponseFindallJabatan, FormValue } from "../type";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";

interface modal {
    jenis: "tambah" | "edit";
    nama_opd: string;
    kode_opd: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    Data: GetResponseFindallJabatan | null
}

export const ModalMasterJabatan: React.FC<modal> = ({
    isOpen,
    onClose,
    onSuccess,
    jenis,
    Data,
    nama_opd,
    kode_opd
}) => {

    const { branding } = useBrandingContext();
    const token = getToken();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValue>({
        defaultValues: {
            id: Data?.id,
            nama_jabatan: Data?.nama_jabatan ?? "",
            orang_ke: Data?.kode_jabatan?.split(".").pop() ?? "",
            jabatan_ke: Data?.kode_jabatan?.split(".")[3] ?? "",
        }
    });

    const [Proses, setProses] = useState<boolean>(false);

    // Watch perubahan orang_ke
    const orangKe = useWatch({
        control,
        name: "orang_ke"
    });

    const jabatanKe = useWatch({
        control,
        name: "jabatan_ke"
    });

    // Generate kode jabatan otomatis
    const kodeJabatan = orangKe
        ? `${kode_opd.substring(0, 4)}.${orangKe}.${jabatanKe}`
        : "";

    // Reset form ketika modal atau data berubah
    useEffect(() => {
        if (isOpen) {
            const kodeParts = Data?.kode_jabatan?.split(".") ?? [];

            reset({
                id: Data?.id,
                nama_jabatan: Data?.nama_jabatan ?? "",
                orang_ke: jenis === "edit"
                    ? Data?.kode_jabatan?.split(".").pop() ?? ""
                    : "",
                jabatan_ke: jenis === "edit" ? kodeParts[3] ?? "" : "",
            });
        }
    }, [isOpen, Data, jenis, reset]);

    const handleClose = () => {
        onClose();
        reset();
    };

    const onSubmit: SubmitHandler<FormValue> = async (data) => {

        if (!kode_opd || kode_opd.length < 5) {
            AlertNotification(
                "Gagal",
                "Kode OPD tidak valid",
                "error",
                2000
            );
            return;
        }

        const formData = {
            nama_jabatan: data.nama_jabatan,
            kode_jabatan: `${kode_opd.substring(0, 4)}.${data.orang_ke}.${data.jabatan_ke}`,
            kode_opd: kode_opd
        };

        const url = jenis === "tambah"
            ? `${branding?.api_perencanaan}/jabatan/create`
            : `${branding?.api_perencanaan}/jabatan/update/${Data?.id}`;

        try {
            setProses(true);

            const response = await fetch(url, {
                method: jenis === "tambah" ? "POST" : "PUT",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                AlertNotification(
                    "Berhasil",
                    "Berhasil menyimpan data jabatan",
                    "success",
                    1000
                );

                onClose();
                reset();
                onSuccess();
            } else {
                AlertNotification(
                    "Gagal",
                    "Terdapat kesalahan pada backend / database server",
                    "error",
                    2000
                );
            }

        } catch (err) {
            AlertNotification(
                "Gagal",
                "Cek koneksi internet / terdapat kesalahan pada database server",
                "error",
                2000
            );
        } finally {
            setProses(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-black opacity-30"
                onClick={handleClose}
            />

            <div className="bg-white rounded-lg p-8 z-10 w-4/5 max-h-[80%] text-start overflow-auto">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mx-5 py-5"
                >
                    <div className="border-b">
                        <h1 className="text-xl font-semibold uppercase text-center">
                            {jenis} Jabatan
                        </h1>
                    </div>

                    {/* Perangkat Daerah */}
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                            Perangkat Daerah
                        </label>
                        <div className="border px-4 py-2 rounded-lg bg-gray-50">
                            {nama_opd || "-"}
                        </div>
                    </div>

                    {/* Nama Jabatan */}
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                            Nama Jabatan
                            {errors.nama_jabatan && (
                                <span className="text-red-500"> : wajib diisi</span>
                            )}
                        </label>

                        <Controller
                            name="nama_jabatan"
                            control={control}
                            rules={{ required: "Nama jabatan wajib diisi" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="nama_jabatan"
                                    type="text"
                                    className="border px-4 py-2 rounded-lg"
                                    placeholder="Masukkan nama jabatan"
                                />
                            )}
                        />
                    </div>

                    {/* Orang Ke */}
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                            Level Jabatan
                            {errors.orang_ke && (
                                <span className="text-red-500"> : wajib diisi (minimal 1)</span>
                            )}
                        </label>

                        <Controller
                            name="orang_ke"
                            control={control}
                            rules={{
                                required: "Level Jabatan wajib diisi",
                                validate: (value) =>
                                    Number(value) >= 1 || "Minimal level jabatan adalah 1",
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="orang_ke"
                                    type="number"
                                    min={1}
                                    className="border px-4 py-2 rounded-lg"
                                    placeholder="Level jabatan, dari kepala (1) ke staff (4)"
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                            Jabatan Ke
                            {errors.jabatan_ke && (
                                <span className="text-red-500"> : wajib diisi (minimal 1)</span>
                            )}
                        </label>

                        <Controller
                            name="jabatan_ke"
                            control={control}
                            rules={{
                                required: "Jabatan ke wajib diisi",
                                validate: (value) =>
                                    Number(value) >= 1 || "Minimal jabatan ke adalah 1",
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="jabatan_ke"
                                    type="number"
                                    min={1}
                                    className="border px-4 py-2 rounded-lg"
                                    placeholder="Urutan jabatan pada level yang sama (contoh: 1, 2, 3)"
                                />
                            )}
                        />
                    </div>

                    {/* Kode Jabatan Otomatis */}
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2">
                            Kode Jabatan
                        </label>

                        <input
                            id="kode_jabatan"
                            type="text"
                            value={kodeJabatan}
                            readOnly
                            className="border px-4 py-2 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            placeholder="Kode jabatan akan dibuat otomatis"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1 mt-3">
                        <ButtonSky
                            type="submit"
                            className="w-full"
                            disabled={Proses}
                        >
                            {Proses ? (
                                <>
                                    <LoadingButtonClip />
                                    <span>menyimpan..</span>
                                </>
                            ) : (
                                <>
                                    <TbDeviceFloppy />
                                    <span>Simpan</span>
                                </>
                            )}
                        </ButtonSky>

                        <ButtonRed
                            className="flex items-center gap-1 w-full"
                            onClick={handleClose}
                            disabled={Proses}
                        >
                            <TbX />
                            Batal
                        </ButtonRed>
                    </div>
                </form>
            </div>
        </div>
    );
};
