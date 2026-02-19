import { User } from "@/entities/users/users.type";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import Link from "next/link";
import { DeleteUserForm } from "../../delete/ui/delete-user-form";
import { Plus } from "lucide-react";
import { UsersFilters } from "./filters";
import { Sort } from "./sort";
import { UsersPagination } from "./paginate";

interface Props {
    users: User[];
    meta?: any;
};

export function UsersTable({ users, meta }: Props) {
    return (
        <div className="py-8 flex-1 flex flex-col overflow-hidden">
            <div className="w-full flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <UsersFilters />
                    <div className="flex items-center gap-2">
                        <div>
                            <Sort />
                        </div>
                        <Link href={APP_ROUTES.ADMIN.USER.CREATE()} className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
                            <Plus size={14} />
                            Добавить
                        </Link>
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-[#0e0e11]/90 backdrop-blur-md z-10 border-b border-white/5">
                            <tr>
                                <th className="py-4 px-6 text-xs font-medium text-zinc-500 uppercase tracking-wider">Изображение</th>
                                <th className="py-4 px-6 text-xs font-medium text-zinc-500 uppercase tracking-wider">Имя</th>
                                <th className="py-4 px-6 text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
                                <th className="py-4 px-6 text-xs font-medium text-zinc-500 uppercase tracking-wider">Роль</th>
                                <th className="py-4 px-6 text-xs font-medium text-zinc-500 uppercase tracking-wider">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-white/5">
                            {users.map((user, key) => (
                                <tr key={key} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 px-6">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.fullName} className="w-10 h-10 object-cover rounded-full border border-white/10" />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full text-sm text-white bg-gray-600">N/A</div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">{user.fullName}</td>
                                    <td className="py-4 px-6">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN"
                                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                            : "bg-green-500/10 text-green-400 border border-green-500/20"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-x-4">
                                            <Link href={APP_ROUTES.ADMIN.USER.UPDATE(user.id)} className="">Редактировать</Link>
                                            <DeleteUserForm userId={user.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {meta && <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <UsersPagination totalPages={meta?.totalPages} />
                </div>}
            </div>
        </div>
    );
}  