export interface Target {
  id_target: string;
  indikator_id: string;
  target: string;
  satuan: string;
}

export interface IndikatorSubKegiatan {
  id_indikator: string;
  kode_subkegiatan: string;
  kode_opd: string;
  nama_indikator: string;
  targets: Target[];
}
export interface IndikatorRencanaKinerja {
  id_indikator: string;
  rencana_kinerja_id: string;
  nama_indikator: string;
  targets: Target[];
}

export interface RencanaAksi {
  renaksi_id: string;
  renaksi: string;
  anggaran: number;
}

export interface RincianBelanja {
  index: string;
  rencana_kinerja_id: string;
  rencana_kinerja: string;
  pegawai_id: string | null;
  nama_pegawai: string | null;
  indikator: IndikatorRencanaKinerja[];
  total_anggaran: number;
  rencana_aksi: RencanaAksi[] | null;
}

export interface PPTK {
  id: number;
  nip: string;
  nama_pegawai: string;
  kode_opd: string;
  tahun: number;
  kode_sub_kegiatan: string;
  nip_atasan: string;
  nama_atasan: string;
  aktif_at: string;
  nonaktif_at: string;
}

export interface KandidatPPTK {
  nip: string;
  nama: string;
  level: string;
}

export interface LaporanRincianBelanja {
  kode_opd: string;
  kode_subkegiatan: string;
  nama_subkegiatan: string;
  indikator_subkegiatan: IndikatorSubKegiatan[];
  total_anggaran: number;
  rincian_belanja: RincianBelanja[];
  kandidat_pptk: KandidatPPTK[];
  pptk: PPTK[];
}
