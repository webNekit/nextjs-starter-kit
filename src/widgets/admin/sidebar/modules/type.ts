import { LucideIcon } from "lucide-react";

export interface IMenuItems {
    icon: LucideIcon;
    label: string;
    href: string;
    active?: boolean;
};