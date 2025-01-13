import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface NotificationState {
    message: string | null;
    type: "success" | "error" | undefined;
    show: boolean;
    setNotification: (message: string, type: "success" | "error") => void;
    clearNotification: () => void;
}

export const useNotificationStore = create<NotificationState>()(
    devtools((set) => ({
        message: null,
        type: undefined,
        show: false,
        setNotification: (message, type) => set({ message, type, show: true }),
        clearNotification: () => set({ message: null, type: undefined, show: false }),
    })),
);
