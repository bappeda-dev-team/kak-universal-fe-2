import PageCardLayout from "@/components/global/PageCardLayout";
import { api } from './service';
import Table from "./table";

export default async function Page() {
    try {
        const pegawais = await api.pegawai.pegawais();

        return (
            <PageCardLayout
                breadcrumbs={["Data Master", "History Pegawai"]}
                title="History Pegawai"
            >
                <Table pegawais={pegawais} />
            </PageCardLayout>
        );
    } catch (error) {
        const message = "Terjadi kesalahan";

        return (
            <PageCardLayout
                breadcrumbs={["Data Master", "History Pegawai"]}
                title="History Pegawai"
            >
                <div className="p-4 text-red-500">
                    {message}
                </div>
            </PageCardLayout>
        );
    }
}
