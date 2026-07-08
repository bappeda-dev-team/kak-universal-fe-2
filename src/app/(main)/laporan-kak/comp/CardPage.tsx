'use client'

import { api } from "../service";
import useSWR from "swr";
import Table from "./Table";
import { LoadingClip } from "@/components/global/Loading";

interface CardPage {
    tahun: string | number;
    kode_opd: string | number;
    nama_opd: string;
}

export default function CardPage({ tahun, kode_opd, nama_opd }: CardPage) {

    const shouldFetch = Boolean(tahun && kode_opd);

    const { data = [], isLoading } = useSWR(
        shouldFetch ? ["laporan-kak", tahun, kode_opd] : null,
        () => api.laporan_kak.findall({ tahun, kode_opd }), { revalidateOnFocus: false }
    );

    if (isLoading) {
        return <LoadingClip />
    } else {
        return (
            <Table nama_opd={nama_opd} data={data} />
        )
    }
}