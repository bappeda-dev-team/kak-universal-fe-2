"use client";

import { useBrandingContext } from "@/context/BrandingContext";
import { FiHome } from "react-icons/fi";
import { useEffect, useState } from "react";
import Table from "./comp/Table";
import { LoadingClip } from "@/components/global/Loading";
import { getUser, getToken } from "@/components/lib/Cookie";
import { Laporan } from "./type";
import { AlertNotification } from "@/components/global/Alert";
import { useRouter } from "next/navigation";
import { ButtonBlackBorder } from "@/components/global/Button";
import { TbPrinter } from "react-icons/tb";

const LaporanInovasiPage = () => {
    const { branding } = useBrandingContext();
    const router = useRouter();

    const tahun = branding?.tahun?.value || 0;
    const token = getToken();

    const [Data, setData] = useState<Laporan | null>(null);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Error, setError] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const [User, setUser] = useState<any>(null);
    const [UserReady, setUserReady] = useState<boolean>(false);

    const isSuperAdmin = User?.roles.some((role: string) => ["super_admin"].includes(role))

    const kode_opd =
        isSuperAdmin
            ? branding?.opd?.value
            : User?.kode_opd;

    const nama_opd =
        isSuperAdmin
            ? branding?.opd?.label
            : User?.nama_opd;

    // ==============================
    // FETCH USER
    // ==============================

    useEffect(() => {
        const fetchUser = getUser();

        if (fetchUser) {
            setUser(fetchUser.user);
        }

        setUserReady(true);
    }, []);

    // ==============================
    // FETCH LAPORAN
    // ==============================

    useEffect(() => {
        if (!UserReady || !branding || !tahun) return;

        if (!kode_opd) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const FetchData = async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(
                    `${branding.api_perencanaan}/laporan/crosscutting/findall/${kode_opd}/${tahun}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();

                if (!isMounted) return;

                if (result.code === 200) {
                    setData(result.data ?? null);
                } else if (result.code === 401) {
                    AlertNotification(
                        "Login Kembali",
                        "",
                        "warning",
                        2000
                    );

                    router.push("/login");
                } else {
                    setData(null);
                    setError(true);

                    AlertNotification(
                        "Error",
                        result.message ?? "Gagal mengambil laporan crosscutting",
                        "error",
                        2000
                    );
                }
            } catch (err) {
                console.error("Fetch laporan crosscutting:", err);

                if (isMounted) {
                    setData(null);
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        FetchData();

        return () => {
            isMounted = false;
        };
    }, [
        UserReady,
        branding,
        kode_opd,
        tahun,
        token,
        router,
        FetchTrigger
    ]);

    // ==============================
    // LOADING
    // ==============================

    if (!UserReady || Loading) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <LoadingClip className="mx-5 py-5" />
            </div>
        );
    }

    // ==============================
    // ERROR
    // ==============================

    if (Error) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="text-red-500 font-bold mx-5 py-5">
                    Error, Periksa koneksi internet atau database server,
                    jika error berlanjut silakan hubungi tim developer
                </h1>
            </div>
        );
    }

    // ==============================
    // NO OPD
    // ==============================

    if (!kode_opd) {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="mx-5 py-5">
                    Silakan pilih OPD terlebih dahulu.
                </h1>
            </div>
        );
    }

    // ==============================
    // RENDER
    // ==============================

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1">
                    <FiHome />
                </a>
                <p className="mr-1">/ Laporan</p>
                <p className="mr-1">/ Crosscutting</p>
            </div>

            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-wrap items-end">
                        <h1 className="uppercase font-bold">
                            Crosscutting
                        </h1>
                        <h1 className="uppercase font-bold ml-1">
                            {tahun}
                        </h1>
                    </div>

                    <h2 className="text-sm max-w-[500px]">
                        {nama_opd || ""}
                    </h2>

                    <ButtonBlackBorder
                        // onClick={handleCetakPDF}
                        className="flex items-center gap-1"
                    >
                        <TbPrinter />
                        Cetak PDF
                    </ButtonBlackBorder>
                </div>

                <div className="mx-3 mb-3">
                    <Table
                        Data={Data}
                        kode_opd={kode_opd}
                        tahun={tahun}
                        onSuccess={() => setFetchTrigger((prev) => !prev)}
                    />
                </div>
            </div>
        </>
    );
};

export default LaporanInovasiPage;
