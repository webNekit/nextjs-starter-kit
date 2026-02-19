import { Button } from "@/components/ui/button";
import { deleteUserAction } from "../../action";

interface Props {
    userId: string;
};

export function DeleteUserForm({ userId }: Props) {
    const deleteActionWithId = deleteUserAction.bind(null, userId);
    return(
        <form action={deleteActionWithId}>
            <Button variant="ghost"
                type="submit"
                className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Удалить">
                    Удалить
            </Button>
        </form>
    );
}