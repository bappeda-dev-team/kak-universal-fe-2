export interface TargetTujuan {
    id: number;
    satuan: string;
    tahun: string;
    target: number;
}

export interface IndikatorTujuan {
    definisi_operasional: string;
    id: number;
    indikator: string;
    jenis: string;
    kode_indikator: string;
    rumus_perhitungan: string;
    sumber_data: string;
    target: TargetTujuan[];
    target_ranwal: TargetTujuan[];
    target_rankhir: TargetTujuan[];
    target_penetapan: TargetTujuan[];
}

export interface TujuanPemdaRKPD {
    id: number;
    id_misi: number;
    id_visi: number;
    indikator: IndikatorTujuan[];
    jenis_pohon: string;
    misi: string;
    nama_tematik: string;
    periode: {
        jenis_periode: string;
        tahun_akhir: string;
        tahun_awal: string;
    }
    periode_id: number;
    tematik_id: number;
    tujuan_pemda: string;
    visi: string;
}