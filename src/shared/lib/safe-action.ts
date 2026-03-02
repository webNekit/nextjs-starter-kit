import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError: (e) => {
        console.log("Action error:", e.message);
        return "Внутри сервера возникла ошибка";
    }
});