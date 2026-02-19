import { STARTER_CONFIG } from "@/shared/config/starter.config";

export default function AdminProjectPage() {
    return (
        <div className="w-full grid gap-10">
            <div className="w-full">
                <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Название проекта</span>
                <h2 className="text-4xl md:text-5xl font-semibold text-white">{STARTER_CONFIG.name}</h2>
            </div>
            <div className="w-full">
                <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Описание проекта</span>
                <h3 className="text-2xl md:text-3xl font-medium text-white">{STARTER_CONFIG.description}</h3>
            </div>
            <div className="w-full">
                <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Ссылка на проект</span>
                <h3 className="text-xl font-medium text-white">{STARTER_CONFIG.githubUrl}</h3>
            </div>
            <div className="grid grid-col1 sm:grid-cols-2 md:grid-cols-3">
                <div className="w-full">
                    <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Версия проекта</span>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">{STARTER_CONFIG.version}</h2>
                </div>
                <div className="w-full">
                    <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Автор проекта</span>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">{STARTER_CONFIG.author.name}</h2>
                </div>
                <div className="w-full">
                    <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Контакты автора</span>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">{STARTER_CONFIG.author.url}</h2>
                </div>
            </div>
            <div className="w-full">
                <span className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Технологии</span>
                <ul className="pl-4 flex flex-wrap gap-4 list-disc">
                    {STARTER_CONFIG.features.map((value, key) => (
                        <li key={key} className="pr-4"><span className="">{value}</span></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}