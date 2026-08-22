'use client'

import React, { useState, useEffect } from "react";
import { LoadingClip } from "@/components/global/Loading";
import { getToken } from "@/components/lib/Cookie";
import { TbArrowBadgeDownFilled } from "react-icons/tb";
import { useBrandingContext } from "@/context/BrandingContext";
import { TematikFindall } from "../type";
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
                            <div
                                className={`flex items-center justify-between w-full px-4 py-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                    ${isShown
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "text-emerald-500 border-emerald-500 hover:text-white hover:bg-emerald-400"
                                    }
                                `}
                                onClick={() => handleShow(index)}
                            >
                                {data.is_active === true ? (
                                    <h1 className="font-semibold text-lg">Tematik - {data.tema || "tidak diketahui"}</h1>
                                ) : (
                                    <div className="font-semibold flex items-center gap-1">
                                        <h1>Tematik - {data.tema || "tidak diketahui"}</h1>
                                        <h1 className="text-red-500">(non-aktif)</h1>
                                    </div>
                                )}
                                <TbArrowBadgeDownFilled className={`text-3xl transition-all duration-200 ${isShown ? "" : "-rotate-90"}`} />
                            </div>
                            {isShown && (
                                <div className={`transition-all duration-300 ease-in-out border-x border-b border-emerald-500 ${isShown ? "opacity-100 mx-2 p-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                    <div className="relative mt-2">
                                        {/* GARIS VERTIKAL */}
                                        {!TableShown[index] && (
                                            <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-emerald-600 rounded-full my-2" />
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