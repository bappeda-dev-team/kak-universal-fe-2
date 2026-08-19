"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUser } from "@/components/lib/Cookie";
import type { UserInfo } from "@/components/lib/Cookie";

interface AuthContextType {
    user: UserInfo | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            // Login tidak perlu divalidasi sebagai protected page
            if (pathname === "/login") {
                setLoading(false);
                return;
            }

            try {
                const data = await getUser();

                if (!data) {
                    setUser(null);
                    router.replace("/login");
                    return;
                }

                setUser(data.user);
            } catch (error) {
                console.error("Authentication check failed:", error);

                setUser(null);
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
