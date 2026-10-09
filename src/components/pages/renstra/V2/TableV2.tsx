'use client'

import { getToken } from "@/components/lib/Cookie";
import React, { useEffect, useState } from "react";
import { ButtonSkyBorder, ButtonRedBorder, ButtonGreenBorder } from "@/components/global/Button";
import { TbCirclePlus, TbFileTypeDoc, TbFileTypePdf, TbPencil, TbTrash } from "react-icons/tb";
import { LoadingClip } from "@/components/global/Loading";
import { ModalPaguAnggaran, PaguAnggaranResponse } from "../ModalPaguAnggaran";
import { useCetakMatrixRenstra } from "@/app/(main)/Renstra/matrix-renstra/cetak/useCetakMatrixRenstra";
import { useBrandingContext } from "@/context/BrandingContext";
import { formatRupiah } from "@/components/utils/format-rupiah";
import { ModalTargetSatuanRenstra } from "./ModalTargetSatuanRenstra";
import { ModalCreateIndikatorRenstraV2, ModalEditIndikatorV2, IndikatorResponse } from "./ModalCreateIndikatorRenstraV2";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { ModalOutcomeMatrix } from "./ModalOutcomeMatrix";

interface renstra {
    nama: string;
    kode: string;
    jenis: string;
    outcome: OutcomeData[];
    indikator: Indikator[];
    anggaran: Anggaran[];
    bidang_urusan?: renstra[];
    program?: renstra[]
    kegiatan?: renstra[]
    subkegiatan?: renstra[]
}
interface OutcomeData {
    id: number;
    nama: string;
    kode: string;
    outcome: string;
}
interface matrix {
    kode_opd: string
    tahun_awal: string;
    tahun_akhir: string;
    pagu_total: pagu[];
    urusan: renstra[];
}
interface Anggaran {
    tahun: string;
    pagu_indikatif: number;
}
export interface Indikator {
    kode_indikator: string;
    kode: string;
    kode_opd: string;
    indikator: string;
    tahun: string;
    target: Target[];
}
export interface Target {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}
interface CombinedData {
    pagu_indikatif: number;
    kode: string;
    kode_opd: string;
    kode_indikator: string;
    indikator: string;
    tahun: string;
    target: TargetData[];
}
interface TargetData {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string;
    satuan: string;
}
// response 200 dari matrix_renstra/target/upsert
export interface TargetUpsertResponse {
    id: string;
    indikator_id: string;
    tahun: string;
    target: string | number;
    satuan: string;
    jenis?: string;
}

interface pagu {
    tahun: string;
    pagu_indikatif: number;
}
interface table {
    jenis: "laporan" | "opd";
    tahun_awal: string;
    tahun_akhir: string;
    tahun_list: string[];
    kode_opd: string;
    nama_opd: string;
}
interface Thead {
    jenis: "Urusan" | "Bidang Urusan" | "Program" | "Kegiatan" | "Sub Kegiatan";
    tahun_list: string[];
    type: "laporan" | "opd";
}
interface Tr {
    indikator: Indikator[];
    anggaran: Anggaran[];
    tahun_list: string[];
    nama: string;
    kode: string;
    kode_opd: string;
    jenis: "Urusan" | "Bidang Urusan" | "Program" | "Kegiatan" | "Sub Kegiatan";
    type: "laporan" | "opd";
    fetchTrigger: () => void;
}
interface TablePagu {
    tahun_list: string[];
    pagu_total: pagu[];
}

export const TableMatrix: React.FC<table> = ({ jenis, tahun_awal, tahun_akhir, tahun_list, kode_opd, nama_opd }) => {

    const [Matrix, setMatrix] = useState<matrix[]>([]);

    const [Loading, setLoading] = useState<boolean>(false);
    const [DataNull, setDataNull] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    // Data dummy outcome per kode nomenklatur, akan ditimpa oleh hasil simpan modal outcome
    const [OutcomeMap, setOutcomeMap] = useState<Record<string, string>>({});
    // Target/satuan terbaru hasil response simpan target, dikey indikator_id + tahun
    const [TargetMap, setTargetMap] = useState<Record<string, TargetData>>({});
    // Pagu terbaru hasil response simpan anggaran, dikey kode subkegiatan + tahun
    const [PaguMap, setPaguMap] = useState<Record<string, number>>({});
    const { branding } = useBrandingContext();
    const token = getToken();

    const simpanOutcome = (kode: string, outcome: string) => {
        setOutcomeMap((prev) => ({ ...prev, [kode]: outcome }));
    }

    const simpanTarget = (kode_indikator: string, tahun: string, data: TargetData) => {
        setTargetMap((prev) => ({ ...prev, [`${kode_indikator}_${tahun}`]: data }));
    }

    const simpanPagu = (kode: string, tahun: string, pagu_indikatif: number) => {
        setPaguMap((prev) => ({ ...prev, [`${kode}_${tahun}`]: pagu_indikatif }));
    }

    useEffect(() => {
        const fetchMatrix = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${branding?.api_perencanaan}/matrix_renstra/v2/opd/${kode_opd}?tahun_awal=${tahun_awal}&tahun_akhir=${tahun_akhir}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data;
                // console.log(data);
                if (result.code === 400) {
                    setDataNull(true);
                    setMatrix([]);
                    console.log(data);
                } else if (result.code === 200) {
                    setDataNull(false);
                    setMatrix(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchMatrix();
    }, [branding, kode_opd, tahun_awal, tahun_akhir, token, FetchTrigger]);

    const { cetakPdfMatrixRenstra, cetakWordMatrixRenstra } = useCetakMatrixRenstra(Matrix[0], nama_opd, kode_opd, tahun_awal, tahun_akhir, tahun_list);

    if (DataNull) {
        return (
            <h1 className="p-5 text-sky-500 font-semibold">Sub Kegiatan OPD belum di pilih pada periode tahun {tahun_awal} sampai {tahun_akhir}</h1>
        )
    }
    if (Loading) {
        return (
            <>
                <LoadingClip />
            </>
        )
    }
    return (
        <>
            {Matrix.map((item: matrix, index: number) => (
                <React.Fragment key={index}>
                    <div className="m-2 flex gap-2 flex-col sm:flex-row">
                        <ButtonRedBorder
                            className="w-full flex items-center gap-1"
                            onClick={cetakPdfMatrixRenstra}
                        >
                            <TbFileTypePdf />
                            Cetak Penuh Matrix Renstra (PDF)
                        </ButtonRedBorder>
                        <ButtonSkyBorder
                            className="w-full flex items-center gap-1"
                            onClick={cetakWordMatrixRenstra}
                        >
                            <TbFileTypeDoc />
                            Cetak Penuh Matrix Renstra (Word)
                        </ButtonSkyBorder>
                    </div>
                    <div className="overflow-auto m-2 rounded-xl border">
                        <TableTotalPagu
                            tahun_list={tahun_list}
                            pagu_total={item.pagu_total}
                        />
                    </div>
                    <div className="overflow-auto m-2 rounded-t-xl border">
                        {item.urusan.length === 0 ?
                            <h1 className="p-5">Sub Kegiatan di periode {tahun_awal} - {tahun_akhir} belum di gunakan di rencana kinerja</h1>
                            :
                            <table className="w-full">
                                {item.urusan.map((u: renstra, u_index: number) => (
                                    <React.Fragment key={u_index}>
                                        <TheadMatrix
                                            tahun_list={tahun_list}
                                            jenis="Urusan"
                                            type={jenis}
                                        />
                                        <tbody>
                                            <TrMatrix
                                                jenis="Urusan"
                                                type={jenis}
                                                tahun={branding?.tahun?.value || 0}
                                                indikator={u.indikator}
                                                anggaran={u.anggaran}
                                                tahun_list={tahun_list}
                                                kode={u.kode}
                                                nama={u.nama}
                                                kode_opd={item.kode_opd}
                                                outcome={u.outcome}
                                                targetMap={TargetMap}
                                                onUpdateTarget={simpanTarget}
                                                paguMap={PaguMap}
                                                onUpdatePagu={simpanPagu}
                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                            />
                                        </tbody>
                                        {u.bidang_urusan &&
                                            <React.Fragment>
                                                {u.bidang_urusan.map((br: renstra, br_index: number) => (
                                                    <React.Fragment key={br_index}>
                                                        <TheadMatrix
                                                            tahun_list={tahun_list}
                                                            jenis="Bidang Urusan"
                                                            type={jenis}
                                                        />
                                                        <tbody>
                                                            <TrMatrix
                                                                jenis="Bidang Urusan"
                                                                type={jenis}
                                                                indikator={br.indikator}
                                                                anggaran={br.anggaran}
                                                                tahun_list={tahun_list}
                                                                tahun={branding?.tahun?.value || 0}
                                                                kode={br.kode}
                                                                nama={br.nama}
                                                                kode_opd={kode_opd}
                                                                outcome={br.outcome}
                                                                targetMap={TargetMap}
                                                                onUpdateTarget={simpanTarget}
                                                                paguMap={PaguMap}
                                                                onUpdatePagu={simpanPagu}
                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                            />
                                                        </tbody>
                                                        {br.program &&
                                                            <React.Fragment>
                                                                {br.program.map((p: renstra, p_index: number) => (
                                                                    <React.Fragment key={p_index}>
                                                                        <TheadMatrix
                                                                            tahun_list={tahun_list}
                                                                            jenis="Program"
                                                                            type={jenis}
                                                                        />
                                                                        <tbody>
                                                                            <TrMatrix
                                                                                jenis="Program"
                                                                                type={jenis}
                                                                                indikator={p.indikator}
                                                                                anggaran={p.anggaran}
                                                                                tahun_list={tahun_list}
                                                                                tahun={branding?.tahun?.value || 0}
                                                                                kode={p.kode}
                                                                                nama={p.nama}
                                                                                kode_opd={kode_opd}
                                                                                outcome={p.outcome}
                                                                                targetMap={TargetMap}
                                                                                onUpdateTarget={simpanTarget}
                                                                                paguMap={PaguMap}
                                                                                onUpdatePagu={simpanPagu}
                                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                            />
                                                                        </tbody>
                                                                        {p.kegiatan &&
                                                                            <React.Fragment>
                                                                                {p.kegiatan.map((k: renstra, k_index: number) => (
                                                                                    <React.Fragment key={k_index}>
                                                                                        <TheadMatrix
                                                                                            tahun_list={tahun_list}
                                                                                            jenis="Kegiatan"
                                                                                            type={jenis}
                                                                                        />
                                                                                        <tbody>
                                                                                            <TrMatrix
                                                                                                jenis="Kegiatan"
                                                                                                type={jenis}
                                                                                                indikator={k.indikator}
                                                                                                anggaran={k.anggaran}
                                                                                                tahun_list={tahun_list}
                                                                                                tahun={branding?.tahun?.value || 0}
                                                                                                kode={k.kode}
                                                                                                nama={k.nama}
                                                                                                kode_opd={kode_opd}
                                                                                                outcome={k.outcome}
                                                                                                targetMap={TargetMap}
                                                                                                onUpdateTarget={simpanTarget}
                                                                                                paguMap={PaguMap}
                                                                                                onUpdatePagu={simpanPagu}
                                                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                                            />
                                                                                        </tbody>
                                                                                        {k.subkegiatan &&
                                                                                            <React.Fragment>
                                                                                                <TheadMatrix
                                                                                                    tahun_list={tahun_list}
                                                                                                    jenis="Sub Kegiatan"
                                                                                                    type={jenis}
                                                                                                />
                                                                                                {k.subkegiatan.map((sk: renstra, sk_index: number) => (
                                                                                                    <React.Fragment key={sk_index}>
                                                                                                        <tbody>
                                                                                                            <TrMatrix
                                                                                                                jenis="Sub Kegiatan"
                                                                                                                type={jenis}
                                                                                                                indikator={sk.indikator}
                                                                                                                anggaran={sk.anggaran}
                                                                                                                tahun_list={tahun_list}
                                                                                                                tahun={branding?.tahun?.value || 0}
                                                                                                                kode={sk.kode}
                                                                                                                nama={sk.nama}
                                                                                                                kode_opd={kode_opd}
                                                                                                                outcome={sk.outcome}
                                                                                                                targetMap={TargetMap}
                                                                                                                onUpdateTarget={simpanTarget}
                                                                                                                paguMap={PaguMap}
                                                                                                                onUpdatePagu={simpanPagu}
                                                                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                                                            />
                                                                                                        </tbody>
                                                                                                    </React.Fragment>
                                                                                                ))}
                                                                                            </React.Fragment>
                                                                                        }
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        }
                                                                    </React.Fragment>
                                                                ))}
                                                            </React.Fragment>
                                                        }
                                                    </React.Fragment>
                                                ))}
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                ))}
                            </table>
                        }
                    </div>
                </React.Fragment>
            ))}
        </>
    )
}
export const TheadMatrix: React.FC<Thead> = ({ jenis, tahun_list }) => {
    return (
        <thead>
            <tr className={`font-semibold
                ${jenis === "Urusan" && "bg-white text-black"}
                ${jenis === "Bidang Urusan" && "bg-red-500 text-white"}
                ${jenis === "Program" && "bg-blue-500 text-white"}
                ${jenis === "Kegiatan" && "bg-green-700 text-white"}
                ${jenis === "Sub Kegiatan" && "bg-emerald-500 text-white"}
            `}>
                <td rowSpan={2} className="font-semibold border-r border-b border-slate-400 px-6 py-4 w-[200px]">Kode</td>
                <td rowSpan={2} className="font-semibold border-r border-b border-slate-400 px-6 py-4 min-w-[200px]">{jenis}</td>
                <td rowSpan={2} className="font-semibold border-r border-b border-slate-400 px-6 py-4 min-w-[200px]">Outcome</td>
                <td rowSpan={2} className="font-semibold border-r border-b border-slate-400 px-6 py-4 min-w-[300px]">Indikator</td>
                <td rowSpan={2} className="font-semibold border-r border-b border-slate-400 px-6 py-4 min-w-[150px] text-center">Aksi</td>
                {tahun_list.map((item: any) => (
                    <td key={item} colSpan={2} className="font-bold border-r border-b border-slate-400 px-6 py-3 min-w-[100px] text-center">{item}</td>
                ))}
            </tr>
            <tr className={`
                ${jenis === "Urusan" && "bg-white text-black"}
                ${jenis === "Bidang Urusan" && "bg-red-500 text-white"}
                ${jenis === "Program" && "bg-blue-500 text-white"}
                ${jenis === "Kegiatan" && "bg-green-700 text-white"}
                ${jenis === "Sub Kegiatan" && "bg-emerald-500 text-white"}
            `}>
                {(jenis === 'Urusan' || jenis === 'Bidang Urusan') ?
                    tahun_list.map((item: string) => (
                        <React.Fragment key={item}>
                            <td colSpan={2} className="border-l border-b border-slate-400 px-6 py-3 min-w-[200px] text-center">Pagu</td>
                        </React.Fragment>
                    ))
                    :
                    tahun_list.map((item: string) => (
                        <React.Fragment key={item}>
                            <td className="border-l border-b border-slate-400 px-6 py-3 min-w-[200px] text-center">target/satuan</td>
                            {/* {type === "opd" &&
                                <td className="border-l border-b border-slate-400 px-6 py-3 min-w-[50px] text-center">Aksi</td>
                            } */}
                            <td className="border-l border-b border-slate-400 px-6 py-3 min-w-[200px] text-center">Pagu</td>
                        </React.Fragment>
                    ))
                }
            </tr>
        </thead>
    )
}
interface Tr {
    indikator: Indikator[];
    anggaran: Anggaran[];
    tahun_list: string[];
    tahun: number;
    nama: string;
    kode: string;
    kode_opd: string;
    jenis: "Urusan" | "Bidang Urusan" | "Program" | "Kegiatan" | "Sub Kegiatan";
    type: "laporan" | "opd";
    outcome: OutcomeData[];
    targetMap: Record<string, TargetData>;
    onUpdateTarget: (kode_indikator: string, tahun: string, data: TargetData) => void;
    paguMap: Record<string, number>;
    onUpdatePagu: (kode: string, tahun: string, pagu_indikatif: number) => void;
    fetchTrigger: () => void;
}
export const TrMatrix: React.FC<Tr> = ({ jenis, tahun, nama, kode_opd, kode, indikator, anggaran, tahun_list, outcome, targetMap, onUpdateTarget, paguMap, onUpdatePagu, fetchTrigger }) => {

    // Modal Indikator
    const [ModalTambahIndikator, setModalTambahIndikator] = useState<boolean>(false);
    const [ModalEditIndikator, setModalEditIndikator] = useState<boolean>(false);
    // Indikator hasil simpan lokal, dipakai bila belum ada di response server
    const [IndikatorTambahan, setIndikatorTambahan] = useState<Indikator[]>([]);
    // indikator yang dihapus lokal, agar tidak muncul lagi walau data server masih ada
    const [IndikatorTerhapus, setIndikatorTerhapus] = useState<string[]>([]);

    // Modal Target
    const [ModalTarget, setModalTarget] = useState<boolean>(false);
    const [IndikatorModal, setIndikatorModal] = useState<Indikator | null>(null);
    const [TargetModal, setTargetModal] = useState<Target | null>(null);

    // Modal Outcome
    const [ModalOutcome, setModalOutcome] = useState<boolean>(false);
    const [JenisModalOutcome, setJenisModalOutcome] = useState<"tambah" | "edit">("tambah");
    // Outcome lokal (update tanpa reload)
    const [outcomeLokal, setOutcomeLokal] = useState<OutcomeData[]>(outcome ?? []);

    const [Pagu, setPagu] = useState<number | null>(null);
    const [ModalPagu, setModalPagu] = useState<boolean>(false);

    const [TahunN, setTahunN] = useState<string>('');
    const token = getToken();
    const { branding } = useBrandingContext();

    useEffect(() => {
        setOutcomeLokal(outcome ?? []);
    }, [outcome]);

    // Gabungkan indikator (untuk semua tahun) dengan anggaran (pagu per tahun)
    // target & satuan diambil per tahun sesuai tahun_list, jika tidak ada jadikan "-"
    // daftar indikator = data server + hasil simpan lokal (tanpa reload), dikurangi yang dihapus
    const daftarIndikator: Indikator[] = [
        ...indikator.filter((i: Indikator) => !IndikatorTerhapus.includes(i.kode_indikator)),
        ...IndikatorTambahan.filter((t: Indikator) => !indikator.some((i: Indikator) => i.kode_indikator === t.kode_indikator)),
    ];

    const combinedData: CombinedData[] = daftarIndikator.map((i: Indikator) => {
        const anggaranTahun = anggaran.find((a: Anggaran) => a.tahun === i.tahun);
        return {
            pagu_indikatif: anggaranTahun?.pagu_indikatif ?? 0,
            kode: i.kode,
            kode_opd: i.kode_opd,
            kode_indikator: i.kode_indikator ?? "",
            indikator: i.indikator ?? "",
            tahun: i.tahun,
            target: tahun_list.map((tahun: string) => {
                // hasil simpan target terbaru (response 200) dipakai langsung, tanpa reload
                const terbaru = targetMap[`${i.kode_indikator ?? ""}_${tahun}`];
                if (terbaru) {
                    return {
                        id: terbaru.id ?? "",
                        indikator_id: terbaru.indikator_id ?? "",
                        tahun: tahun,
                        target: terbaru.target || "-",
                        satuan: terbaru.satuan || "-",
                    };
                }
                const trg = i.target?.find((t: Target) => t.tahun === tahun);
                const hasTarget = trg && trg.target && trg.target !== "-";
                return {
                    id: hasTarget ? trg.id : "",
                    indikator_id: hasTarget ? trg.indikator_id : "",
                    tahun: tahun,
                    target: hasTarget ? trg.target : "-",
                    satuan: hasTarget ? (trg.satuan || "-") : "-",
                };
            }),
        };
    });

    const handleModalPagu = (pagu: number, tahun: string) => {
        if (ModalPagu) {
            setModalPagu(false);
            setPagu(pagu);
            setTahunN(tahun);
        } else {
            setModalPagu(true);
            setPagu(pagu);
            setTahunN(tahun);
        }
    }
    const handleModalTarget = (indikator: Indikator | null, target: Target | null) => {
        if (ModalTarget) {
            setModalTarget(false);
            setIndikatorModal(indikator);
            setTargetModal(target);
        } else {
            setModalTarget(true);
            setIndikatorModal(indikator);
            setTargetModal(target);
        }
    }
    const handleModalEditIndikator = (indikator: Indikator | null) => {
        if (ModalEditIndikator) {
            setModalEditIndikator(false);
            setIndikatorModal(indikator);
        } else {
            setModalEditIndikator(true);
            setIndikatorModal(indikator);
        }
    }
    const handleModalOutcome = (metode: "tambah" | "edit") => {
        if (ModalOutcome) {
            setModalOutcome(false);
            setJenisModalOutcome(metode);
        } else {
            setModalOutcome(true);
            setJenisModalOutcome(metode);
        }
    }

    // indikator hasil response create, langsung dipakai update tampilan (rowSpan ikut menyesuaikan)
    const tambahIndikatorLokal = (data: IndikatorResponse[]) => {
        const baru: Indikator[] = (data ?? []).map((item: IndikatorResponse) => ({
            kode_indikator: item.kode_indikator,
            kode: item.kode,
            kode_opd: item.kode_opd,
            indikator: item.indikator,
            tahun: item.tahun ?? "",
            target: (item.target ?? []).map((t) => ({
                id: t.id,
                indikator_id: t.indikator_id,
                tahun: t.tahun,
                target: String(t.target ?? "-"),
                satuan: t.satuan ?? "-",
            })),
        }));
        if (baru.length === 0) {
            return;
        }
        setIndikatorTambahan((prev) => [...prev, ...baru]);
        setIndikatorTerhapus((prev) => prev.filter((k: string) => !baru.some((b: Indikator) => b.kode_indikator === k)));
    }

    const hapusOutcome = async (id: number) => {
        try {
            const response = await fetch(`${branding?.api_perencanaan}/outcome_matrix/delete/${id}`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                method: "DELETE"
            });
            const result = await response.json();
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", "Outcome Berhasil Di Hapus", "success", 2000);
                setOutcomeLokal([]); // update UI langsung
            } else {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
            }
        } catch (err) {
            console.log(err);
            AlertNotification("Gagal", `${err}`, "error", 2000);
        }
    }
    const hapusIndikator = async (kode: string) => {
        try {
            const response = await fetch(`${branding?.api_perencanaan}/matrix_renstra/indikator/delete/${kode}`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                method: "DELETE"
            });
            const result = await response.json();
            if (result.code === 200 || result.code === 201) {
                AlertNotification("Berhasil", "Indikator Berhasil Di Hapus", "success", 2000);
                // hilangkan langsung dari tampilan, tanpa reload
                setIndikatorTerhapus((prev) => [...prev, kode]);
                setIndikatorTambahan((prev) => prev.filter((i: Indikator) => i.kode_indikator !== kode));
            } else {
                AlertNotification("Gagal", `${result.data}`, "success", 2000);
            }
        } catch (err) {
            console.log(err);
            AlertNotification("Gagal", `${err}`, "success", 2000);
        }
    }

    const getPaguByTahun = (tahun: string): number =>
        // hasil simpan pagu terbaru (response 200) dipakai langsung, tanpa reload
        paguMap[`${kode}_${tahun}`] ?? anggaran.find((a: Anggaran) => a.tahun === tahun)?.pagu_indikatif ?? 0;

    // Sel Pagu satu kotak penuh menutupi semua baris indikator (rowSpan)
    const renderPagu = (tahun: string, rowSpan?: number) => (
        <td rowSpan={rowSpan} className="border-r border-b border-slate-400 px-6 py-4 w-full">
            <div className="flex flex-col items-center gap-2">
                Rp.{formatRupiah(getPaguByTahun(tahun))}
                {jenis === "Sub Kegiatan" &&
                    <button
                        type="button"
                        onClick={() => handleModalPagu(getPaguByTahun(tahun), tahun)}
                        className="text-sky-400 border border-sky-300 hover:text-sky-600 p-1 rounded-full hover:bg-sky-100 transition-colors"
                        title="Edit Pagu Anggaran"
                    >
                        <TbPencil size={14} />
                    </button>
                }
            </div>
        </td>
    );

    return (
        <>
            {(jenis === 'Urusan' || jenis === 'Bidang Urusan') ?
                <tr>
                    <td className={`border-r border-b border-slate-400 px-6 py-4 font-semibold`}>{kode || ""}</td>
                    <td className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>{nama || ""}</td>
                    <td className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>
                        <div className="flex items-center justify-between gap-1">
                            {outcomeLokal?.length > 0 &&
                                <span>{outcomeLokal[0]?.outcome || "-"}</span>
                            }
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    type="button"
                                    className="p-1 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white cursor-pointer shrink-0"
                                    title="Edit Outcome"
                                    onClick={() => {
                                        if (outcomeLokal[0]?.id) {
                                            handleModalOutcome("edit")
                                        } else {
                                            handleModalOutcome("tambah")
                                        }
                                    }}
                                >
                                    <TbPencil size={14} />
                                </button>
                                {outcomeLokal.length > 0 &&
                                    <button
                                        type="button"
                                        className="p-1 border border-red-500 text-red-700 rounded-full hover:bg-red-500 hover:text-white cursor-pointer shrink-0"
                                        title="Hapus Outcome"
                                        onClick={() => AlertQuestion("Hapus?", `${outcomeLokal[0].outcome || ""}`, "question", "Hapus", "Batal").then((resp) => {
                                            if (resp.isConfirmed) {
                                                hapusOutcome(outcomeLokal[0].id)
                                            }
                                        })}
                                    >
                                        <TbTrash size={14} />
                                    </button>
                                }
                            </div>
                        </div>
                    </td>
                    <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-center`}></td>
                    <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-center`}></td>
                    {anggaran.map((d: Anggaran, index: number) => (
                        <React.Fragment key={index}>
                            <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-center`}></td>
                            <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-center`}>Rp.{formatRupiah(d.pagu_indikatif || 0)}</td>
                        </React.Fragment>
                    ))}
                </tr>
                :
                <>
                    <tr>
                        <td rowSpan={combinedData.length > 0 ? combinedData.length + 1 : 2} className={`border-r border-b border-slate-400 px-6 py-4 font-semibold`}>{kode || ""}</td>
                        <td rowSpan={combinedData.length > 0 ? combinedData.length + 1 : 2} className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>{nama || ""}</td>
                        <td rowSpan={combinedData.length > 0 ? combinedData.length + 1 : 2} className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>
                            <div className="flex items-center justify-between gap-1">
                                {outcomeLokal.length > 0 &&
                                    <span>{outcomeLokal[0].outcome || "-"}</span>
                                }
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        type="button"
                                        className="p-1 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white cursor-pointer shrink-0"
                                        title="Edit Outcome"
                                        onClick={() => {
                                            if (outcomeLokal[0]?.id) {
                                                handleModalOutcome("edit")
                                            } else {
                                                handleModalOutcome("tambah")
                                            }
                                        }}
                                    >
                                        <TbPencil size={14} />
                                    </button>
                                    {outcomeLokal.length > 0 &&
                                        <button
                                            type="button"
                                            className="p-1 border border-red-500 text-red-700 rounded-full hover:bg-red-500 hover:text-white cursor-pointer shrink-0"
                                            title="Hapus Outcome"
                                            onClick={() => AlertQuestion("Hapus?", `${outcomeLokal[0].outcome || ""}`, "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusOutcome(outcomeLokal[0].id)
                                                }
                                            })}
                                        >
                                            <TbTrash size={14} />
                                        </button>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                    {combinedData.length === 0 ?
                        <tr>
                            <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-red-300 italic`}>indikator kosong</td>
                            <td className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>
                                <div className="flex flex-col items-center gap-1">
                                    <ButtonGreenBorder
                                        type="button"
                                        className="flex items-center gap-1"
                                        onClick={() => setModalTambahIndikator(true)}
                                    >
                                        <TbCirclePlus />
                                        Indikator
                                    </ButtonGreenBorder>
                                </div>
                            </td>
                            {tahun_list.map((tahun: string) => (
                                <React.Fragment key={tahun}>
                                    <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-center`}>-</td>
                                    {renderPagu(tahun, 1)}
                                </React.Fragment>
                            ))}
                        </tr>
                        :
                        combinedData.map((d: CombinedData, index: number) => (
                            <tr key={index}>
                                <td className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>
                                    <div className="flex items-center justify-between gap-2">
                                        <span>{d.indikator || ""}</span>
                                        {/* <div className="flex flex-col items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleModalEditIndikator(d)}
                                                className="text-sky-500 border border-sky-300 hover:text-sky-700 p-1 rounded-full hover:bg-sky-100 transition-colors shrink-0"
                                                title="Edit Indikator"
                                            >
                                                <TbPencil size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => AlertQuestion("Hapus", "Hapus indikator beserta semua target (tidak termasuk pagu) ?", "question", "Hapus", "Batal").then((resp) => {
                                                    if (resp.isConfirmed) {
                                                        hapusIndikator(d.kode_indikator);
                                                    }
                                                })}
                                                className="text-red-500 border border-red-300 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors shrink-0"
                                                title="Hapus Indikator"
                                            >
                                                <TbTrash size={14} />
                                            </button>
                                        </div> */}
                                    </div>
                                </td>
                                {/* Aksi dilebur menjadi satu kotak menutupi semua baris indikator */}
                                {index === 0 &&
                                    <td rowSpan={combinedData.length} className={`border-r border-b border-slate-400 px-6 py-4 w-full`}>
                                        <div className="flex flex-col items-center gap-1">
                                            <ButtonGreenBorder
                                                type="button"
                                                className="flex items-center gap-1"
                                                onClick={() => setModalTambahIndikator(true)}
                                            >
                                                <TbCirclePlus />
                                                Indikator
                                            </ButtonGreenBorder>
                                        </div>
                                    </td>
                                }
                                {/* indikator untuk semua tahun, target & satuan per tahun dari combinedData */}
                                {tahun_list.map((tahun: string) => {
                                    const target = d.target.find((t: TargetData) => t.tahun === tahun);
                                    return (
                                        <React.Fragment key={tahun}>
                                            <td className={`border-r border-b border-slate-400 px-6 py-4 w-full text-center`}>
                                                <div className="flex flex-col items-center gap-1">
                                                    {target && target.target !== "-"
                                                        ? `${target.target} ${target.satuan || ""}`
                                                        : ""
                                                    }
                                                    <button
                                                        type="button"
                                                        onClick={() => handleModalTarget(d, target || null)}
                                                        className="text-sky-500 border border-sky-300 hover:text-sky-700 p-1 rounded-full hover:bg-sky-100 transition-colors shrink-0"
                                                        title="Edit Target Satuan"
                                                    >
                                                        <TbPencil size={14} />
                                                    </button>

                                                </div>
                                            </td>
                                            {/* Pagu dilebur menjadi satu kotak menutupi semua baris indikator */}
                                            {index === 0
                                                ? renderPagu(tahun, combinedData.length)
                                                : null}
                                        </React.Fragment>
                                    );
                                })
                                }
                            </tr>
                        ))
                    }
                </>
            }
            {/* MODAL TAMBAH */}
            {ModalTambahIndikator &&
                <ModalCreateIndikatorRenstraV2
                    isOpen={ModalTambahIndikator}
                    onClose={() => setModalTambahIndikator(false)}
                    jenis={jenis}
                    nama={nama}
                    kode={kode}
                    kode_opd={kode_opd}
                    tahun_list={tahun_list}
                    tahun={Number(tahun)}
                    onSuccess={(data: IndikatorResponse[]) => tambahIndikatorLokal(data)}
                />
            }
            {/* MODAL EDIT */}
            {ModalEditIndikator &&
                <ModalEditIndikatorV2
                    isOpen={ModalEditIndikator}
                    onClose={() => handleModalEditIndikator(null)}
                    nama={nama}
                    jenis={jenis}
                    kode={kode}
                    indikator={IndikatorModal}
                    onSuccess={fetchTrigger}
                />
            }
            {/* MODAL PAGU */}
            {ModalPagu &&
                <ModalPaguAnggaran
                    isOpen={ModalPagu}
                    onClose={() => handleModalPagu(0, '')}
                    nama={nama}
                    jenis={jenis}
                    pagu={Pagu || 0}
                    kode={kode}
                    kode_opd={kode_opd}
                    tahun={TahunN}
                    onSuccess={(data: PaguAnggaranResponse) => {
                        // data response: kode_subkegiatan, kode_opd, tahun, pagu_indikatif
                        // langsung dipakai update tampilan, tanpa fetch ulang
                        onUpdatePagu(data.kode_subkegiatan || kode, data.tahun || TahunN, data.pagu_indikatif);
                    }}
                />
            }
            {ModalTarget &&
                <ModalTargetSatuanRenstra
                    indikator={IndikatorModal}
                    target={TargetModal}
                    isOpen={ModalTarget}
                    onClose={() => handleModalTarget(null, null)}
                    onSuccess={(data: TargetUpsertResponse) => {
                        onUpdateTarget(data.indikator_id || IndikatorModal?.kode_indikator || "", data.tahun, {
                            id: data.id ?? "",
                            indikator_id: data.indikator_id ?? "",
                            tahun: data.tahun ?? "",
                            target: String(data.target ?? "-"),
                            satuan: data.satuan ?? "-",
                        });
                    }}
                />
            }
            {ModalOutcome &&
                <ModalOutcomeMatrix
                    isOpen={ModalOutcome}
                    onClose={() => setModalOutcome(false)}
                    nama={nama}
                    kode_opd={kode_opd}
                    kode={kode}
                    jenis={jenis}
                    metode={JenisModalOutcome}
                    onSuccess={(data: OutcomeData) => {
                        // update UI langsung tanpa fetch ulang
                        setOutcomeLokal([data]);
                    }}
                    Data={outcomeLokal[0] ?? null}
                />
            }
        </>
    )
}
export const TableTotalPagu: React.FC<TablePagu> = ({ tahun_list, pagu_total }) => {

    function formatRupiah(angka: number) {
        if (typeof angka !== 'number') {
            return String(angka); // Jika bukan angka, kembalikan sebagai string
        }
        return angka.toLocaleString('id-ID'); // 'id-ID' untuk format Indonesia
    }

    return (
        <table className="w-full">
            <tbody>
                <tr>
                    <td rowSpan={2} className={`border-r border-b px-6 py-4 font-semibold`}>Total Pagu OPD</td>
                    {tahun_list.map((item: string) => (
                        <td key={item} className="border-r border-b px-6 py-4 font-semibold text-center">{item}</td>
                    ))}
                </tr>
                <tr>
                    {pagu_total.map((item: pagu, index: number) => (
                        <td key={index} className="border-r border-b px-6 py-4 font-semibold text-center">Rp.{formatRupiah(item.pagu_indikatif)}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}
