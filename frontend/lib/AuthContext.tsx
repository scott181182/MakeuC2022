import { createContext, ReactNode, useState } from "react";



export interface AuthContextUser {
    id: string;
    name: string;
    email: string;
    role: string;
}
export interface AuthContextData {
    user?: AuthContextUser,
    setUser(user?: AuthContextUser): void;
}

export const AuthContext = createContext<AuthContextData>({
    setUser() {  }
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const localUserStr = typeof window !== "undefined" ? localStorage.getItem("ivy_user") : undefined;
    const [ user, setUserRaw ] = useState<AuthContextUser | undefined>(localUserStr ? JSON.parse(localUserStr) : undefined);

    const setUser = (user?: AuthContextUser) => {
        if(user) {
            localStorage.setItem("ivy_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("ivy_user");
        }
        setUserRaw(user);
    };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
