export interface InovasiLaporan {
  id: number;
  rencana_kinerja_id: string;
  nama_rencana_kinerja: string;
  indikator: indikator[];
  kode_opd: string;
  nama_opd: string;
  nama_inovasi: string;
  jenis_inovasi_id: number;
  jenis_inovasi: string;
  waktu_implementasi: string;
  instansi: string;
  inovator: string;
  kebaruan: string;
  asal_inovasi: string;
  tahun: number;
  nip_inovator: string;
  nama_nip_inovator: string;
  level: string;
  nama_pegawai: string;
  nama_subkegiatan: string;
  pagu_anggaran: number;
}

interface indikator {
  id_indikator: string;
  rencana_kinerja_id: string;
  nama_indikator: string;
  targets: target[];
}
interface target {
  id_target: string;
  indikator_id: string;
  target: string;
  satuan: string;
}
