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
    const [SearchNama, setSearchNama] = useState<string>("");
    const [SearchCode, setSearchCode] = useState<string>("");

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);

    const [Data, setData] = useState<any>([]);

    const token = getToken();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${branding?.api_perencanaan}/sub_kegiatan/findall?page=${Page}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const data = result.data.items;
                if (result.code === 200) {
                    setData(data);
                    setError(false);
                    setTotalPage(result.data.total_pages);
                } else {
                    setError(true);
                    setData([]);
                }
            } catch (err) {
                setError(true);
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [Limit, Page, branding, token, SearchCode, SearchNama, FetchTrigger]);

    const page_nav = generatePagination(Page, TotalPage);

    return (
        <>
            <div className="flex flex-wrap items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Data Master</p>
                <p className="mr-1">/ Master Program kegaitan</p>
                <p className="mr-1">/ Master Sub Kegiatan</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex flex-wrap items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-col items-end">
                        <h1 className="uppercase font-bold">Master Sub Kegiatan</h1>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="ml-3 flex items-center gap-1">
                        <div className="flex items-center gap-1 p-1 rounded-lg border">
                            <div className="flex px-2 items-center">
                                <TbSearch className="absolute ml-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Cari dengan kode"
                                    // value={searchQuery}
                                    onChange={(e) => setSearchCode(e.target.value)}
                                    className="py-1 pl-10 pr-2 border rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex px-2 items-center">
                                <TbSearch className="absolute ml-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Cari dengan nama"
                                    // value={searchQuery}
                                    onChange={(e) => setSearchNama(e.target.value)}
                                    className="py-1 pl-10 pr-2 border rounded-lg border-gray-300"
                                />
                            </div>
                            <ButtonBlackBorder onClick={() => setFetchTrigger((prev) => !prev)}>
                                Cari
                            </ButtonBlackBorder>
                        </div>
                    </div>
                    <ButtonSky
                        // onClick={() => setModalTambah(true)}
                        className="flex items-center gap-1 m-2"
                    >
                        <TbCirclePlus />
                        Tambah Sub Kegiatan
                    </ButtonSky>
                </div>
                {Loading ?
                    <LoadingBeat />
                    :
                    <Table
                        data={Data}
                        fetchTrigger={() => setFetchTrigger((prev) => !prev)}
                        error={Error}
                    />
                }
                <div className="flex gap-2 px-2 pb-4 mt-1 w-full items-end justify-center rounded-b-lg">
                    {page_nav.map((item, index) =>
                        item === "..." ? (
                            <span key={index}>...</span>
                        ) : (
                            <button
                                key={index}
                                onClick={() => setPage(Number(item))}
                                className={`py-1 px-3 rounded-full
                                    ${Page === item ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-300 hover:text-white"}`
                                }
                            >
                                {item}
                            </button>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default SubKegiatan;