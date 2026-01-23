'use client'

import TableIsuStrategis from './TableIsuStrategis';
import TablePermasalahan from './TablePermasalahan';
import TableBidangUrusan from './TableBidangUrusan';
import { useBrandingContext } from '@/context/BrandingContext';
import { FiHome } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { OpdTahunNull, TahunNull } from '@/components/global/OpdTahunNull';
import { getUser, getPeriode, getToken, setCookie } from '@/components/lib/Cookie';

interface Periode {
    value: number;
    label: string;
    id: number;
    tahun_awal: string;
    tahun_akhir: string;
    jenis_periode: string;
    tahun_list: string[];
}

const IsuStrategis = () => {

    const { branding } = useBrandingContext()
    const tahun = branding?.tahun ? branding?.tahun.value : 0;
    const [User, setUser] = useState<any>(null);
    const token = getToken();

    useEffect(() => {
        const fetchUser = getUser();
        if (fetchUser) {
            setUser(fetchUser.user);
        }
    }, []);

    if (User?.roles == "super_admin") {
        if (branding?.opd?.value === undefined || branding?.tahun?.value === undefined) {
            return (
                <OpdTahunNull />
            )
        }
    } else if (User?.roles != "super_admin") {
        if (branding?.tahun?.value == undefined) {
            return (
                <TahunNull />
            )
        }
    } else if (User?.roles != "super_admin" || User?.roles != "admin_opd" || User?.roles != 'reviewer') {
        return (
            <h1>403 Forbidden Access for {User?.roles || "this role"}</h1>
        )
    }

    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan OPD</p>
                <p className="mr-1">/ Renstra</p>
                <p className="mr-1">/ Isu Strategis</p>
                <p>/ Isu Strategis</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-wrap items-end">
                        <h1 className="uppercase font-bold">Isu Strategis</h1>
                        <h1 className="uppercase font-bold ml-1 text-emerald-500">{branding?.tahun?.label}</h1>
                    </div>
                </div>
                <p className='text-sm italic text-gray-400 ml-3 mt-2'>*data permasalahan per tahun {tahun} (header)</p>
                <TablePermasalahan
                    tahun={tahun}
                    kode_opd={User?.roles == 'super_admin' ? branding?.opd?.value : User?.kode_opd}
                />
                <TableIsuStrategis />
            </div>
        </>
    )
}

export default IsuStrategis;