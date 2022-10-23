import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";



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
    const router = useRouter();
    const apollo = useApolloClient();
    const [ user, setUserRaw ] = useState<AuthContextUser | undefined>(undefined);

    const setUser = (user?: AuthContextUser) => {
        if(user) {
            localStorage.setItem("ivy_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("ivy_user");
            apollo.cache.reset();
            router.push("login");
        }
        setUserRaw(user);
    };

    useEffect(() => {
        const localUserStr = localStorage.getItem("ivy_user");
        if(localUserStr) { setUserRaw(JSON.parse(localUserStr)); }
        else if(!user && router.route !== "/login") {
            router.push("login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
