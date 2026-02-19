import { usersService } from "@/entities/users/users.service";

export default async function ProfilePage() {
  const { data: user } = await usersService.getMe();
  return (
    <div className="max-w-5xl w-full mx-auto py-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium text-white tracking-tight">Личный кабинет</h1>
          <p className="text-zinc-500 mt-1">Здесь собрана информация о Вашем профиле</p>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-50"></div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                {user.avatar ? (
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-b from-white/10 to-transparent border border-white/5 shadow-2xl relative">
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                ) : ""}
              </div>

              <div className="text-center sm:text-left space-y-1 pt-2">
                <h2 className="text-xl font-medium text-white">{user.fullName}</h2>
                <p className="text-zinc-500 text-sm">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}