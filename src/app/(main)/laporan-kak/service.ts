import { WebResponse } from "./type";
import { getToken } from "@/components/lib/Cookie";
import { RincianRekin } from "./type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const token = getToken();

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const result: WebResponse<T> = await response.json();

    return result.rencana_kinerja;
}

export const api = {
    laporan_kak: {
        findall(params?: { kode_opd?: string | number; tahun?: string | number}) {
            const searchParams = new URLSearchParams();

            if (params?.tahun) {
                searchParams.set("tahun", String(params.tahun));
            }

            if (params?.kode_opd) {
                searchParams.set("kode_opd", String(params.kode_opd));
            }

            const query = searchParams.toString();

            return request<any[]>(
                query ? `/api_internal/rencana_kinerja/findall?${query}` : "/api_internal/rencana_kinerja/findall"
            );
        },
    },
    rincian_kak: {
        findall(params?: { id?: string; nip?: string}) {
            return request<RincianRekin[]>(
                `/rencana_kinerja/${params?.id}/pegawai/${params?.nip}/input_rincian_kak`
            );
        },
    }
};
