'use client'

import PageCardLayout from "@/components/global/PageCardLayout";
import { PegawaiResponse, getPegawais } from './service';
import { useState, useEffect } from "react";
import Table from "./table";

export default function Page() {
    const [pegawais, setPegawais] = useState<PegawaiResponse[]>([])

    useEffect(() => {
        getPegawais()
            .then(setPegawais)
            .catch(console.error)
    }, []);

    return (
        <PageCardLayout
            breadcrumbs={["Data Master", "History Pegawai"]}
            title="History Pegawai"
        >
            <Table pegawais={pegawais} />
        </PageCardLayout>
    )

}
