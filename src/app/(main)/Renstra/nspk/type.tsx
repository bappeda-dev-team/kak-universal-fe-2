import { OptionType } from "@/types";

export interface FormValue {
  kode_opd: string;
  id_nspk: OptionType | null;
  id_tujuan_opd: OptionType | null;
  id_sasaran_opd: OptionType | null;
  tahun: number;
}

export interface NspkOpdFindall {
  id: number;
  kode_opd: string;
  nama_opd: string;
  id_nspk: number;
  nspk: string;
  id_tujuan_opd: number;
  tujuan_opd: string;
  id_sasaran_opd: number;
  sasaran_opd: string;
  tahun: number;
  created_at: string;
  updated_at: string;
}
