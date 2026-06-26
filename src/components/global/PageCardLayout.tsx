import { ReactNode } from "react";
import { FiHome } from "react-icons/fi";

type PageCardLayoutProps = {
    breadcrumbs: string[];
    children: ReactNode;
    title: string;
}

type PageNavHeaderProps = {
    breadcrumbs: string[];
}

export default function PageCardLayout({ breadcrumbs, children, title }: PageCardLayoutProps) {
    return (
        <div>
            <PageNavHeader breadcrumbs={breadcrumbs} />
            <div className="mt-3 rounded-xl shadow-lg border">
                <div className="flex items-center justify-between border-b px-5 py-5">
                    <div className="flex flex-col items-end">
                        <h1 className="uppercase font-bold">{title}</h1>
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
