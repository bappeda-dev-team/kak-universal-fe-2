"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    FiUsers,
    FiX,
    FiAlertCircle,
    FiRefreshCw,
} from "react-icons/fi";

import {
    DetailSubkegiatan,
    PengampuSubkegiatanProps,
} from "@/types";

interface Props extends PengampuSubkegiatanProps {
    onClose: () => void;
}

const ModalPengampuSubkegiatan = ({
    url,
    token,
    kodeSubkegiatan,
    namaSubkegiatan,
    kodeOpd,
    tahunAwal,
    tahunAkhir,
    onClose,
}: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [data, setData] = useState<DetailSubkegiatan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (dialog && !dialog.open) {
            dialog.showModal();
        }

        return () => {
            if (dialog?.open) {
                dialog.close();
            }
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError("");
            setData(null);

            try {
                const params = new URLSearchParams({
                    kode_subkegiatan: kodeSubkegiatan,
                    kode_opd: kodeOpd,
                    tahun_awal: String(tahunAwal),
                    tahun_akhir: String(tahunAkhir),
                });

                const response = await fetch(
                    `${url}/matrix-renstra/pengampu-subkegiatan?${params}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            'Content-Type': 'application/json',
                        },
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Gagal mengambil data pengampu subkegiatan"
                    );
                }

                const result = await response.json();

                setData(result.data);
            } catch (err) {
                if (controller.signal.aborted) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : "Terjadi kesalahan"
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [
        kodeSubkegiatan,
        kodeOpd,
        tahunAwal,
        tahunAkhir,
        retry,
    ]);

    const pengampu = data?.pengampu ?? [];

    return createPortal(
        <dialog
            ref={dialogRef}
            aria-labelledby="pengampu-modal-title"
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            className="
                fixed inset-0 m-auto
                w-[calc(100%-2rem)] max-w-5xl
                max-h-[90dvh]
                overflow-hidden rounded-xl
                bg-white shadow-2xl
                backdrop:bg-black/40
            "
        >
            <div className="flex max-h-[90dvh] flex-col">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
                            <FiUsers size={22} />
                        </div>

                        <div>
                            <h2
                                id="pengampu-modal-title"
                                className="text-lg font-semibold text-gray-800"
                            >
                                Detail Subkegiatan
                            </h2>

                            <p className="text-sm text-gray-500">
                                Informasi pengampu dan rencana kinerja
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Tutup modal"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 overflow-y-auto p-6">

                    {/* Informasi Subkegiatan */}
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b">
                                    <th
                                        scope="row"
                                        className="w-[25%] bg-gray-50 px-4 py-3 text-left font-medium text-gray-600"
                                    >
                                        Kode Subkegiatan
                                    </th>
                                    <td className="px-4 py-3 font-medium">
                                        {kodeSubkegiatan}
                                    </td>
                                </tr>

                                <tr>
                                    <th
                                        scope="row"
                                        className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-600"
                                    >
                                        Nama Subkegiatan
                                    </th>
                                    <td className="px-4 py-3">
                                        {namaSubkegiatan}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pengampu Subkegiatan */}
                    <section>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">
                                Pengampu Subkegiatan
                            </h3>

                            {!loading && !error && (
                                <span className="text-sm text-gray-500">
                                    {pengampu.length} data
                                </span>
                            )}
                        </div>

                        <div className="overflow-x-auto rounded-lg border">
                            <table className="w-full min-w-[650px] text-sm">
                                <thead className="bg-emerald-500 text-white">
                                    <tr>
                                        <th className="w-12 border-r border-emerald-400 px-4 py-3">
                                            No
                                        </th>
                                        <th className="w-[30%] border-r border-emerald-400 px-4 py-3 text-left">
                                            Nama (NIP)
                                        </th>
                                        <th className="border-r border-emerald-400 px-4 py-3 text-left">
                                            Rencana Kinerja
                                        </th>
                                        <th className="w-24 px-4 py-3">
                                            Tahun
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">

                                    {/* Loading */}
                                    {loading && (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="flex flex-col items-center gap-3 py-12 text-gray-500">
                                                    <FiRefreshCw
                                                        size={24}
                                                        className="animate-spin text-emerald-500"
                                                    />
                                                    Memuat data pengampu...
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {/* Error */}
                                    {!loading && error && (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="flex flex-col items-center gap-3 py-12">
                                                    <FiAlertCircle
                                                        size={28}
                                                        className="text-red-500"
                                                    />

                                                    <p className="text-red-600">
                                                        {error}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setRetry((prev) => prev + 1)
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-50"
                                                    >
                                                        <FiRefreshCw />
                                                        Coba Lagi
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {/* Empty */}
                                    {!loading &&
                                        !error &&
                                        pengampu.length === 0 && (
                                            <tr>
                                                <td colSpan={4}>
                                                    <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
                                                        <FiUsers size={32} />

                                                        <p className="font-medium text-gray-600">
                                                            Belum ada pengampu
                                                        </p>

                                                        <p className="text-sm">
                                                            Tidak ditemukan pengampu
                                                            pada periode {tahunAwal}–{tahunAkhir}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    {/* Data */}
                                    {!loading &&
                                        !error &&
                                        pengampu.map((item, index) => (
                                            <tr
                                                key={`${item.nip}-${item.rencana_kinerja_id}-${item.tahun}`}
                                                className="align-top odd:bg-white even:bg-gray-50 hover:bg-emerald-50"
                                            >
                                                <td className="border-r px-4 py-3 text-center">
                                                    {index + 1}
                                                </td>

                                                <td className="border-r px-4 py-3">
                                                    <div className="font-medium text-gray-800">
                                                        {item.nama_pegawai}
                                                    </div>

                                                    <div className="mt-1 text-xs text-gray-500">
                                                        {item.nip}
                                                    </div>
                                                </td>

                                                <td className="border-r px-4 py-3 leading-relaxed">
                                                    {item.rencana_kinerja}
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    {item.tahun}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t bg-gray-50 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </dialog>,
        document.body
    );
};

export default ModalPengampuSubkegiatan;
