export interface StrategicArahKebijakan {
  kode_opd: string;
  nama_opd: string;
  tahun: string;
  permasalahan_opds: PermasalahanOpd[];
  isu_strategis_opds: IsuStrategisOpd[];
  strategi_arah_kebijakan_opds: ArahKebijakan[];
}

export interface IsuStrategisOpd {
  nama_isu_strategis: string;
}

export interface PermasalahanOpd {
  permasalahan: string;
}

export interface ArahKebijakan {
  tujuan_opd: string;
  sasaran_opds: SasaranOpd[];
}

export interface SasaranOpd {
  sasaran_opd: string;
  strategi_opds: StrategiOpd[];
}

export interface StrategiOpd {
  strategi_opd: string;
  tactical_opds: TacticalOpd[];
}
export interface TacticalOpd {
  tactical_opd: string;
  operasional_opds: OperasionalOpd[];
}
export interface OperasionalOpd {
  operasional_opd: string;
}
