export interface TematikFindall {
    id: number;
    parent: number;
    tema: string;
    keterangan: string;
    is_active: boolean;
    indikator: Indikator[]; 
    childs?: TematikFindall[];
    jenis_pohon?: string;
}
export interface Indikator {
    id_indikator: string;
    nama_indikator: string;
    targets: Target[];
}
export interface Target {
    id_target: string;
    target: string;
    satuan: string;
};
