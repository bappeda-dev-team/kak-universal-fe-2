interface WebResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}

export type PegawaiResponse = {
    id: number;
    pegawai_id: string;
    nama_pegawai: string;
    status_pegawai: string;
};

export type JabatanPegawaiResponse = {
    id: number;
    nama_jabatan: string;
    status_penugasan: string;
    alasan_berakhir?: string;
    tmt_mulai: Date;
    tmt_akhir?: Date;
    created_date: Date;
}

export type DetailPegawaiResponse = {
    id: number;
    pegawai_id: string;
    nama_pegawai: string;
    status_pegawai: string;
    kode_opd: string;
    nama_opd: string;
    jabatan_pegawais: JabatanPegawaiResponse[];
}

export async function getPegawais(): Promise<PegawaiResponse[]> {
    const response = await fetch("/api/v1/kepegawaian/pegawai");

    if (!response.ok) {
        throw new Error(`Failed to fetch pegawai: ${response.status}`);
    }

    const result: WebResponse<PegawaiResponse[]> = await response.json();

    return result.data;
}
