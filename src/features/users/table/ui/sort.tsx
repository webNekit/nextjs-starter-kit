"use client";

import { useQueryState } from "nuqs";
import { Funnel } from "lucide-react";
import { SortOrder } from "@/entities/users/users.type";
import { Container } from "@/components/base/container";
import { usersQueryParamsParsers } from "../model/query-params";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Sort() {
    const [sort, setSort] = useQueryState("sort", usersQueryParamsParsers.sort.withOptions({ shallow: false }));
    return(
        <Container>
            <Select value={sort} onValueChange={(val) => setSort(val as SortOrder)}>
                <SelectTrigger>
                    <SelectValue><Funnel size={16} /></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={SortOrder.DESC}>Сначала новые</SelectItem>
                    <SelectItem value={SortOrder.ASC}>Сначала старые</SelectItem>
                </SelectContent>
            </Select>
        </Container>
    );
}