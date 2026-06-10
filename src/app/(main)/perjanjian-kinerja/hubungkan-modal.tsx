import { useMemo, useState } from "react"
import Select from 'react-select';
import { PkTerpilihProps } from "./pk-opd-types";

type SelectOption = {
    value: string
    label: string
    meta: RekinOption
}

export type RekinOption = {
    id: string
    rekin: string
    namaPegawai: string
    nipPegawai: string
}

type HubungkanModalProps = {
    open: boolean
    onClose: () => void
    onSubmit: (idRekinAtasan: string, selectedPk: PkTerpilihProps) => void
    rekinAtasanList: RekinOption[]
    selectedPk: PkTerpilihProps
}

export const HubungkanModal = ({
    open,
    onClose,
    onSubmit,
    rekinAtasanList,
    selectedPk,
}: HubungkanModalProps) => {
    const [selected, setSelected] = useState<SelectOption | null>(null)

    const options: SelectOption[] = useMemo(
        () =>
            rekinAtasanList.map((r) => ({
                value: r.id,
                label: `${r.namaPegawai} | ${r.nipPegawai} — ${r.rekin}`,
                meta: r,
            })),
        [rekinAtasanList]
    )

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl w-[500px] p-6 shadow-lg">
                <h2 className="text-lg font-bold mb-4">
                    Pilih Rencana Kinerja Atasan
                </h2>

                <Select
                    options={options}
                    value={selected}
                    onChange={(opt) => setSelected(opt)}
                    placeholder="Cari nama / NIP / rencana kinerja..."
                    isClearable
                    isSearchable
                    className="mb-4"
                />
                {/* PREVIEW */}
                {selected && (
                    <div className="border rounded p-3 bg-slate-50 text-sm mb-5">
                        <p className="font-semibold">{selected.meta.namaPegawai}</p>
                        <p className="text-slate-600">
                            NIP: {selected.meta.nipPegawai}
                        </p>
                        <p className="mt-2">{selected.meta.rekin}</p>
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Batal
                    </button>
                    <button
                        disabled={!selected}
                        onClick={() => selected && onSubmit(selected.value, selectedPk)}
                        className={`px-4 py-2 rounded text-white ${selected
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}
