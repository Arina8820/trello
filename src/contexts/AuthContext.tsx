import { User } from "@/routes/types/user"
import { apiService } from "@/services/apiService"
import { tokenStorage, userStorage } from "@/services/storageService"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { createContext, FC, ReactNode, useContext } from "react"

interface AuthContextProps {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    logout: () => void;
    refetchUser: () => void

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()


    const handleLogout = () => {
        tokenStorage.deleteValue()
        userStorage.deleteValue()
        apiService.deleteBearerToken()
        queryClient.clear()
        navigate({ to: "/auth" });

    }

    const { data: user, isLoading, isError, refetch:refetchUser } = useQuery({
        queryKey: ["auth", "profile"],
        queryFn: async () => {
            if (!tokenStorage.hasValue()) throw new Error("No token")
            apiService.saveBearerToken(tokenStorage.getValue())
            try {
                const res = await apiService.get<User>({ url: "/v1/auth/my" })
                if (res.statusCode >= 400 || !res.data) throw new Error("Error")

                userStorage.setValue(res.data);
                return res.data;
            } catch (err) {
                handleLogout()
                throw err;
            }
        }, enabled: tokenStorage.hasValue(),
    })

    return (
        <AuthContext.Provider value={{ user: user || null, isLoading, isError, logout: handleLogout, refetchUser }}>
            {children}
        </AuthContext.Provider >
    );

}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within provider")
    return context

}