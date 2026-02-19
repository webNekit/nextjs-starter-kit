import { SearchParams } from "nuqs/server";
import { UsersPagination, UsersTable } from "@/features/users";
import { usersQueryParamsCache } from "@/features/users/table/model/query-params";
import { usersService } from "@/entities/users/users.service";
import { StatsCard } from "@/widgets/admin/stats";


interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function AdminUsersIndexPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const params = usersQueryParamsCache.parse(resolvedSearchParams);
  const [usersResponse, stats] = await Promise.all([
    usersService.getAll({ ...params, role: params.role ?? undefined }),
    usersService.getStats()
  ]);
  const { data: users, meta } = usersResponse;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title={"Пользователи"} value={stats.users.total} color={'blue'} />
        <StatsCard title={"Администраторы"} value={stats.admins.total} />
        <StatsCard title={"Всего пользователей"} value={stats.total.total} />
      </div>
      <UsersTable users={users || []} meta={meta || null} />
    </>
  );
}
