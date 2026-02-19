"use client"

import { useQueryState } from "nuqs";
import { usersQueryParamsParsers } from "../model/query-params";
import { Button } from "@/components/ui/button";

interface Props {
    totalPages: number;
};

export function UsersPagination({totalPages}: Props) {
    const [page, setPage] = useQueryState("page", usersQueryParamsParsers.page.withOptions({ shallow: false }));
    const currentPage = page || 1;
    const handleNextPage = () => {
        if (currentPage < totalPages) setPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setPage(currentPage - 1);
      };
    
      if (totalPages <= 1) return null;
    return(
        <div className="w-full flex items-center justify-end gap-x-2">
            <div className="text-sm text-muted-foreground">Страница {currentPage} из {totalPages}</div>
            <div className="flex items-center gap-2">
                <button onClick={handlePrev} disabled={currentPage <= 1} className="px-3 py-1.5 rounded-lg border border-white/10 font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Назад</button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="px-3 py-1.5 rounded-lg border border-white/10 font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Вперед</button>
            </div>
        </div>
    );
}