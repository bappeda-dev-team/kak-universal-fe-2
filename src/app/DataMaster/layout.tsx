'use client'

import { useBrandingContext } from "@/context/BrandingContext";
import { IsLoadingBranding } from "@/components/global/Loading";
import ForbiddenPage from "../forbidden";

interface DataMasterLayout {
    children: React.ReactNode;
}

export default function DataMasterLayout({
    children
}: DataMasterLayout) {

    const { LoadingBranding, branding } = useBrandingContext();

    if (LoadingBranding) {
        return <IsLoadingBranding />;
    } else {
        if (branding?.user?.roles == "super_admin") {
            return <>{children}</>
        } else {
            return <ForbiddenPage />
        }
    }
}