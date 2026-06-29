import { useState } from "react";
import type { PegawaiDetailResponse, OptionResponse, MutasiPegawaiRequest } from "../types";
import Select, { SingleValue } from "react-select";

type MutasiPegawaiDialogProps = {
    open: boolean;
    pegawai: PegawaiDetailResponse;

    masterJabatans: OptionResponse[];
    opds: OptionResponse[];
    jenisPenugasans: OptionResponse[];

    onClose: () => void;
    onSubmit: (request: MutasiPegawaiRequest) => Promise<void>;
};

export default function MutasiPegawaiDialog({
    open,
    pegawai,
    masterJabatans,
    opds,
    jenisPenugasans,
    onClose,
    onSubmit,
}: MutasiPegawaiDialogProps) {

    const [masterJabatan, setMasterJabatan] = useState<OptionResponse | null>(null);
    const [opd, setOpd] = useState<OptionResponse | null>(null);
    const [jenisPenugasan, setJenisPenugasan] = useState<OptionResponse | null>(null);
    const [tmtMulai, setTmtMulai] = useState("");

    if (!open) {
        return null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const jenisPen = jenisPenugasan === null ? "BELUM_DIATUR" : jenisPenugasan.value

        await onSubmit({
            pegawai_id: pegawai.id,
            master_jabatan_id: Number(masterJabatan?.value),
            opd_id: Number(opd?.value),
            jenis_penugasan: jenisPen,
            tmt_mulai: tmtMulai,
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-xl rounded-lg bg-white">

                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">
                        Mutasi Pegawai
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div className="rounded-md border bg-gray-50 p-4">
                        <div className="font-medium">
                            {pegawai.nama_pegawai}
                        </div>

                        <div className="text-sm text-gray-500">
                            {pegawai.nip}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Jabatan Baru
                        </label>

                        <Select
                            options={masterJabatans}
                            value={masterJabatan}
                            onChange={(option: SingleValue<OptionResponse>) =>
                                setMasterJabatan(option)
                            }
                            placeholder="Pilih Jabatan"
                            isSearchable
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            OPD Baru
                        </label>

                        <Select
                            options={opds}
                            value={opd}
                            onChange={(option: SingleValue<OptionResponse>) =>
                                setOpd(option)
                            }
                            placeholder="Pilih OPD"
                            isSearchable
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Jenis Penugasan
                        </label>

                        <Select
                            options={jenisPenugasans}
                            value={jenisPenugasan}
                            onChange={(option: SingleValue<OptionResponse>) =>
                                setJenisPenugasan(option)
                            }
                            placeholder="Pilih Jenis Penugasan"
                            isSearchable={false}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            TMT Mulai
                        </label>

                        <input
                            required
                            type="date"
                            value={tmtMulai}
                            onChange={(e) => setTmtMulai(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border px-4 py-2"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Simpan
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
