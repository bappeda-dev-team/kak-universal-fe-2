'use client'

import { useState, useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { useBrandingContext } from "@/context/BrandingContext";
import TableTujuan from "../../comp/TableTujuan";
import Select from 'react-select';
import { Periode } from "@/types";
import { getToken, getPeriode, setCookie } from "@/components/lib/Cookie";

const RKPDRankirTujuanPage = () => {

    const { branding } = useBrandingContext();

    const token = getToken();
    const [Periode, setPeriode] = useState<Periode | null>(null);
    const [PeriodeOption, setPeriodeOption] = useState<Periode[]>([]);

    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchPeriode = getPeriode();
        if (fetchPeriode.periode) {
            const data = {
                value: fetchPeriode.periode.value,
                label: fetchPeriode.periode.label,
                id: fetchPeriode.periode.value,
                tahun_awal: fetchPeriode.periode.tahun_awal,
                tahun_akhir: fetchPeriode.periode.tahun_akhir,
                jenis_periode: fetchPeriode.periode.jenis_periode,
                tahun_list: fetchPeriode.periode.tahun_list
            }
            setPeriode(data);
        }
    }, []);

    const fetchPeriode = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/periode/findall`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            const hasil = result.data;
            const data = hasil.map((item: any) => ({
                value: item.id,
                label: `${item.tahun_awal} - ${item.tahun_akhir} (${item.jenis_periode})`,
                tahun_awal: item.tahun_awal,
                tahun_akhir: item.tahun_akhir,
                jenis_periode: item.jenis_periode,
                tahun_list: item.tahun_list,
            }));
            setPeriodeOption(data);
        } catch (err) {
            console.error("error fetch periode", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan Pemda</p>
                <p className="mr-1">/ RKPD</p>
                <p className="mr-1">/ Rankir</p>
                <p className="mr-1">/ Tujuan Pemda</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-wrap items-end">
                        <h1 className="uppercase font-bold">Rankir</h1>
                        <h1 className="uppercase font-bold ml-1">Tujuan Pemda</h1>
                        {Periode &&
                            <h1 className="uppercase font-bold ml-1">{Periode?.jenis_periode || ""}</h1>
                        }
                    </div>
                    <Select
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                borderRadius: '8px',
                                minWidth: '200.562px',
                                minHeight: '38px'
                            })
                        }}
                        onChange={(option) => {
                            setPeriode(option);
                            setCookie("periode", JSON.stringify(option));
                        }}
                        options={PeriodeOption}
                        isClearable
                        isLoading={Loading}
                        placeholder="Pilih Periode ..."
                        value={Periode}
                        isSearchable
                        onMenuOpen={() => {
                            fetchPeriode();
                        }}
                    />
                </div>
                {Periode ?
                    <TableTujuan menu="rankhir" tahun={branding?.tahun?.value || 0} jenis_periode={Periode?.jenis_periode || ""}/>
                    :
                    <div className="m-5">
                        <h1>Pilih Periode terlebih dahulu</h1>
                    </div>
                }
            </div>
        </>
    )
}

export default RKPDRankirTujuanPage;
