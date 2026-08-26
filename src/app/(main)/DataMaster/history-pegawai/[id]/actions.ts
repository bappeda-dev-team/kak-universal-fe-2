"use server";

import { api } from "../service";
import type { MutasiPegawaiRequest } from "../types";

export async function mutasiPegawaiAction(
    request: MutasiPegawaiRequest
) {
    await api.jabatanPegawai.mutasiPegawai(request);
}

export async function tambahJabatanAction(
    request: MutasiPegawaiRequest
) {
    await api.jabatanPegawai.tambahJabatan(request);
}
