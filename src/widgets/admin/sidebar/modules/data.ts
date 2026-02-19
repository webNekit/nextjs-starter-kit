import { LayoutDashboard, Users } from "lucide-react";
import { IMenuItems } from "./type";
import { APP_ROUTES } from "@/shared/routes/app-routes";

export const MENU_ITEMS: IMenuItems[] = [
    { icon: LayoutDashboard, label: "Панель управления", href: APP_ROUTES.ADMIN.HOME() },
    { icon: Users, label: "Управление пользователями", href: APP_ROUTES.ADMIN.USER.INDEX()  },
];