import { CreateUsersForm } from "@/features/users/create/ui/create-users-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Создание нового пользователя",
    description: "Создайте нового пользователя для возможности работать в системе",
};

export default function AdminUsersCreatePage() {
    return (
        <div className="w-full mx-auto">
            <CreateUsersForm />
        </div>
    );
}