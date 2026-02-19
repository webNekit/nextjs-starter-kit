import { User } from "@/entities/users/users.type";
import { Breadcrumbs } from "./breadcrumbs";

interface Props {
    user?: User | null;
}

export function Header({ user }: Props) {
    return (
        <header className="sticky top-0 z-30 px-8 min-h-18 flex items-center justify-between bg-white/[0.02] backdrop-blur-md border-b border-white/5 ">
            <Breadcrumbs />
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-white/80 text-sm font-medium overflow-hidden">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.fullName} className="object-cover w-full h-full" />
                    ) : (
                        user?.email?.slice(0, 2).toUpperCase() ?? "?"
                    )}
                </div>
                <div className="grid">
                    <span className="text-base font-medium text-white">
                        {user?.fullName}
                    </span>
                    <span className="text-sm text-zinc-500">
                        {user?.email}
                    </span>
                </div>
            </div>
        </header>
    );
}