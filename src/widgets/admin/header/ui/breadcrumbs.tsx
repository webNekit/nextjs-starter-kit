"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getBreadcrubmsLabel } from "@/shared/config/breadcrumbs";

export function Breadcrumbs() {
    const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    
    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return {
            href,
            isLast,
            label: getBreadcrubmsLabel(segment),
        };
    });

    const handleBack = () => {
        router.back();
    }

    return (
        <div className="flex items-center gap-4">
            <button title="Вернуться назад" type="button" onClick={handleBack} className="w-10 h-10 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center">
                    <ArrowLeft size={18} />
                </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {index > 0 && (
                            <ChevronRight size={14} />
                        )}
                        {crumb.isLast? (
                        <span className="uppercase text-white font-medium tracking-wide">
                            {crumb.label}
                        </span>
                        ) : (
                            <Link href={crumb.href} className="uppercase text-zinc-500 hover:text-zinc-300 transition-colors tracking-wide">{crumb.label}</Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}