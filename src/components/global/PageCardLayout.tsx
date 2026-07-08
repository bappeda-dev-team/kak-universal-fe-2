import { ReactNode } from "react";
import { FiHome } from "react-icons/fi";
import Link from "next/link";

type PageCardLayoutProps = {
    breadcrumbs: string[];
    children: ReactNode;
    title: string;
    backHref?: string;
}

type PageNavHeaderProps = {
    breadcrumbs: string[];
}

export default function PageCardLayout({ breadcrumbs, children, title, backHref }: PageCardLayoutProps) {
    return (
        <div>
            <PageNavHeader breadcrumbs={breadcrumbs} />
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex items-center gap-3">
                        {backHref && (
                            <Link
                                href={backHref}
                                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
                            >
                                ←
                            </Link>
                        )}
                        <h1 className="font-bold uppercase">
                            {title}
                        </h1>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export function PageNavHeader({ breadcrumbs }: PageNavHeaderProps) {
    return (
        <div className="flex items-center">
            <a href="/" className="mr-1"><FiHome /></a>
            {breadcrumbs.map((path, index) => (
                <p key={index} className="mr-1">/ {path}</p>
            ))}
        </div>
    )
}
