'use client'

import { TableAsn } from '@/components/pages/rincianbelanja/Table';
import { FiHome } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getOpdTahun, getUser } from '@/components/lib/Cookie';
import Maintenance from '@/components/global/Maintenance';

const IsuStrategis = () => {

    const [Tahun, setTahun] = useState<any>(null);
    const [User, setUser] = useState<any>(null);

    useEffect(() => {
        const data = getOpdTahun();
        const fetchUser = getUser();
        if(fetchUser){
            setUser(fetchUser.user);
        }
        if(data){
            if(data.tahun){
                const tahun_value = {
                    value: data.tahun.value,
                    label: data.tahun.label,
                }
                setTahun(tahun_value);
            }
        }
    },[]);

    return(
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan OPD</p>
                <p className="mr-1">/ Permasalahan</p>
                <p>/ Isu Strategis</p>
            </div>
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex flex-wrap items-center justify-between border-b px-5 py-5">
                    <div className="flex items-center gap-1">
                        <h1 className="font-bold text-xl uppercase">Isu Strategis</h1>
                        <h1 className="font-bold text-xl uppercase text-green-500">{Tahun?.label || ''}</h1>
                    </div>
                </div>
                <div className="m-3">
                    {/* <TableAsn 
                        tahun={Tahun?.value}
                        nip={User?.nip}
                    /> */}
                    <Maintenance />
                </div>
            </div>
        </>
    )
}

export default IsuStrategis;