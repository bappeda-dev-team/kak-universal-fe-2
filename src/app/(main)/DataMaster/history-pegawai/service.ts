import type { WebResponse, PegawaiDetailResponse, PegawaiResponse, MutasiPegawaiRequest, OptionResponse } from "./types";

const API_KEPEGAWAIAN =
    process.env.NEXT_PUBLIC_API_KEPEGAWAIAN || "http://localhost:8080"

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${API_KEPEGAWAIAN}${path}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const result: WebResponse<T> = await response.json();

    return result.data;
}

async function submit<T>(
    path: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    body?: unknown,
): Promise<T> {
    const response = await fetch(`${API_KEPEGAWAIAN}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const result: WebResponse<T> = await response.json();

    return result.data;
}

export const api = {
    masterJabatan: {
        options() {
            return request<OptionResponse[]>("/master-jabatan/options")
        },
    },
    opd: {
        options() {
            return request<OptionResponse[]>("/opd/options")
        }
    },
    jabatanPegawai: {
        tambahJabatan(requestBody: MutasiPegawaiRequest) {
            return submit<void>(
                "/jabatan-pegawai",
                "POST",
                requestBody,
            );
        },
        jenisPenugasanOptions() {
            return request<OptionResponse[]>("/jabatan-pegawai/options/jenis-penugasan")
        },
        mutasiPegawai(requestBody: MutasiPegawaiRequest) {
            return submit<void>(
                "/jabatan-pegawai/pindah-pegawai",
                "POST",
                requestBody,
            );
        },
    },
    pegawai: {
        pegawais() {
            return request<PegawaiResponse[]>("/pegawai");
        },

        pegawaiHistory(id: number) {
            return request<PegawaiDetailResponse>(`/pegawai/histori/${id}`);
        },
    }
};
