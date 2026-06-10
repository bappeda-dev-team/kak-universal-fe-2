import type { KunciPkRequest } from "./pk-opd-types";

type kunciPkProps = {
    request: KunciPkRequest,
    apiUrl: string,
    token: string | null
}

export async function kunciPk({ request, apiUrl, token }: kunciPkProps): Promise<void> {
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
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? "Gagal mengunci PK")
    }
}
