export interface Laporan {
    kode_opd: string;
    nama_opd: string;
    tahun: number;
    pohon_kinerja: pohonkinerjaKoordinator[];
}

export interface pohonkinerjaKoordinator {
    pohon_kinerja: Pohon;
    indikator: indikator[];
    pelaksana: pelaksana[];
    rencana_kinerja: rekin[];
    crosscutting_dikirim: crosscuttingDikirim[];
}

export interface Pohon {
    IdCrosscutting: number;
    Id: number;
    Parent: number;
    NamaPohon: string;
    KodeOpd: string;
    NamaOpd: string;
    Keterangan: string;
    KeteranganCrosscutting: string;
}

export interface indikator {
    id_indikator: string;
    id_pokin: string;
    nama_indikator: string;
    targets: target[];
}

export interface target {
    id_target: string;
    indikator_id: string;
    target: string;
    satuan: string;
}

interface pelaksana {
    id_pelaksana: string;
    pegawai_id: string;
    nama_pegawai: string;
}

export interface rekin {
    nama_pegawai: string;
    nama_sub_kegiatan: string;
    kode_sub_kegiatan: string;
    pagu: number;
}

export interface crosscuttingDikirim {
    id_crosscutting: string;
    keterangan_crosscutting: string;
    nama_pohon_tujuan: string;
    kode_opd_tujuan: string;
    nama_opd_tujuan: string;
    status: string;
    indikator_dikirim: indikator[];
    pelaksana_dikirim: pelaksana[];
    rencana_kinerja_dikirim: rekin[];
}
