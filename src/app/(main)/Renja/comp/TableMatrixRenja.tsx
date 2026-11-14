'use client'

import { getToken } from "@/components/lib/Cookie";
import React, { useEffect, useState } from "react";
import { ButtonSky, ButtonBlackBorder, ButtonSkyBorder } from "@/components/global/Button";
import { TbLockCancel, TbPencil, TbCirclePlus, TbLockOpen, TbLockFilled, TbRefresh, TbPrinter, TbTrash } from "react-icons/tb";
import { LoadingClip } from "@/components/global/Loading";
import { ModalAnggaranMatrixRenja } from "./ModalAnggaranMatrixRenja";
import { AlertNotification, AlertQuestion } from "@/components/global/Alert";
import { useBrandingContext } from "@/context/BrandingContext";
import { formatRupiah } from "@/components/utils/format-rupiah";
import { ModalTargetSatuanRenja } from "./ModalTargetSatuanRenja";

interface Renja {
    nama: string;
    kode: string;
    jenis: string;
    indikator: Indikator[];
    indikator_ranwal: Indikator[];
    indikator_rankhir: Indikator[];
    indikator_penetapan: Indikator[];
    pagu_ranwal: number;
    pagu_rankhir: number;
    pagu_penetapan: number;
    bidang_urusan?: Renja[];
    program?: Renja[]
    kegiatan?: Renja[]
    subkegiatan?: Renja[]
}
interface matrix {
    kode_opd: string
    tahun_awal: string;
    tahun_akhir: string;
    pagu_total_ranwal: number;
    pagu_total_rankhir: number;
    pagu_total_penetapan: number;
    urusan: Renja[];
}
interface Indikator {
    kode_indikator: string;
    kode: string;
    kode_opd: string;
    indikator: string;
    tahun: string;
    target_id: number;
    target: string;
    satuan: string;
}
interface table {
    jenis: "laporan" | "opd";
    kode_opd: string;
    menu: "ranwal" | "rankhir" | "penetapan";
    tahun: string;
}

export const TableMatrixRenja: React.FC<table> = ({ jenis, tahun, menu, kode_opd }) => {

    const [Matrix, setMatrix] = useState<matrix[]>([]);

    const [Loading, setLoading] = useState<boolean>(false);
    const [DataNull, setDataNull] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const token = getToken();
    const { branding } = useBrandingContext();

    const [Lock, setLock] = useState<boolean>(false);

    useEffect(() => {
        const fetchMatrix = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${branding?.api_perencanaan}/matrix_renja/${menu}/${kode_opd}/${tahun}`, {
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
    }, [branding, kode_opd, tahun, token, FetchTrigger, menu]);

    if (DataNull) {
        return <h1 className="p-5 text-red-500 font-semibold">Sub Kegiatan OPD belum di pilih pada tahun {tahun || 0}</h1>

    }
    if (Loading) {
        return <LoadingClip />
    }

    return (
        <>
            {menu === "penetapan" &&
                <div className="px-3 py-2">
                    <div className={`flex items-center justify-between p-2 text-white rounded-lg ${Lock ? "bg-red-500" : "bg-emerald-500"}`}>
                        {Lock ?
                            <div className="flex items-center gap-1">
                                <TbLockFilled />
                                <p>Data terkunci tidak bisa di ubah</p>
                            </div>
                            :
                            <div className="flex items-center gap-1">
                                <TbLockOpen />
                                <p>Data terbuka dan bisa di ubah</p>
                            </div>
                        }
                        {Lock ?
                            <div className="flex items-center gap-1">
                                <ButtonSky className="flex items-center gap-1">
                                    <TbPrinter />
                                    Cetak
                                </ButtonSky>
                                <ButtonBlackBorder className="bg-white flex items-center gap-1">
                                    <TbLockOpen />
                                    Buka Kunci
                                </ButtonBlackBorder>
                            </div>
                            :
                            <div className="flex items-center gap-1">
                                <ButtonSkyBorder className="bg-white flex items-center gap-1">
                                    <TbRefresh />
                                    Sync
                                </ButtonSkyBorder>
                                <ButtonBlackBorder className="bg-white flex items-center gap-1">
                                    <TbLockFilled />
                                    Kunci Data
                                </ButtonBlackBorder>
                            </div>
                        }
                    </div>
                </div>
            }
            {Matrix.map((item: matrix, index: number) => (
                <React.Fragment key={index}>
                    <div className="overflow-auto m-2 rounded-xl border border-black">
                        <TableTotalPagu
                            tahun={tahun}
                            menu={menu}
                            pagu_total_ranwal={item.pagu_total_ranwal ?? 0}
                            pagu_total_rankhir={item.pagu_total_rankhir ?? 0}
                            pagu_total_penetapan={item.pagu_total_penetapan ?? 0}
                        />
                    </div>
                    <div className="overflow-auto m-2 rounded-t-xl border">
                        {item.urusan.length === 0 ?
                            <h1 className="p-5">Sub Kegiatan di tahun {tahun || 0} belum di gunakan di rencana kinerja</h1>
                            :
                            <table className="w-full">
                                {item.urusan.map((u: Renja, u_index: number) => (
                                    <React.Fragment key={u_index}>
                                        <TheadMatrix
                                            tahun={String(tahun) || "0"}
                                            jenis="Urusan"
                                            type={jenis}
                                            menu={menu}
                                        />
                                        <tbody>
                                            <TrMatrix
                                                jenis="Urusan"
                                                type={jenis}
                                                indikator_ranwal={u.indikator_ranwal}
                                                indikator_rankhir={u.indikator_rankhir}
                                                indikator_penetapan={u.indikator_penetapan}
                                                pagu_ranwal={u.pagu_ranwal || 0}
                                                pagu_rankhir={u.pagu_rankhir || 0}
                                                pagu_penetapan={u.pagu_penetapan || 0}
                                                kode={u.kode}
                                                nama={u.nama}
                                                kode_opd={item.kode_opd}
                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                lock={Lock}
                                                menu={menu}
                                            />
                                        </tbody>
                                        {u.bidang_urusan &&
                                            <React.Fragment>
                                                {u.bidang_urusan.map((br: Renja, br_index: number) => (
                                                    <React.Fragment key={br_index}>
                                                        <TheadMatrix
                                                            tahun={String(tahun) || "0"}
                                                            jenis="Bidang Urusan"
                                                            type={jenis}
                                                            menu={menu}
                                                        />
                                                        <tbody>
                                                            <TrMatrix
                                                                jenis="Bidang Urusan"
                                                                type={jenis}
                                                                indikator_ranwal={br.indikator_ranwal}
                                                                indikator_rankhir={br.indikator_rankhir}
                                                                indikator_penetapan={br.indikator_penetapan}
                                                                pagu_ranwal={br.pagu_ranwal || 0}
                                                                pagu_rankhir={br.pagu_rankhir || 0}
                                                                pagu_penetapan={br.pagu_penetapan || 0}
                                                                kode={br.kode}
                                                                nama={br.nama}
                                                                kode_opd={kode_opd}
                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                lock={Lock}
                                                                menu={menu}
                                                            />
                                                        </tbody>
                                                        {br.program &&
                                                            <React.Fragment>
                                                                {br.program.map((p: Renja, p_index: number) => (
                                                                    <React.Fragment key={p_index}>
                                                                        <TheadMatrix
                                                                            tahun={String(tahun) || "0"}
                                                                            jenis="Program"
                                                                            type={jenis}
                                                                            menu={menu}
                                                                        />
                                                                        <tbody>
                                                                            <TrMatrix
                                                                                jenis="Program"
                                                                                type={jenis}
                                                                                indikator_ranwal={p.indikator_ranwal}
                                                                                indikator_rankhir={p.indikator_rankhir}
                                                                                indikator_penetapan={p.indikator_penetapan}
                                                                                pagu_ranwal={p.pagu_ranwal || 0}
                                                                                pagu_rankhir={p.pagu_rankhir || 0}
                                                                                pagu_penetapan={p.pagu_penetapan || 0}
                                                                                kode={p.kode}
                                                                                nama={p.nama}
                                                                                kode_opd={kode_opd}
                                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                                lock={Lock}
                                                                                menu={menu}
                                                                            />
                                                                        </tbody>
                                                                        {p.kegiatan &&
                                                                            <React.Fragment>
                                                                                {p.kegiatan.map((k: Renja, k_index: number) => (
                                                                                    <React.Fragment key={k_index}>
                                                                                        <TheadMatrix
                                                                                            tahun={String(tahun) || "0"}
                                                                                            jenis="Kegiatan"
                                                                                            type={jenis}
                                                                                            menu={menu}
                                                                                        />
                                                                                        <tbody>
                                                                                            <TrMatrix
                                                                                                jenis="Kegiatan"
                                                                                                type={jenis}
                                                                                                indikator_ranwal={k.indikator_ranwal}
                                                                                                indikator_rankhir={k.indikator_rankhir}
                                                                                                indikator_penetapan={k.indikator_penetapan}
                                                                                                pagu_ranwal={k.pagu_ranwal || 0}
                                                                                                pagu_rankhir={k.pagu_rankhir || 0}
                                                                                                pagu_penetapan={k.pagu_penetapan || 0}
                                                                                                kode={k.kode}
                                                                                                nama={k.nama}
                                                                                                kode_opd={kode_opd}
                                                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                                                lock={Lock}
                                                                                                menu={menu}
                                                                                            />
                                                                                        </tbody>
                                                                                        {k.subkegiatan &&
                                                                                            <React.Fragment>
                                                                                                <TheadMatrix
                                                                                                    tahun={String(tahun) || "0"}
                                                                                                    jenis="Sub Kegiatan"
                                                                                                    type={jenis}
                                                                                                    menu={menu}
                                                                                                />
                                                                                                {k.subkegiatan.map((sk: Renja, sk_index: number) => (
                                                                                                    <React.Fragment key={sk_index}>
                                                                                                        <tbody>
                                                                                                            <TrMatrix
                                                                                                                jenis="Sub Kegiatan"
                                                                                                                type={jenis}
                                                                                                                indikator_ranwal={sk.indikator_ranwal}
                                                                                                                indikator_rankhir={sk.indikator_rankhir}
                                                                                                                indikator_penetapan={sk.indikator_penetapan}
                                                                                                                pagu_ranwal={sk.pagu_ranwal || 0}
                                                                                                                pagu_rankhir={sk.pagu_rankhir || 0}
                                                                                                                pagu_penetapan={sk.pagu_penetapan || 0}
                                                                                                                kode={sk.kode}
                                                                                                                nama={sk.nama}
                                                                                                                kode_opd={kode_opd}
                                                                                                                fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                                                                                                                lock={Lock}
                                                                                                                menu={menu}
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
        // <>TEST</>
    )
}

interface Thead {
    jenis: "Urusan" | "Bidang Urusan" | "Program" | "Kegiatan" | "Sub Kegiatan";
    type: "laporan" | "opd";
    menu: "ranwal" | "rankhir" | "penetapan";
    tahun: string;
}
export const TheadMatrix: React.FC<Thead> = ({ tahun, jenis, type, menu }) => {
    return (
        <thead>
            <tr className={`
                ${jenis === "Urusan" && "bg-white text-black"}
                ${jenis === "Bidang Urusan" && "bg-red-500 text-white"}
                ${jenis === "Program" && "bg-blue-500 text-white"}
                ${jenis === "Kegiatan" && "bg-green-700 text-white"}
                ${jenis === "Sub Kegiatan" && "bg-emerald-500 text-white"}
            `}>
                <td rowSpan={3} className="border-r border-b px-6 py-4 w-[200px]">Kode</td>
                <td rowSpan={3} className="border-r border-b px-6 py-4 min-w-[200px]">{jenis}</td>
                <td colSpan={(type === "opd" && menu != "ranwal") ? 12 : 10} className="border-r border-b px-6 py-3 min-w-[100px] text-center">{tahun || 0}</td>

            </tr>
            <tr className={`
                ${jenis === "Urusan" && "bg-white text-black"}
                ${jenis === "Bidang Urusan" && "bg-red-500 text-white"}
                ${jenis === "Program" && "bg-blue-500 text-white"}
                ${jenis === "Kegiatan" && "bg-green-700 text-white"}
                ${jenis === "Sub Kegiatan" && "bg-emerald-500 text-white"}
            `}>
                <td colSpan={(type === "opd" && menu != "ranwal") ? 4 : 3} className="border-l border-b px-6 py-3 min-w-[300px] text-center uppercase font-bold">
                    {menu === "penetapan" ? "rankir" : "ranwal"}
                </td>
                {menu != "ranwal" &&
                    <td colSpan={(type === "opd") ? 5 : 4} className="border-l border-b px-6 py-3 min-w-[300px] text-center uppercase font-bold">
                        {menu === "penetapan" ? "penetapan" : "rankir"}
                    </td>
                }
            </tr>
            <tr className={`
                ${jenis === "Urusan" && "bg-white text-black"}
                ${jenis === "Bidang Urusan" && "bg-red-500 text-white"}
                ${jenis === "Program" && "bg-blue-500 text-white"}
                ${jenis === "Kegiatan" && "bg-green-700 text-white"}
                ${jenis === "Sub Kegiatan" && "bg-emerald-500 text-white"}
            `}>
                {(jenis === 'Urusan' || jenis === 'Bidang Urusan') ?
                    <>
                        <td colSpan={(type === "opd" && menu != "ranwal") ? 4 : 3} className="border-l border-b px-6 py-3 min-w-[200px] text-center">Pagu</td>
                        {menu != "ranwal" &&
                            <td colSpan={(type === "opd") ? 5 : 4} className="border-l border-b px-6 py-3 min-w-[200px] text-center">Pagu</td>
                        }
                    </>
                    :
                    <>
                        <td className="border-l border-b px-6 py-3 min-w-[300px] text-center">indikator</td>
                        <td className="border-l border-b px-6 py-3 min-w-[50px]">Target</td>
                        <td className="border-l border-b px-6 py-3 min-w-[50px]">Satuan</td>
                        <td className="border-l border-b px-6 py-3 min-w-[200px] text-center">Pagu</td>
                        {menu != "ranwal" &&
                            <>
                                <td className="border-l border-b px-6 py-3 min-w-[300px] text-center">indikator</td>
                                <td className="border-l border-b px-6 py-3 min-w-[50px]">Target</td>
                                <td className="border-l border-b px-6 py-3 min-w-[50px]">Satuan</td>
                                {(type === "opd") &&
                                    <td className="border-l border-b px-6 py-3 min-w-[50px] text-center">Aksi</td>
                                }
                                <td className="border-l border-b px-6 py-3 min-w-[200px] text-center">Pagu</td>
                            </>
                        }
                    </>
                }
            </tr>
        </thead>
    )
}
interface Tr {
    indikator_ranwal: Indikator[];
    indikator_rankhir: Indikator[];
    indikator_penetapan: Indikator[];
    pagu_ranwal?: number;
    pagu_rankhir?: number;
    pagu_penetapan?: number;
    nama: string;
    kode: string;
    kode_opd: string;
    jenis: "Urusan" | "Bidang Urusan" | "Program" | "Kegiatan" | "Sub Kegiatan";
    type: "laporan" | "opd";
    menu: "ranwal" | "rankhir" | "penetapan";
    lock: boolean
    fetchTrigger(): void;
}
export const TrMatrix: React.FC<Tr> = ({ jenis, type, kode_opd, kode, menu, nama, pagu_ranwal, pagu_rankhir, pagu_penetapan, indikator_ranwal, indikator_rankhir, indikator_penetapan, lock, fetchTrigger }) => {

    const { branding } = useBrandingContext();
    const token = getToken();

    const [ModalPagu, setModalPagu] = useState<boolean>(false);
    const [Pagu, setPagu] = useState<number>(0);
    const [ModalTarget, setModalTarget] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<Indikator | null>(null);

    const handleModalTarget = (data: Indikator | null) => {
        if (ModalTarget) {
            setModalTarget(false);
            setDataModal(data);
        } else {
            setModalTarget(true);
            setDataModal(data);
        }
    }
    const handleModalPagu = (pagu: number) => {
        if (ModalPagu) {
            setModalPagu(false);
            setPagu(pagu);
        } else {
            setModalPagu(true);
            setPagu(pagu);
        }
    }
    const hapusTarget = async (kode: string) => {
        try {
            const response = await fetch(`${branding?.api_perencanaan}/matrix_renja/target/${menu}/${kode}/${branding?.tahun?.value}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.code === 201 || result.code === 200) {
                AlertNotification("Berhasil", `Berhasil Menghapus Target Satuan dalam Indikator`, "success", 1000);
                fetchTrigger();
            } else if (result.code === 500) {
                AlertNotification("Gagal", `${result.data}`, "error", 2000);
            } else {
                AlertNotification("Gagal", "terdapat kesalahan pada backend / database server dengan response !ok", "error", 2000);
                console.error(result);
            }
        } catch (err) {
            AlertNotification("Gagal", `${err}`, "error", 2000);
        }
    }

    const indikator_kiri = menu === "penetapan" ? indikator_rankhir ?? [] : indikator_ranwal ?? [];
    const indikator_kanan = menu === "penetapan" ? indikator_penetapan ?? [] : indikator_rankhir ?? [];

    const pagu_kiri = menu === "penetapan" ? pagu_rankhir ?? 0 : pagu_ranwal ?? 0;
    const pagu_kanan = menu === "penetapan" ? pagu_penetapan ?? 0 : pagu_rankhir ?? 0;

    const MaxRows = Math.max(indikator_kiri.length, indikator_kanan.length, 1);

    return (
        <>
            {(jenis === 'Urusan' || jenis === 'Bidang Urusan') ?
                <tr>
                    <td className={`border-r border-b px-6 py-4 font-semibold`}>{kode}</td>
                    <td className={`border-r border-b px-6 py-4 w-full`}>{nama}</td>
                    {/* KIRI */}
                    <React.Fragment>
                        <td className={`border-b px-6 py-4 w-full`}></td>
                        <td className={`border-b px-6 py-4 w-full`}></td>
                        <td className={`border-b px-6 py-4 w-full`}></td>
                        <td className={`border-b border-x px-6 py-4 w-full`}>
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-semibold text-sm">Rp.{formatRupiah(pagu_kiri)}</span>
                            </div>
                        </td>
                    </React.Fragment>
                    {/* KANAN */}
                    {menu != "ranwal" &&
                        <React.Fragment>
                            <td className={`border-b px-6 py-4 w-full`}></td>
                            <td className={`border-b px-6 py-4 w-full`}></td>
                            <td className={`border-b px-6 py-4 w-full`}></td>
                            {(type === "opd") &&
                                <td className={`border-r border-b px-6 py-4 w-full`}></td>
                            }
                            <td className={`border-r border-b px-6 py-4 w-full`}>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="font-semibold text-sm">Rp.{formatRupiah(pagu_kanan)}</span>
                                </div>
                            </td>
                        </React.Fragment>
                    }
                </tr>
                :
                <>
                    <tr>
                        <td rowSpan={MaxRows + 1} className={`border-r border-b px-6 py-4 font-semibold`}>{kode}</td>
                        <td rowSpan={MaxRows + 1} className={`border-r border-b px-6 py-4 w-full`}>{nama}</td>
                    </tr>
                    {Array.from({ length: MaxRows }).map((_, index: number) => {
                        const kiri = indikator_kiri[index];
                        const kanan = indikator_kanan[index];
                        return (
                            <tr key={index} className="h-[300px]">
                                {/* ================= KIRI ================= */}
                                <td className="border-r border-b px-6 py-4 w-full">
                                    <div className="flex items-center gap-2">{kiri?.indikator || "-"}</div>
                                </td>
                                <td className="border-r border-b px-6 py-4 w-full">{kiri?.target || "-"}</td>
                                <td className="border-r border-b px-6 py-4 w-full">{kiri?.satuan || "-"}</td>
                                {index === 0 && (
                                    <td rowSpan={MaxRows} className="border-r border-b px-6 py-4 text-center align-middle">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="font-semibold text-sm">Rp.{formatRupiah(pagu_kiri)}</span>
                                        </div>
                                    </td>
                                )}
                                {/* ================= KANAN ================= */}
                                {menu != "ranwal" &&
                                    <>
                                        <td className="border-r border-b px-6 py-4 w-full">
                                            <div className="flex items-center gap-2">{kanan?.indikator || "-"}</div>
                                        </td>
                                        <td className="border-r border-b px-6 py-4 w-full">{kanan?.target || "-"}</td>
                                        <td className="border-r border-b px-6 py-4 w-full">{kanan?.satuan || "-"}</td>
                                        {(type === "opd") &&
                                            <td className="border-r border-b px-6 py-4 text-center align-middle">
                                                {menu === "penetapan" && lock ?
                                                    <div className="text-red-500 flex items-center justify-center">
                                                        <TbLockCancel size={30} />
                                                    </div>
                                                    :
                                                    <div className="flex flex-col gap-1">
                                                        {kanan?.indikator != null ?
                                                            <>
                                                                <button
                                                                    className="p-1 flex items-center gap-1 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full"
                                                                    title="Edit target satuan"
                                                                    onClick={() => handleModalTarget(kanan)}
                                                                >
                                                                    <TbPencil />
                                                                </button>
                                                                <button
                                                                    className="p-1 flex items-center gap-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full"
                                                                    title="Hapus target satuan"
                                                                    onClick={() => AlertQuestion("Hapus", "Hapus Target Satuan? (bukan indikator)", "question", "Hapus", "Batal").then((resp) => {
                                                                        if (resp.isConfirmed) {
                                                                            hapusTarget(kanan.kode_indikator);
                                                                        }
                                                                    })}
                                                                >
                                                                    <TbTrash />
                                                                </button>
                                                            </>
                                                            : "-"
                                                        }
                                                    </div>
                                                }
                                            </td>
                                        }
                                        {index === 0 && (
                                            <td rowSpan={MaxRows} className="border-r border-b px-6 py-4 text-center align-middle">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="font-semibold text-sm">
                                                        Rp.{formatRupiah(pagu_kanan)}
                                                    </span>
                                                    {jenis === "Sub Kegiatan" ?
                                                        menu === "penetapan" && lock ?
                                                            <div className="text-red-500 flex items-center justify-center">
                                                                <TbLockCancel size={20} />
                                                            </div>
                                                            :
                                                            <button
                                                                type="button"
                                                                className="text-sky-400 border border-sky-300 hover:text-sky-600 p-1 rounded-full hover:bg-sky-100 transition-colors"
                                                                title="Edit Pagu Anggaran"
                                                                onClick={() => handleModalPagu(pagu_kanan)}
                                                            >
                                                                <TbPencil size={14} />
                                                            </button>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </td>
                                        )}
                                    </>
                                }
                            </tr>
                        )
                    })
                    }
                </>
            }
            {ModalTarget &&
                <ModalTargetSatuanRenja
                    isOpen={ModalTarget}
                    onClose={() => handleModalTarget(null)}
                    onSuccess={fetchTrigger}
                    Data={DataModal}
                    menu={menu}
                />
            }
            {ModalPagu &&
                <ModalAnggaranMatrixRenja
                    isOpen={ModalPagu}
                    onClose={() => handleModalPagu(0)}
                    onSuccess={fetchTrigger}
                    kode_opd={kode_opd}
                    tahun={String(branding?.tahun?.value)}
                    pagu={Pagu}
                    kode={kode}
                />
            }
        </>
    )
}

interface TablePagu {
    tahun: string;
    pagu_total_ranwal?: number;
    pagu_total_rankhir?: number;
    pagu_total_penetapan?: number;
    menu: "ranwal" | "rankhir" | "penetapan";
}
export const TableTotalPagu: React.FC<TablePagu> = ({ tahun, menu, pagu_total_ranwal, pagu_total_rankhir, pagu_total_penetapan }) => {

    const total_awal = menu === "penetapan" ? pagu_total_rankhir || 0 : pagu_total_ranwal || 0;
    const total_akhir = menu === "penetapan" ? pagu_total_penetapan || 0 : pagu_total_rankhir || 0;

    return (
        <table className="w-full">
            <tbody>
                <tr>
                    <td rowSpan={4} className={`border-black border-r border-b px-6 py-1 font-bold`}>Total Pagu OPD</td>
                </tr>
                <tr>
                    <td colSpan={2} className="border-black border-r border-b px-6 py-1 font-bold text-center">{tahun || "tahun"}</td>
                </tr>
                <tr>
                    <td className={`
                            ${menu === "ranwal" ? "bg-red-600" : menu === "rankhir" ? "bg-red-600" : "bg-yellow-600"} 
                            border-black border-r border-b px-6 py-1 font-semibold text-center text-white uppercase
                        `}
                    >
                        {menu === "ranwal" ? menu : menu === "rankhir" ? "Ranwal" : "Rankhir"}
                    </td>
                    {menu != "ranwal" &&
                        <td className={`
                                ${menu === "rankhir" ? "bg-yellow-600" : "bg-blue-600"} 
                                border-black border-r border-b px-6 py-1 font-semibold text-center text-white uppercase
                            `}
                        >{menu}</td>
                    }
                </tr>
                <tr>
                    <td className="border-black border-r border-b px-6 py-2 font-semibold text-center">Rp. {formatRupiah(total_awal)}</td>
                    {menu != "ranwal" &&
                        <td className="border-black border-r border-b px-6 py-2 font-semibold text-center">Rp. {formatRupiah(total_akhir)}</td>
                    }
                </tr>
            </tbody>
        </table>
    )
}
