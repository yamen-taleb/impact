import { createContext, useContext, ReactNode } from "react";
import { useGetMyUser } from "../hooks/use-user";
import type {UserType} from "../schemas/userSchema.ts"; // Adjust path if needed

interface UserContextType {
    currentUser: UserType | undefined;
    isLoading: boolean;
    error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { currentUser, isLoading, error } = useGetMyUser();

    return (
        <UserContext.Provider value={{ currentUser, isLoading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
