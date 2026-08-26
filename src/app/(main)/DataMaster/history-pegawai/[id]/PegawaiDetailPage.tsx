'use client'

import Badge from "@/components/global/Badge";
import RiwayatJabatanPegawai from "./RiwayatJabatanPegawai";
import { MutasiPegawaiRequest, OptionResponse, PegawaiDetailResponse } from "../types";
import ActionDropdown from "@/components/global/ActionDropdown";
import TambahJabatanDialog from "../components/TambahJabatanDialog"
import MutasiPegawaiDialog from "../components/MutasiPegawaiDialog"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mutasiPegawaiAction, tambahJabatanAction } from "./actions";

type PegawaiDetailPageProps = {
    pegawai: PegawaiDetailResponse
    masterJabatans: OptionResponse[];
    opds: OptionResponse[];
    jenisPenugasans: OptionResponse[];
}

export default function PegawaiDetailPage({ pegawai, masterJabatans, opds, jenisPenugasans }: PegawaiDetailPageProps) {
    const [mutasiDialogOpen, setMutasiDialogOpen] = useState<boolean>(false);
    const [tambahJabatanDialogOpen, setTambahJabatanDialogOpen] = useState<boolean>(false);
    const router = useRouter();

    if (pegawai == null) {
        return (
            <div>
                Yah hilang :(
            </div>
        );
    }

    // TODO: get from pegawai response
    const jabatanAktif = pegawai.jabatan_pegawais.find(
        (jabatan) => jabatan.tmt_akhir === null
    );

    const tidakPunyaJabatan = pegawai.jabatan_pegawais.length === 0

    const actions = tidakPunyaJabatan
        ? [
            {
                label: "Tambah Jabatan",
                onClick: () => {
                    // buka dialog tambah jabatan
                    setTambahJabatanDialogOpen(true)
                },
            },
        ]
        : [
            {
                label: "Mutasi",
                onClick: () => {
                    setMutasiDialogOpen(true);
                },
            },
            {
                label: "Tambah PLT",
                onClick: () => { },
            },
            {
                label: "Tambah PLH",
                onClick: () => { },
            },
            {
                label: "Nonaktifkan Pegawai",
                danger: true,
                onClick: () => { },
            },
        ];

    return (
        <>
            <div className="space-y-6">
                <div className="rounded-lg border bg-white p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {pegawai.nama_pegawai}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {pegawai.nip}
                            </p>
                        </div>

                        <ActionDropdown
                            actions={actions}
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">Jabatan Aktif</p>
                            <p>{jabatanAktif?.nama_jabatan ?? "-"}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">OPD</p>
                            <p>{jabatanAktif?.nama_opd ?? "-"}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            {jabatanAktif ? (
                                <Badge color="green">Aktif</Badge>
                            ) : (
                                <Badge color="gray">Tidak Aktif</Badge>
                            )}
                        </div>
                    </div>
                </div>

                <RiwayatJabatanPegawai jabatanPegawais={pegawai.jabatan_pegawais} />
            </div>
            <MutasiPegawaiDialog
                open={mutasiDialogOpen}
                pegawai={pegawai}
                masterJabatans={masterJabatans}
                opds={opds}
                jenisPenugasans={jenisPenugasans}
                onClose={() => setMutasiDialogOpen(false)}
                onSubmit={async (request: MutasiPegawaiRequest) => {
                    await mutasiPegawaiAction(request)

                    setMutasiDialogOpen(false)

                    router.refresh()
                }
                }
            />
            <TambahJabatanDialog
                open={tambahJabatanDialogOpen}
                pegawai={pegawai}
                masterJabatans={masterJabatans}
                opds={opds}
                jenisPenugasans={jenisPenugasans}
                onClose={() => setTambahJabatanDialogOpen(false)}
                onSubmit={async (request: MutasiPegawaiRequest) => {
                    await tambahJabatanAction(request)

                    setTambahJabatanDialogOpen(false)

                    router.refresh()
                }
                }
            />
        </>
    );
}
