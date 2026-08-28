import { apiFetch } from "@/services/api";

const BASE_URL = "/api-perencanaan";

export const perencanaanService = {
    // =========================================================
    // Rencana Kinerja
    // =========================================================

    getRencanaKinerja(id: number) {
        return apiFetch(
            `${BASE_URL}/rencana_kinerja/${id}`
        );
    },

    createRencanaKinerja(data: unknown) {
        return apiFetch(
            `${BASE_URL}/rencana_kinerja/create`,
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    updateRencanaKinerja(id: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/rencana_kinerja/update/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );
    },

    deleteRencanaKinerja(id: number) {
        return apiFetch(
            `${BASE_URL}/rencana_kinerja/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    getDetailRencanaKinerja(id: number) {
        return apiFetch(
            `${BASE_URL}/detail-rencana_kinerja/${id}`
        );
    },

    // =========================================================
    // Renaksi
    // =========================================================

    getDetailRencanaAksi(id: number) {
        return apiFetch(
            `${BASE_URL}/detail-rencana_aksi/${id}`
        );
    },

    deleteRencanaAksi(id: number) {
        return apiFetch(
            `${BASE_URL}/rencana_aksi/delete/${id}`
        );
    },

    deleteRencanaAksiById(id: number) {
        return apiFetch(
            `${BASE_URL}/rencana_aksi/delete/rencanaaksi/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Tahapan / Pelaksanaan Renaksi
    // =========================================================

    getDetailPelaksanaanRencanaAksi(id: number) {
        return apiFetch(
            `${BASE_URL}/pelaksanaan_rencana_aksi/detail/${id}`
        );
    },

    deletePelaksanaanRencanaAksi(id: number) {
        return apiFetch(
            `${BASE_URL}/pelaksanaan_rencana_aksi/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Gambaran Umum
    // =========================================================

    createGambaranUmum(idRekin: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/gambaran_umum/create/${idRekin}`,
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    getGambaranUmum(id: number) {
        return apiFetch(
            `${BASE_URL}/gambaran_umum/detail/${id}`
        );
    },

    updateGambaranUmum(id: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/gambaran_umum/update/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );
    },

    deleteGambaranUmum(id: number) {
        return apiFetch(
            `${BASE_URL}/gambaran_umum/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Dasar Hukum
    // =========================================================

    createDasarHukum(idRekin: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/dasar_hukum/create/${idRekin}`,
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    getDasarHukum(id: number) {
        return apiFetch(
            `${BASE_URL}/dasar_hukum/detail/${id}`
        );
    },

    updateDasarHukum(id: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/dasar_hukum/update/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );
    },

    deleteDasarHukum(id: number) {
        return apiFetch(
            `${BASE_URL}/dasar_hukum/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Permasalahan
    // =========================================================

    getDetailPermasalahan(id: number) {
        return apiFetch(
            `${BASE_URL}/permasalahan_rekin/detail/${id}`
        );
    },

    deletePermasalahan(id: number) {
        return apiFetch(
            `${BASE_URL}/permasalahan_rekin/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    getPermasalahanTerpilih(
        kodeOpd: string,
        tahun: number
    ) {
        return apiFetch(
            `${BASE_URL}/permasalahan_terpilih/findall?kode_opd=${encodeURIComponent(kodeOpd)}&tahun=${tahun}`
        );
    },

    // =========================================================
    // Inovasi
    // =========================================================

    createInovasi(idRekin: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/inovasi/create/${idRekin}`,
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    getInovasi(id: number) {
        return apiFetch(
            `${BASE_URL}/inovasi/detail/${id}`
        );
    },

    getInovasiList(id: number) {
        return apiFetch(
            `${BASE_URL}/inovasi/findall/${id}`
        );
    },

    updateInovasi(id: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/inovasi/update/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );
    },

    deleteInovasi(id: number) {
        return apiFetch(
            `${BASE_URL}/inovasi/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Usulan
    // =========================================================

    getUsulanMusrenbang() {
        return apiFetch(
            `${BASE_URL}/usulan_musrebang/findall?status=belum_diambil`
        );
    },

    deleteUsulanMusrenbang(id: number) {
        return apiFetch(
            `${BASE_URL}/usulan_musrebang/delete_usulan_terpilih/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    getUsulanPokokPikiran() {
        return apiFetch(
            `${BASE_URL}/usulan_pokok_pikiran/findall?status=belum_diambil`
        );
    },

    deleteUsulanPokokPikiran(id: number) {
        return apiFetch(
            `${BASE_URL}/usulan_pokok_pikiran/delete_usulan_terpilih/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    deleteUsulanInisiatif(id: number) {
        return apiFetch(
            `${BASE_URL}/usulan_inisiatif/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    deleteUsulanMandatori(id: number) {
        return apiFetch(
            `${BASE_URL}/usulan_mandatori/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Sub Kegiatan
    // =========================================================

    getSubKegiatan(kodeOpd: string, tahun: number) {
        return apiFetch(
            `${BASE_URL}/subkegiatanopd/findall/${encodeURIComponent(kodeOpd)}/${tahun}`
        );
    },

    createSubKegiatan(id: number, data: unknown) {
        return apiFetch(
            `${BASE_URL}/sub_kegiatan/create_rekin/${id}`,
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    deleteSubKegiatan(id: number) {
        return apiFetch(
            `${BASE_URL}/sub_kegiatan/delete_subkegiatan_terpilih/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Pohon Kinerja
    // =========================================================

    getPohonKinerjaOpd(id: number) {
        return apiFetch(
            `${BASE_URL}/pohon_kinerja_opd/detail/${id}`
        );
    },

    getPohonKinerjaPokinByPelaksana(
        nip: string,
        tahun: number
    ) {
        return apiFetch(
            `${BASE_URL}/rencana_kinerja_pokin/pokin_by_pelaksana/${encodeURIComponent(nip)}/${tahun}`
        );
    },

    getSasaranOpdPokin(id: number, tahun: number) {
        return apiFetch(
            `${BASE_URL}/sasaran_opd/pokin/${id}/tahun/${tahun}`
        );
    },

    deletePohonKinerjaOpd(id: number) {
        return apiFetch(
            `${BASE_URL}/pohon_kinerja_opd/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Review Pokin
    // =========================================================

    getReviewPokin(idPohon: number) {
        return apiFetch(
            `${BASE_URL}/review_pokin/findall/${idPohon}`
        );
    },

    getReviewPokinDetail(id: number) {
        return apiFetch(
            `${BASE_URL}/review_pokin/detail/${id}`
        );
    },

    deleteReviewPokin(id: number) {
        return apiFetch(
            `${BASE_URL}/review_pokin/delete/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    // =========================================================
    // Program Unggulan
    // =========================================================

    getProgramUnggulan(
        kodeOpd: string,
        tahun: number
    ) {
        return apiFetch(
            `${BASE_URL}/program_unggulan/findbyopd_and_tahun/${encodeURIComponent(kodeOpd)}/${tahun}`
        );
    },

    getProgramUnggulanList(
        tahunAwal: number,
        tahunAkhir: number
    ) {
        return apiFetch(
            `${BASE_URL}/program_unggulan/findbytahun/${tahunAwal}/${tahunAkhir}`
        );
    },

    // =========================================================
    // Program Prioritas Pusat
    // =========================================================

    getProgramPrioritasPusat(tahun: number) {
        return apiFetch(
            `${BASE_URL}/program_prioritas_pusat/findbytahun/${tahun}`
        );
    },

    // =========================================================
    // OPD
    // =========================================================

    getOpdList() {
        return apiFetch(
            `${BASE_URL}/opd/findall`
        );
    },

    // =========================================================
    // Lembaga
    // =========================================================

    getLembagaList() {
        return apiFetch(
            `${BASE_URL}/lembaga/findall`
        );
    },

    // =========================================================
    // Bidang Urusan
    // =========================================================

    getBidangUrusanList() {
        return apiFetch(
            `${BASE_URL}/bidang_urusan/findall`
        );
    },

    // =========================================================
    // Urusan
    // =========================================================

    getUrusanList() {
        return apiFetch(
            `${BASE_URL}/urusan/findall`
        );
    },

    // =========================================================
    // Kegiatan
    // =========================================================

    getKegiatanList() {
        return apiFetch(
            `${BASE_URL}/kegiatan/findall`
        );
    },

    getKegiatan(id: number) {
        return apiFetch(
            `${BASE_URL}/kegiatan/detail/${id}`
        );
    },

    // =========================================================
    // Periode
    // =========================================================

    getPeriodeList() {
        return apiFetch(
            `${BASE_URL}/periode/findall`
        );
    },

    getPeriodeTahun(tahun: number) {
        return apiFetch(
            `${BASE_URL}/periode/tahun/${tahun}`
        );
    },

    // =========================================================
    // IKU
    // =========================================================

    getIndikatorUtamaOpd(
        kodeOpd: string,
        tahunAwal: number,
        tahunAkhir: number,
        jenis: string
    ) {
        return apiFetch(
            `${BASE_URL}/indikator_utama/opd/${encodeURIComponent(kodeOpd)}/${tahunAwal}/${tahunAkhir}/${encodeURIComponent(jenis)}`
        );
    },

    getIndikatorUtamaPeriode(
        tahunAwal: number,
        tahunAkhir: number,
        jenis: string
    ) {
        return apiFetch(
            `${BASE_URL}/indikator_utama/periode/${tahunAwal}/${tahunAkhir}/${encodeURIComponent(jenis)}`
        );
    },

    getIndikatorUtamaStatus(id: number) {
        return apiFetch(
            `${BASE_URL}/indikator_utama/status/${id}`
        );
    },
};
