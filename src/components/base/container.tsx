import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: Props) {
    return(
        <div className={cn(className, "px-4 mx-auto w-full max-w-6xl")}>
            {children}
        </div>
    );
}