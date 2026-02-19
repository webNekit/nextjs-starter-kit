import { LogOut } from "lucide-react";
import { logoutAction } from "../logout.action";

export function LogoutForm() {
    return(
        <form action={logoutAction}>
            <button title="Выйти" type={'submit'} className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 cursor-pointer">
                <LogOut size={18} />
            </button>
        </form>
    );
}