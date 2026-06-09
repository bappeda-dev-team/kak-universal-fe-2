import { getToken } from "@/components/lib/Cookie";
import type { KunciPkRequest } from "./pk-opd-types";
import { useBrandingContext } from '@/context/BrandingContext';

export async function kunciPk(
    request: KunciPkRequest
): Promise<void> {
    const { branding } = useBrandingContext()

    const token = getToken();

    const response = await fetch(
        `${branding.api_perencanaan}/pk_opd/kunci_pk`,
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
