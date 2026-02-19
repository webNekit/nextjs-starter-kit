import { usersService } from "@/entities/users/users.service";
import { UpdateUserForm } from "@/features/users/edit/ui/edit-user-form";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function AdminUsersEditPage({ params }: Props) {
    const { id } = await params;
    const data = await usersService.getById(id);
    return(
        <div className="w-full mx-auto">
            <UpdateUserForm user={data.data} />
        </div>
    );
}