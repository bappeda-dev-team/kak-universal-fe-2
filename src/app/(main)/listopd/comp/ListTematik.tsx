'use client'

import React, { useState, useEffect } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { TbArrowBadgeDownFilled } from "react-icons/tb";
import { useBrandingContext } from "@/context/BrandingContext";
import { TematikFindall, Misi } from "../type";
import { Childs } from "./Childs";

interface ListTematik {
    tahun: number;
}

export const ListTematik: React.FC<ListTematik> = ({ tahun }) => {

    const [Tematik, setTematik] = useState<TematikFindall[]>([]);

    const [IsError, setIsError] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const [Show, setShow] = useState<{ [key: number]: boolean }>({});
    const [TableShown, setTableShown] = useState<boolean[]>([]);
    const [DataNull, setDataNull] = useState<boolean>(false);

    const { branding } = useBrandingContext();
    const token = getToken();

    useEffect(() => {
        const fetchTematik = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${branding?.api_perencanaan}/tematik_pemda/${tahun}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data.tematiks;
                if (data == null || data.length === 0) {
                    setDataNull(true);
                    setTematik([]);
                } else if (result.code === 401) {
                    setIsError(true);
                } else {
                    setDataNull(false);
                    setTematik(data);
                    setIsError(false);
                }
                setTematik(data);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTematik();
    }, [branding, tahun, token]);

    const handleShow = (id: number) => {
        setShow((prev) => ({
            [id]: !prev[id],
        }));
    }
    const handleTableShown = (index: number, shown: boolean) => {
        setTableShown((prev) => {
            const newState = [...prev];
            newState[index] = shown;
            return newState;
        });
    };

    if (Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    } else if (IsError) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 mx-5 py-5">Periksa koneksi internet atau database server</h1>
            </div>
        )
    }

    return (
        <>
            {DataNull ? (
                <div className="px-6 py-3 border w-full rounded-xl">
                    Data Kosong / Belum Ditambahkan
                </div>
            ) : (
                Tematik.map((data: TematikFindall, index: number) => {
                    const isShown = Show[index] || false;

                    return (
                        <div key={index} className="w-full relative mb-4">
                            <div className={`w-full overflow-hidden rounded-xl border-2 transition-all duration-200 ${isShown ? "border-emerald-500" : "border-emerald-500 hover:border-emerald-400"}`}>
                                {/* HEADER / TOGGLE */}
                                <div
                                    className={`flex items-center justify-between w-full px-5 py-4 cursor-pointer transition-all duration-200
                                        ${isShown
                                            ? "bg-emerald-500 text-white"
                                            : "bg-white text-slate-800 hover:bg-emerald-50"
                                        }
                                    `}
                                    onClick={() => handleShow(index)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`hidden sm:inline-block text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border ${isShown ? "bg-white/20 border-white/40 text-white" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700"}`}>
                                            Tematik
                                        </span>
                                        <h1 className="font-bold text-lg">{data.tema || "tidak diketahui"}</h1>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {data.is_active === true ? (
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isShown ? "bg-white/30 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isShown ? "bg-red-400/30 text-white" : "bg-red-100 text-red-600"}`}>
                                                Non-aktif
                                            </span>
                                        )}
                                        <TbArrowBadgeDownFilled className={`text-2xl transition-all duration-200 ${isShown ? "" : "-rotate-90"}`} />
                                    </div>
                                </div>
                                {/* MISI */}
                                <div className={`border-t px-5 py-4 bg-emerald-50/50 ${isShown ? "border-emerald-500" : "border-emerald-500/50"}`}>
                                    <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">
                                        Misi RPJMD Terkait
                                    </h2>
                                    <ol className="flex flex-col gap-2.5">
                                        {data.misi.length > 0 ?
                                            data.misi.map((misi: Misi, m_index: number) => (
                                                <li key={m_index} className="flex items-start gap-3">
                                                    <span className={`flex-none w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${isShown ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                                                        {m_index + 1}
                                                    </span>
                                                    <p className="text-sm leading-relaxed text-slate-700">{misi.misi || ""}</p>
                                                </li>
                                            ))
                                            :
                                            <p className="text-sm leading-relaxed text-slate-700">tidak ditambahkan</p>
                                        }
                                    </ol>
                                </div>
                            </div>
                            {isShown && (
                                <div className={`transition-all duration-300 ease-in-out border-x border-b border-emerald-500 ${isShown ? "opacity-100 mx-2 p-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                    <div className="relative mt-2">
                                        {/* GARIS VERTIKAL */}
                                        {!TableShown[index] && (
                                            <div className="absolute left-6 top-0 bottom-6 w-[2px] bg-emerald-600 rounded-full" />
                                        )}
                                        <Childs
                                            id_tematik={data.id || 0}
                                            onTableShown={(shown) =>
                                                handleTableShown(index, shown)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </>
    );
}