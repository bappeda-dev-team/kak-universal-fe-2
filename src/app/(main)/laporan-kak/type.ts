export interface LaporanKak {
    nama_pegawai: string;
    nip: string;
    rencana_kinerja: Rekin[];
}

export interface Rekin {
    id_rencana_kinerja: string;
    id_pohon: number;
    perlu_ubah_pokin: boolean;
    nama_pohon: string;
    nama_rencana_kinerja: string;
    tahun: string;
    status_rencana_kinerja: string;
    operasional_daerah: {
        nama_opd: string;
        kode_opd: string;
    };
    pegawai_id: string;
    nama_pegawai: string;
    indikator: IndikatorRenkin[];
}

export interface RincianRekin {
    rencana_kinerja: Rekin;
    rencana_aksis: Renaksi;
    subkegiatan: any;
    permasalahan: any;
    dasar_hukum: any;
    gambaran_umum: any;
    inovasi: any;
}
export interface TargetIndikatorRenkin {
    id_target: string;
    indikator_id: string;
    target: string;
    satuan: string;
}
export interface IndikatorRenkin {
    id_indikator: string;
    rencana_kinerja_id: string;
    nama_indikator: string;
    targets: TargetIndikatorRenkin[];
    manual_ik_exist: boolean;
}

export interface RencanaAksi {
    rencana_aksi: Renaksi[];
    total_per_bulan: TotalPerBulan[];
    total_keseluruhan: number;
    waktu_dibutuhkan: number;
}
export interface Renaksi {
    id: string;
    rekin_id: string;
    kode_opd: string;
    urutan: number;
    nama_rencana_aksi: string;
    pelaksanaan: Pelaksanaan[];
    jumlah_bobot: number;
}
export interface Pelaksanaan {
    id: string;
    rencana_aksi_id: string;
    bulan: number;
    bobot: number;
}
export interface TotalPerBulan {
    bulan: number;
    total_bobot: number;
}

export interface SubKegiatan {
    subkegiatanterpilih_id: string;
    id: string;
    rekin_id: string;
    kode_subkegiatan: string;
    nama_sub_kegiatan: string;
}

export interface DasarHukum {
    id: string;
    rencana_kinerja_id: string;
    kode_opd: string;
    urutan: number;
    peraturan_terkait: string;
    uraian: string;
}

export interface GambaranUmum {
    id: string;
    gambaran_umum: string;
}

export interface Permasalahan {
    Id: number;
    RekinId: string;
    Permasalahan: string;
    PenyebabInternal: string;
    PenyebabEksternal: string;
    JenisPermasalahan: string;
}