"use client";

import { useQueryState } from "nuqs";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usersQueryParamsParsers } from "../model/query-params";
import { SortOrder, UserRole } from "@/entities/users/users.type";

const ROLE_OPTIONS: { value: null | UserRole; label: string }[] = [
    { value: null, label: "Все роли" },
    { value: UserRole.USER, label: "Пользователи" },
    { value: UserRole.ADMIN, label: "Администраторы" },
];

interface Props {
    className?: string;
}

export function UsersFilters({ className }: Props) {
    const [role, setRole] = useQueryState("role", usersQueryParamsParsers.role.withOptions({ shallow: false }));
    const [sort, setSort] = useQueryState("sort", usersQueryParamsParsers.sort.withOptions({ shallow: false }));

    return (
        <div className="flex items-center gap-2">
            {ROLE_OPTIONS.map(({value, label}) => {
                const isActive = value === null ? !role : role === value;
                return (
                    <button key={value ?? "all"} onClick={() => setRole(value)} className={`px-3 py-1.5 rounded-lg text-sm text-white hover:bg-white/10 transition-colors shadow-sm cursor-pointer ${isActive ? 'border bg-white/5 border-white/10' : ''}`}>{label}</button>
                );
            })}
        </div>
    );
}