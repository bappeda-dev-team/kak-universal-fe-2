export interface Laporan {
  kode_opd: string;
  nama_opd: string;
  tahun: number;
  pohon_kinerja: pohonkinerja[];
}

interface pohonkinerja {
  NamaPohon: string;
  KodeOpd: string;
  NamaOpd: string;
  indikator: indikator[];
  pelaksana: pelaksana[];
  crosscutting_dikirim: crosscuttingDikirim[];
}

interface indikator {
  id_indikator: string;
  id_pokin: string;
  nama_indikator: string;
  target: target[];
}

interface target {
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

interface crosscuttingDikirim {
  id_crosscutting: string;
  keterangan_crosscutting: string;
  nama_pohon_tujuan: string;
  kode_opd_tujuan: string;
 nama_opd_tujuan: string;
 status: string;
 indikator_dikirim: indikator[];
 pelaksana_dikirim: pelaksana[];
}
