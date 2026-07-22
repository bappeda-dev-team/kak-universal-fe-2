'use client'

import { FiHome } from "react-icons/fi"
import Table from "@/components/pages/datamaster/masterprogramkegiatan/subkegiatan/Table";
import { useState, useEffect } from "react";
import { useBrandingContext } from "@/context/BrandingContext";
import { getToken } from "@/components/lib/Cookie";
import { generatePagination } from "@/components/global/PaginationNav";
import { LoadingBeat } from "@/components/global/Loading";

const subkegiatan = () => {

    const { branding } = useBrandingContext();
    const [Page, setPage] = useState<number>(1);
    const [Limit, setLimit] = useState<number>(10);
    const [TotalPage, setTotalPage] = useState<number>(1);

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
    }, [Limit, Page, branding, token, FetchTrigger]);

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

export default subkegiatan;