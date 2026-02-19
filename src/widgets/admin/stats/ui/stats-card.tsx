import { cn } from "@/shared/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: number | string;
    icon?: LucideIcon;
    className?: string;
    color?: "emerald" | "purple" | "blue";
}

export function StatsCard({ title, value, icon: Icon, className, color = "blue" }: Props) {
    const colors = {
        emerald: {
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            text: "text-emerald-400",
            icon: "text-emerald-500"
        },
        purple: {
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            text: "text-purple-400",
            icon: "text-purple-500"
        },
        blue: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            text: "text-blue-400",
            icon: "text-blue-500"
        }
    };

    const theme = colors[color];
    return (
        <div className={cn(
            "p-6 rounded-2xl glass-panel relative overflow-hidden group border border-white/5 bg-white/[0.02]",
            className
        )}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
                        {title}
                    </p>
                    <h2 className="text-3xl font-light text-white mt-2 tracking-tight">
                        {value}
                    </h2>
                </div>
                
                {Icon && (
                    <div className={cn("p-2 rounded-lg", theme.bg, theme.border, "border")}>
                        <Icon className={cn("w-5 h-5", theme.icon)} />
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <div className={cn("h-1 w-full rounded-full bg-white/5 overflow-hidden")}>
                    <div className={cn("h-full w-2/3 rounded-full", theme.bg.replace('/10', '/50'))}></div>
                </div>
            </div>
        </div>
    );
}