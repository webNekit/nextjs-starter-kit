import { SortOrder, UserRole } from '@/entities/users/users.type';
import { createSearchParamsCache, parseAsInteger, parseAsStringEnum } from 'nuqs/server';

export const usersQueryParamsParsers = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    role: parseAsStringEnum<UserRole>(Object.values(UserRole)),
    sort: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(SortOrder.DESC),
};

export const usersQueryParamsCache = createSearchParamsCache(usersQueryParamsParsers);