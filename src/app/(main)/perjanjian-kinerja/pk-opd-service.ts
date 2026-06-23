import type { KunciPkRequest, PkTerkunciResponse, WebResponse } from "./pk-opd-types";

type kunciPkProps = {
    request: KunciPkRequest,
    apiUrl: string,
    token: string | null
}

export async function kunciPk({ request, apiUrl, token }: kunciPkProps): Promise<PkTerkunciResponse> {
    const response = await fetch(
        `${apiUrl}/pk_opd/kunci_pk`,
        {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        }
    )
    // TODO: cleanup error message
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? "Gagal mengunci PK")
    }

    const result: WebResponse<PkTerkunciResponse> = await response.json()
    return result.data
}

export async function bukaKunciPk({ request, apiUrl, token }: kunciPkProps): Promise<PkTerkunciResponse> {
    const response = await fetch(
        `${apiUrl}/pk_opd/buka_kunci_pk`,
        {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        }
    )
    // TODO: cleanup error message
    if (!response.ok) {
        // const error = await response.json()
        throw new Error("Gagal membuka kunci PK")
    }

    const result: WebResponse<PkTerkunciResponse> = await response.json()
    return result.data
}
