'use client'

import { createContext, useContext } from "react"
import { getOpdTahun, getUser, UserInfo } from "@/components/lib/Cookie";
import { useState, useEffect } from "react";

interface OptionType {
    value: number;
    label: string;
}
interface OptionTypeString {
    value: string;
    label: string;
}

interface BrandingContextType {
    title: string;
    clientName: string;
    logo: string;
    LoadingBranding: boolean;
    branding: {
        title: string;
        client: string;
        logo: string;
        api_perencanaan: string;
        api_permasalahan: string;
        api_csf: string;
        tahun: OptionType | null;
        opd: OptionTypeString | null;
        user: UserInfo | null;
    }
}

const appName = process.env.NEXT_PUBLIC_APP_NAME || "";
const clientName = process.env.NEXT_PUBLIC_CLIENT_NAME || "";
const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";
const api_perencanaan = process.env.NEXT_PUBLIC_API_URL || "";
const api_csf = process.env.NEXT_PUBLIC_API_URL_CSF || "";
const api_permasalahan = process.env.NEXT_PUBLIC_API_URL_PERMASALAHAN || "";

// context
const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: Readonly<{ children: React.ReactNode; }>) {

    const [Tahun, setTahun] = useState<OptionType | null>(null);
    const [SelectedOpd, setSelectedOpd] = useState<OptionTypeString | null>(null);
    const [User, setUser] = useState<UserInfo | null>(null);

    const [Loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = getOpdTahun();

                if (data?.tahun) {
                    setTahun({
                        value: data.tahun.value,
                        label: data.tahun.label,
                    });
                }

                if (data?.opd) {
                    setSelectedOpd({
                        value: data.opd.value,
                        label: data.opd.label,
                    });
                }

                const result = await getUser();

                if (result) {
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Failed to initialize branding:", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <BrandingContext.Provider
            value={{
                title: appName,
                clientName: clientName,
                logo: logo,
                LoadingBranding: Loading,
                branding: {
                    title: appName,
                    client: clientName,
                    logo: logo,
                    api_perencanaan: api_perencanaan,
                    api_csf: api_csf,
                    api_permasalahan: api_permasalahan,
                    tahun: Tahun,
                    opd: SelectedOpd,
                    user: User

                }
            }}
        >
            {children}
        </BrandingContext.Provider>
    );
}

export function useBrandingContext() {
    const context = useContext(BrandingContext);
    if (context === undefined) {
        throw new Error("useBrandingContext must be used witihin a BrandingProvider")
    }
    return context;
}
