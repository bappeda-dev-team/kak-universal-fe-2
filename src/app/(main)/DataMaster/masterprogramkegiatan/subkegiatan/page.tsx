'use client'

import { FiHome } from "react-icons/fi"
import Table from "@/components/pages/datamaster/masterprogramkegiatan/subkegiatan/Table";
import { useState, useEffect } from "react";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";
import { generatePagination } from "@/components/global/PaginationNav";
import { LoadingBeat } from "@/components/global/Loading";
import { ButtonBlackBorder, ButtonSky } from "@/components/global/Button";
import { TbCirclePlus, TbSearch } from "react-icons/tb";


const SubKegiatan = () => {
    const { branding } = useBrandingContext();

    const [Page, setPage] = useState<number>(1);
    const [Limit, setLimit] = useState<number>(10);
    const [TotalPage, setTotalPage] = useState<number>(1);

    // Nilai yang sedang diketik user
    const [SearchNama, setSearchNama] = useState<string>("");
    const [SearchCode, setSearchCode] = useState<string>("");

    // Nilai filter yang sudah diterapkan melalui tombol Cari
    const [QueryNama, setQueryNama] = useState<string>("");
    const [QueryCode, setQueryCode] = useState<string>("");

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);

    const [Data, setData] = useState<any[]>([]);

    const token = getToken();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const params = new URLSearchParams();

                params.set("page", String(Page));
                params.set("limit", String(Limit));

                if (QueryCode.trim()) {
                    params.set("kode_subkegiatan", QueryCode.trim());
                }

                if (QueryNama.trim()) {
                    params.set("nama_sub_kegiatan", QueryNama.trim());
                }

                const response = await fetch(
                    `${branding?.api_perencanaan}/sub_kegiatan/findall?${params.toString()}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();

                if (result.code === 200) {
                    setData(result.data.items ?? []);
                    setTotalPage(result.data.total_pages ?? 1);
                    setError(false);
                } else {
                    setData([]);
                    setTotalPage(1);
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
                setData([]);
                setTotalPage(1);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [
        Limit,
        Page,
        branding,
        token,
        QueryCode,
        QueryNama,
        FetchTrigger,
    ]);

    const handleSearch = () => {
        setPage(1);
        setQueryCode(SearchCode);
        setQueryNama(SearchNama);
    };

    const handleResetSearch = () => {
        setSearchCode("");
        setSearchNama("");

        setQueryCode("");
        setQueryNama("");

        setPage(1);
    };

    const page_nav = generatePagination(Page, TotalPage);

    return (
        <>
            <div className="flex flex-wrap items-center">
                <a href="/" className="mr-1">
                    <FiHome />
                </a>

                <p className="mr-1">/ Data Master</p>
                <p className="mr-1">/ Master Program kegaitan</p>
                <p className="mr-1">/ Master Sub Kegiatan</p>
            </div>

            <div className="mt-3 rounded-xl shadow-lg border">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-col items-end">
                        <h1 className="uppercase font-bold">
                            Master Sub Kegiatan
                        </h1>
                    </div>
                </div>

                {/* Search + Button */}
                <div className="flex items-center justify-between mt-2">
                    <div className="ml-3 flex items-center gap-1">
                        <div className="flex items-center gap-1 p-1 rounded-lg border">
                            {/* Search Kode */}
                            <div className="flex px-2 items-center">
                                <TbSearch className="absolute ml-4 text-slate-500" />

                                <input
                                    type="text"
                                    placeholder="Cari dengan kode"
                                    value={SearchCode}
                                    onChange={(e) =>
                                        setSearchCode(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                    className="py-1 pl-10 pr-2 border rounded-lg border-gray-300"
                                />
                            </div>

                            {/* Search Nama */}
                            <div className="flex px-2 items-center">
                                <TbSearch className="absolute ml-4 text-slate-500" />

                                <input
                                    type="text"
                                    placeholder="Cari dengan nama"
                                    value={SearchNama}
                                    onChange={(e) =>
                                        setSearchNama(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                    className="py-1 pl-10 pr-2 border rounded-lg border-gray-300"
                                />
                            </div>

                            {/* Cari */}
                            <ButtonBlackBorder onClick={handleSearch}>
                                Cari
                            </ButtonBlackBorder>

                            {/* Reset */}
                            {(SearchCode || SearchNama) && (
                                <ButtonBlackBorder
                                    onClick={handleResetSearch}
                                >
                                    Reset
                                </ButtonBlackBorder>
                            )}
                        </div>
                    </div>

                    <ButtonSky
                        className="flex items-center gap-1 m-2"
                    >
                        <TbCirclePlus />
                        Tambah Sub Kegiatan
                    </ButtonSky>
                </div>

                {/* Table */}
                {Loading ? (
                    <LoadingBeat />
                ) : (
                    <Table
                        data={Data}
                        fetchTrigger={() =>
                            setFetchTrigger((prev) => !prev)
                        }
                        error={Error}
                    />
                )}

                {/* Pagination */}
                <div className="flex gap-2 px-2 pb-4 mt-1 w-full items-end justify-center rounded-b-lg">
                    {page_nav.map((item, index) =>
                        item === "..." ? (
                            <span key={index}>...</span>
                        ) : (
                            <button
                                key={index}
                                onClick={() => setPage(Number(item))}
                                className={`py-1 px-3 rounded-full ${Page === Number(item)
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 hover:bg-blue-300 hover:text-white"
                                    }`}
                            >
                                {item}
                            </button>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default SubKegiatan;
