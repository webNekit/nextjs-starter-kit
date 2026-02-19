import Link from "next/link";
import { MENU_ITEMS } from "../modules/data";

export function Navigation() {
    return (
        <nav className="py-14 w-full" id="sidebar-navigation">
            <menu className="flex flex-col items-center gap-3">
                {MENU_ITEMS.map((item, key) => (
                    <li key={key} className="inline-flex">
                        <Link title={item.label} href={item.href} className="w-12 h-12 flex items-center justify-center rounded-xl duration-300 transition-colors hover:text-white hover:bg-white/10">
                            <item.icon size="20" />
                        </Link>
                    </li>
                ))}
            </menu>
        </nav>
    );
};