'use client'

import { ButtonBlackBorder } from "@/components/global/Button";
import { TbPrinter } from "react-icons/tb";
import { useParams } from "next/navigation";
import { PohonPemdaCetak } from "./comp/PohonPemdaCetak";
import { useState, useEffect } from "react";
import { getToken } from "@/components/lib/Cookie";
import { LoadingClip } from "@/components/global/Loading";

const CetakPokinTematik = () => {

    const { id } = useParams();
    const [Pohon, setPohon] = useState<any>(null);
    const [Loading, setLoading] = useState<boolean>(false);

    const token = getToken();

    useEffect(() => {
        const fetchTematikKab = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            setLoading(true);
            try {
                let url = `${API_URL}/pohon_kinerja_admin/tematik/${id}`;
                const response = await fetch(`${url}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('terdapat kesalahan di koneksi backend');
                }
                const result = await response.json();
                if (result.code === 200) {
                    setPohon(result.data);
                } else {
                    setPohon(null);
                }
            } catch (err) {
                alert("error saat menampilkan pohon cetak")
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTematikKab();
    }, [id, token]);

    if (Loading) {
        return <LoadingClip />
    } else {
        return (
            <div className="flex flex-col p-1">
                <div className="flex items-center gap-1">
                    <ButtonBlackBorder className="flex items-center gap-1">
                        <TbPrinter />
                        Download
                    </ButtonBlackBorder>
                </div>
                <h1>Halaman Cetak Pokin</h1>
                {Pohon === null ? 
                    <h1>Pohon Tidak Tersedia</h1>
                :
                    <PohonPemdaCetak tema={Pohon} />
                }
            </div>
        )
    }
}

export default CetakPokinTematik;