import PageCardLayout from "@/components/global/PageCardLayout";
import { api } from "../service";
import PegawaiDetailPage from "./PegawaiDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    const [pegawai, masterJabatans, opds, jenisPenugasans] = await Promise.all([
        api.pegawai.pegawaiHistory(Number(id)),
        api.masterJabatan.options(),
        api.opd.options(),
        api.jabatanPegawai.jenisPenugasanOptions()
    ]);

    return (
        <PageCardLayout
            breadcrumbs={["Data Master", "History Pegawai", "Riwayat Jabatan"]}
            title="Detail Pegawai"
            backHref="/DataMaster/history-pegawai"
        >
            <PegawaiDetailPage
                pegawai={pegawai}
                masterJabatans={masterJabatans}
                opds={opds}
                jenisPenugasans={jenisPenugasans}
            />
        </PageCardLayout>
    );
}
