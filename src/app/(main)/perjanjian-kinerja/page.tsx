"use client";

import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { useBrandingContext } from '@/context/BrandingContext';
import type { PkOpdResponse, PkPegawai, PkAsn, PkOpdByLevel, SasaranPemda, AtasanCandidate, KunciPkRequest, PkTerpilihProps, HandleSelectPkProps, HandleSelectAtasanProps, AtasanOption } from "./pk-opd-types";
import { getToken, getOpdTahunNew } from "@/components/lib/Cookie";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { TablePk } from "./table-pk";
import { TahunNull, OpdNull } from "@/components/global/OpdTahunNull";
import { ModalPilihAtasan } from './modal-pilih-atasan';
import { kunciPk } from "./pk-opd-service";
import { HubungkanModal } from "./hubungkan-modal";
import { PreviewPk } from "./preview-pk";

const PerjanjianKinerja = () => {
    // WARNING PATTERN INI TIDAK BOLEH
    // const token = getToken();
    // const kodeOpd = getOpdTahun().opd.value;
    // const tahun = getOpdTahun().tahun.value;

    // PAKAI STATE
    const [token, setToken] = useState<string | null>(null)
    const [kodeOpd, setKodeOpd] = useState<string | null>(null)
    const [tahun, setTahun] = useState<number | null>(null)
    const [roleUser, setRoleUser] = useState<string[]>([])

    useEffect(() => {
        const opdTahun = getOpdTahunNew()
        const token = getToken()

        if (!opdTahun || !token) return

        setToken(token)

        // set tahun
        if (opdTahun?.tahun?.value != null) {
            setTahun(opdTahun.tahun.value)
        }
        // set kode opd
        if (opdTahun?.opd != null) {
            setKodeOpd(opdTahun.opd.value)
        }
        if (opdTahun?.roles != null) {
            setRoleUser(opdTahun.roles)
        }
    }, [])

    const [data, setData] = useState<PkOpdResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [_submitting, setSubmitting] = useState(false)

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false)
    const [selectedPk, setSelectedPk] = useState<PkTerpilihProps | null>(null)

    const [rekinAtasanList, setRekinAtasanList] = useState<
        RekinOption[]
    >([])


    const [showPilihAtasanModal, setShowPilihAtasanModal] = useState(false)
    const [selectedAtasan, setSelectedAtasan] = useState<{
        nipBawahan: string
    } | null>(null)
    const [atasanList, setAtasanList] = useState<
        AtasanOption[]
    >([])

    const { branding } = useBrandingContext();
    const apiPerencanaan = branding.api_perencanaan;

    useEffect(() => {
        if (!kodeOpd || !tahun || !token) return
        const controller = new AbortController()

        const fetchData = async () => {
            setLoading(true)
            const res = await fetch(
                `${apiPerencanaan}/pk_opd/${kodeOpd}/${tahun}`,
                {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal,
                })
            const json = await res.json()
            setData(json.data)
            setLoading(false)
        }

        fetchData()
        return () => controller.abort()
    }, [token, kodeOpd, tahun, apiPerencanaan])

    // STATE MODAL CETAK PREVIEW
    const [showPreview, setShowPreview] = useState(false)
    const [previewData, setPreviewData] =
        useState<PkPegawaiContext | null>(null)

    const handlePreviewPk = (nipBawahan: string) => {
        if (!data) return

        const cetakData = findPkPegawaiWithContext(data, nipBawahan)

        if (!cetakData) {
            AlertNotification(
                "Gagal",
                "Data PK belum lengkap / belum ada atasan",
                "error",
                1500
            )
            return
        }

        setPreviewData(cetakData)
        setShowPreview(true)
    }

    const getCandidates = (pk: PkAsn, levelPk: number): RekinOption[] => {
        return buildCandidates(data, pk, levelPk)
    }


    const handlePilihAtasan = async (nipAtasan: string) => {
        if (!selectedAtasan) return
        setSubmitting(true)

        try {
            const res = await fetch(`${apiPerencanaan}/pk_opd/hubungkan_atasan`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nip_atasan: nipAtasan,
                    nip_bawahan: selectedAtasan.nipBawahan,
                    kode_opd: kodeOpd,
                    tahun: tahun,
                }),
            })

            const json = await res.json()

            if (res.ok) {
                setData(json.data)
                AlertNotification("Berhasil", "Data Atasan Diupdate", "success", 1000)
                setShowPilihAtasanModal(false)
                setSelectedAtasan(null)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    const handleHubungkanPk = async (idRekinAtasan: string, selectedPk: PkTerpilihProps) => {
        setSubmitting(true)

        try {
            const res = await fetch(`${apiPerencanaan}/pk_opd/hubungkan`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_rekin_pemilik_pk: selectedPk.idRekinPemilik,
                    id_rekin_atasan: idRekinAtasan,
                    id_pohon: selectedPk.idPohon,
                    kode_opd: selectedPk.kodeOpd,
                    tahun: tahun,
                    level_pk: selectedPk.levelPk,
                }),
            })

            const json = await res.json()

            if (res.ok) {
                setData(json.data)
                AlertNotification("Berhasil", "Data PK Diupdate", "success", 1000)
                setShowModal(false)
                setRekinAtasanList([])
            } else {
                console.log(json)
                AlertNotification("PK Gagal disimpan", json.message, "error", 5000, true)
            }
        } catch (err) {
            console.error(err)
            AlertNotification("Gagal", String(err), "error", 2000)
        } finally {
            setSubmitting(false)
        }
    }

    const handleSelectAtasan = ({ nipBawahan }: HandleSelectAtasanProps) => {
        if (!data) {
            return
        }
        const candidates = extractUniqueAtasanFromData(
            data,
            nipBawahan
        )
        setAtasanList(candidates)

        setSelectedAtasan({ nipBawahan: nipBawahan })

        setShowPilihAtasanModal(true)
    }

    const handleSelectPk = ({ pk, levelPk }: HandleSelectPkProps) => {
        const candidates = buildCandidates(data, pk, levelPk)
        setRekinAtasanList(candidates)

        setSelectedPk({
            idRekinPemilik: pk.id_rekin_pemilik_pk,
            idPohon: pk.id_pohon,
            kodeOpd: pk.kode_opd,
            levelPk: levelPk
        })

        setShowModal(true)
    }

    const handleKunciPk = (pk: PkAsn) => {
        const formKunciPk: KunciPkRequest = {
            kode_opd: pk.kode_opd,
            tahun: pk.tahun,
            id_pegawai: pk.nip_pemilik_pk
        };
        const pemilikPk = pk.nama_pemilik_pk

        AlertQuestion("WARNING", `PK milik ${pemilikPk} akan dikunci, lanjutkan ?`,
            "warning", "Kunci", "Batal"
        ).then(async (res) => {
            if (!res.isConfirmed) {
                return;
            }

            try {
                await kunciPk({
                    request: formKunciPk,
                    apiUrl: apiPerencanaan,
                    token: token
                })

                AlertNotification("SUCCESS", `PK milik ${pemilikPk} berhasil dikunci`,
                    "success", 2500, false
                )
            } catch (err) {
                AlertNotification("ERROR",
                    err instanceof Error
                        ? err.message
                        : "Gagal mengunci PK",
                    "error", 2500, false
                )
            }
        })
    }


    if (tahun == null) {
        return <TahunNull />
    }

    if (kodeOpd == null) {
        return <OpdNull />
    }

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!data) {
        return <div className="p-6">Data tidak ditemukan</div>;
    }

    return (
        <div className="flex flex-col gap-3">
            {/* HEADER */}
            <div className="header flex items-center">
                <a href="/" className="px-1">
                    <FiHome />
                </a>
                <span>/</span>
                <p className="px-1">Laporan</p>
                <span>/</span>
                <p className="px-1 font-bold">Perjanjian Kinerja ASN</p>
            </div>

            {/* CONTENT */}
            <div className="rounded-xl shadow-lg border-2 bg-white">
                <div className="flex flex-col gap-4 border-b px-5 py-5">
                    <h1 className="font-bold text-lg uppercase">
                        Perjanjian Kinerja ASN {data.tahun}
                    </h1>

                    {/* SEARCH */}
                    <input
                        className="border px-4 py-2 rounded-lg w-full"
                        placeholder="Cari nama ASN"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <TablePk
                            data={data}
                            search={search}
                            roleUser={roleUser}
                            onPreviewPk={handlePreviewPk}
                            getCandidates={getCandidates}
                            onSelectAtasan={handleSelectAtasan}
                            onSelectPk={handleSelectPk}
                            onKunciPk={handleKunciPk}
                        />
                    </div>
                </div>
            </div>
            {showPilihAtasanModal && selectedAtasan && (
                <ModalPilihAtasan
                    open={showPilihAtasanModal}
                    onClose={() => setShowPilihAtasanModal(false)}
                    atasanList={atasanList}
                    onSubmit={handlePilihAtasan}
                />
            )}
            {showModal && selectedPk && (
                <HubungkanModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    rekinAtasanList={rekinAtasanList}
                    onSubmit={handleHubungkanPk}
                    selectedPk={selectedPk}
                />
            )}
            {showPreview && previewData && (
                <PreviewPk
                    logo={branding.logo}
                    previewData={previewData}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
};

export default PerjanjianKinerja;


// MODAL
export type RekinOption = {
    id: string
    rekin: string
    namaPegawai: string
    nipPegawai: string
}

function extractUniqueAtasanFromData(
    data: PkOpdResponse,
    nipBawahan: string
): AtasanOption[] {

    const pegawai: PkPegawai | undefined =
        data.pk_item
            .flatMap((l: PkOpdByLevel): PkPegawai[] => l.pegawais)
            .find((p: PkPegawai): boolean => p.nip === nipBawahan)

    if (!pegawai) return []

    return Array.from(
        new Map(
            pegawai.atasan_candidates
                .map((atasan: AtasanCandidate) => [
                    atasan.id_pegawai, // UNIQUE KEY
                    {
                        nip: atasan.id_pegawai,
                        nama: atasan.nama_pegawai
                    },
                ])
        ).values()
    )
}

type PkPegawaiContext = {
    kode_opd: string
    nama_opd: string
    tahun: number
    pegawai: PkPegawai
    level: number
}

function findPkPegawaiWithContext(
    data: PkOpdResponse,
    nipBawahan: string
): PkPegawaiContext | null {

    for (const level of data.pk_item) {
        const pegawai = level.pegawais.find(p => p.nip === nipBawahan)
        if (pegawai) {
            return {
                kode_opd: data.kode_opd,
                nama_opd: data.nama_opd,
                tahun: data.tahun,
                level: level.level_pk,
                pegawai,
            }
        }
    }

    return null
}

const buildCandidates = (
    data: PkOpdResponse | null,
    pk: PkAsn,
    levelPk: number
): RekinOption[] | [] => {
    const sasaranPemdas = data?.sasaran_pemdas || []

    // LEVEL 4 -> sasaran pemda
    if (levelPk === 4) {
        return sasaranPemdas.map((sp: SasaranPemda) => ({
            id: String(sp.id_sasaran_pemda),
            rekin: sp.sasaran_pemda,
            nipPegawai: sp.nip_kepala_pemda,
            namaPegawai: sp.nama_kepala_pemda,
        }))
    }

    const targetAtasanLevel = levelPk - 1

    const result: RekinOption[] =
        data?.pk_item
            ?.filter((l: PkOpdByLevel) => l.level_pk === targetAtasanLevel)
            ?.flatMap((l: PkOpdByLevel) =>
                l.pegawais.flatMap((p: PkPegawai) =>
                    p.pks
                        .filter((pkAtasan: PkAsn) =>
                            pkAtasan.id_rekin_pemilik_pk !== pk.id_rekin_pemilik_pk &&
                            pkAtasan.id_pohon === pk.id_parent_pohon &&
                            pkAtasan.id_rekin_pemilik_pk !== pk.id_rekin_atasan
                        )
                        .map((pkAtasan: PkAsn): RekinOption => ({
                            id: pkAtasan.id_rekin_pemilik_pk,
                            rekin: pkAtasan.rekin_pemilik_pk,
                            namaPegawai: p.nama_pegawai,
                            nipPegawai: p.nip,
                        }))
                )
            ) ?? []

    return result;
}
