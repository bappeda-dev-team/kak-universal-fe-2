export interface WebResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}

export interface OptionResponse {
    label: string;
    value: string;
}

export type PegawaiResponse = {
    id: number;
    nip: string;
    nama_pegawai: string;
    status_pegawai: string;
};

export interface PegawaiDetailResponse {
    id: number;
    nip: string;
    nama_pegawai: string;
    jabatan_pegawais: JabatanPegawaiResponse[];
}

export interface JabatanPegawaiResponse {
    id: number;
    pegawai_id: number;
    nama_jabatan: string;
    nama_opd: string;
    jenis_penugasan: JenisPenugasan;
    alasan_berakhir: AlasanBerakhir | null;
    tmt_mulai: string;
    tmt_akhir: string | null;
    created_date: string;
}

export interface JenisPenugasan {
    label: string;
    value: "UTAMA" | "PLT" | "PLH" | "PJ" | "BELUM_DIATUR";
}

export interface AlasanBerakhir {
    label: string;
    value: string;
}

export type MutasiPegawaiRequest = {
    pegawai_id: number;
    master_jabatan_id: number;
    opd_id: number;
    jenis_penugasan: string;
    tmt_mulai: string;
};
