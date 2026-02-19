import { parseAsString } from "nuqs/server";

export const toastParamsParsers = {
    status: parseAsString,
    message: parseAsString,
};