'use client'

import { useState, useEffect } from "react"
import { LoadingButtonClip2 } from "@/components/global/Loading";
import { TbAlertCircle, TbArrowBack, TbSearch } from "react-icons/tb";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";
import { TematikFindall } from "../type";
import { Table } from "./Table";
import { ButtonBlackBorder } from "@/components/global/Button";

interface Childs {
    id_tematik: number;
    onTableShown?: (shown: boolean) => void;
}

export const Childs: React.FC<Childs> = ({ id_tematik, onTableShown }) => {

    const [Data, setData] = useState<TematikFindall | null>(null);
    const [IdTable, setIdTable] = useState<number | null>(null);

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
                    Error. Terjadi kesalahan saat mengambil data tematik{" "}
                    {id_tematik}
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
                        onTableShown?.(false);
                    }}
                >
                    <TbArrowBack />
                    Kembali Ke List Sub Tematik
                </ButtonBlackBorder>
                <div className={`transition-all duration-300 ease-in-out border border-black w-full`}>
                    <div className="overflow-auto">
                        <Table />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-12">
            {Data?.childs?.map(
                (item: TematikFindall, index: number) => (
                    <div
                        key={index}
                        className="relative ml-24 flex items-center justify-between min-h-[54px] px-3 py-3 rounded-lg border border-emerald-600"
                    >
                        {/* garis vertikal */}
                        <div className="absolute left-[-72px] top-1/2 -translate-y-1/2 w-[72px] h-[2px] rounded-lg bg-emerald-600" />
                        <h1 className="text-base ml-5 text-emerald-600">{item.jenis_pohon || "Jenis Unknown"} - {item.tema || "-"}</h1>
                        <button
                            type="button"
                            onClick={() => {
                                setIdTable(item.id);
                                onTableShown?.(true);
                            }}
                            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-emerald-600 text-sm hover:bg-emerald-800 text-white transition-all"
                        >
                            <TbSearch />
                            Detail
                        </button>
                    </div>
                )
            )}
        </div>
    );
};