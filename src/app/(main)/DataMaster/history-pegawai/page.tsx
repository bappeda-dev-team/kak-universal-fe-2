import PageCardLayout from "@/components/global/PageCardLayout";
import { api } from './service';
import Table from "./table";
import { PegawaiResponse } from "./types";

export default async function Page() {

    const pegawais: PegawaiResponse[] = await api.pegawai.pegawais();

    return (
        <PageCardLayout
            breadcrumbs={["Data Master", "History Pegawai"]}
            title="History Pegawai"
        >
            <Table pegawais={pegawais} />
        </PageCardLayout>
    )

}
