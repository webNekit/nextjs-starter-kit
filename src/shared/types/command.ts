export type CommandResult<T = void> = 
    | (T extends void ? { success: true } : { success: true; data: T })
    | { success: false; error: string };
