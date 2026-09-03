'use client'

import React, { useState, useEffect } from "react"
import { LoadingButtonClip2 } from "@/components/global/Loading";
import { TbAlertCircle, TbArrowBack, TbSearch } from "react-icons/tb";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";
import { TematikFindall, DataTable } from "../type";
import { Table } from "./Table";
import { ButtonBlackBorder } from "@/components/global/Button";

interface Childs {
    id_tematik: number;
    onTableShown?: (shown: boolean) => void;
}

export const Childs: React.FC<Childs> = ({ id_tematik, onTableShown }) => {

    const [Data, setData] = useState<TematikFindall | null>(null);
    const [IdTable, setIdTable] = useState<number | null>(null);
    const [DataTable, setDataTable] = useState<any>(null);

    const [hasOpdData, setHasOpdData] = useState(false);

    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);

    const { branding } = useBrandingContext();
    const token = getToken();

    useEffect(() => {
        const fetchTematik = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${branding.api_perencanaan}/listOpdTematik/${id_tematik}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const result = await response.json();
                if (result.code === 200) {
                    setData(result.data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTematik();

    }, [branding, id_tematik]);

    const checkHasOpd = (nodes: any) => {
        if (!nodes) return false;

        // handle kalau nodes berupa array atau objek tunggal
        const list = Array.isArray(nodes) ? nodes : [nodes];

        for (const node of list) {
            if (!node || typeof node !== "object") continue;

            // cek apakah node ini punya properti kode_opd atau nama_opd
            if (
                Object.prototype.hasOwnProperty.call(node, "kode_opd") ||
                Object.prototype.hasOwnProperty.call(node, "nama_opd")
            ) {
                return true;
            }

            // lanjut cek ke childs (rekursif)
            if (node.childs) {
                if (checkHasOpd(node.childs)) return true;
            }
        }

        return false;
    };
    const splitData = (nodes: any) => {
        const dataOpd: TematikFindall[] = [];
        const nonDataOpd: any[] = [];

        (nodes ?? []).forEach((node: any) => {
            if (!node) return;

            const isOpd =
                Object.prototype.hasOwnProperty.call(node, "kode_opd") ||
                Object.prototype.hasOwnProperty.call(node, "nama_opd");

            if (isOpd) {
                dataOpd.push(node);
            } else {
                nonDataOpd.push(node);
            }
        });

        return { dataOpd, nonDataOpd };
    };

    useEffect(() => {
        setHasOpdData(checkHasOpd(Data));
    }, [Data]);

    if (Loading) {
        return (
            <div className="ml-24 flex items-center gap-2 py-4">
                <LoadingButtonClip2 />
                <h1>Loading Data Tematik...</h1>
            </div>
        );
    } else if (Error) {
        return (
            <div className="ml-24 py-4">
                <h1 className="flex items-center gap-1 text-red-400 font-bold">
                    <TbAlertCircle />
                    Error. Terjadi kesalahan saat mengambil data tematik {id_tematik}
                </h1>
            </div>
        );
    } else if (IdTable != null) {
        return (
            <div className="w-full flex flex-col items-center gap-2">
                <ButtonBlackBorder
                    className="flex items-center gap-1 w-full"
                    onClick={() => {
                        setIdTable(null);
                        setDataTable(null);
                        onTableShown?.(false);
                    }}
                >
                    <TbArrowBack />
                    Kembali Ke List Sub Tematik
                </ButtonBlackBorder>
                <div className={`transition-all duration-300 ease-in-out border border-black w-full`}>
                    <div className="overflow-auto">
                        <Table DataTable={DataTable} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-12">
            {Data?.childs?.map(
                (item: TematikFindall, index: number) => {
                    const { dataOpd, nonDataOpd } = splitData(item.childs);
                    return (
                        // SUB TEMATIK
                        <React.Fragment key={index}>
                            <div className="relative ml-24 flex items-center justify-between min-h-[54px] px-3 py-3 rounded-lg border border-emerald-600">
                                {/* garis vertikal */}
                                <div className="absolute left-[-72px] top-1/2 -translate-y-1/2 w-[72px] h-[2px] rounded-lg bg-emerald-600" />
                                <h1 className="text-base ml-5 text-slate-900 font-bold">{item.jenis_pohon || "Jenis Unknown"} - {item.tema || "Tema Unknown"}</h1>
                                {dataOpd.length > 0 &&
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIdTable(item.id);
                                            onTableShown?.(true);
                                            setDataTable(dataOpd)
                                        }}
                                        className="flex items-center gap-1 px-5 py-2 rounded-lg bg-emerald-600 text-sm hover:bg-emerald-800 text-white transition-all"
                                    >
                                        <TbSearch />
                                        Detail
                                    </button>
                                }
                            </div>
                            {nonDataOpd?.map((data: TematikFindall, data_index: number) => {
                                const { dataOpd: dataOpd2, nonDataOpd: nonDataOpd2 } = splitData(data.childs);
                                return (
                                    <React.Fragment key={data_index}>
                                        {/* SUB SUB TEMATIK */}
                                        <div key={index} className="relative ml-[150px] flex items-center justify-between min-h-[54px] px-3 py-3 rounded-lg border border-emerald-600">
                                            <div className="absolute left-[-124px] top-1/2 -translate-y-1/2 w-[122px] h-[2px] rounded-lg bg-emerald-600" />
                                            <h1 className="text-base ml-5 text-slate-700 font-bold">{data.jenis_pohon || "Jenis Unknown"} - {data.tema || "Tema Unknown"}</h1>
                                            {dataOpd2 &&
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIdTable(data.id);
                                                        onTableShown?.(true);
                                                        setDataTable(dataOpd2);
                                                    }}
                                                    className="flex items-center gap-1 px-5 py-2 rounded-lg bg-emerald-600 text-sm hover:bg-emerald-800 text-white transition-all"
                                                >
                                                    <TbSearch />
                                                    Detail
                                                </button>
                                            }
                                        </div>
                                        {nonDataOpd2?.map((s: TematikFindall, super_index: number) => (
                                            // SUPER SUB TEMATIK
                                            <div
                                                key={super_index}
                                                className="relative ml-[250px] flex items-center justify-between min-h-[54px] px-3 py-3 rounded-lg border border-emerald-600"
                                            >
                                                <div className="absolute left-[-228px] top-1/2 -translate-y-1/2 w-[228px] h-[2px] rounded-lg bg-emerald-600" />
                                                <h1 className="text-base ml-5 text-slate-400 font-bold">{s.jenis_pohon || "Jenis Unknown"} - {s.tema || "Tema Unknown"}</h1>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIdTable(s.id);
                                                        onTableShown?.(true);
                                                        setDataTable(s.childs)
                                                    }}
                                                    className="flex items-center gap-1 px-5 py-2 rounded-lg bg-emerald-600 text-sm hover:bg-emerald-800 text-white transition-all"
                                                >
                                                    <TbSearch />
                                                    Detail
                                                </button>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    )
                }
            )}
        </div>
    );
};