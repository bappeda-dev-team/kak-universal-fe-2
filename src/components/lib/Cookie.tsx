import { AlertNotification } from "../global/Alert";

// Fungsi untuk menyimpan nilai ke cookies
export const setCookie = (name: string, value: any) => {
    document.cookie = `${name}=${value}; path=/;`;
};

export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') {
        // Jika di server-side, kembalikan null atau nilai default lainnya
        return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

// HANDLE LOGIN DAN SIMPAN DATA USER
export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api-auth/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            AlertNotification(
                "Login Gagal",
                data?.data ?? "Username atau password tidak valid",
                "error",
                2000
            );

            return false;
        }

        const sessionId = data?.sessionId;
        if (!sessionId) {
            AlertNotification(
                "Login Gagal",
                "Terjadi kesalahan server",
                "error",
                2000
            );

            return false;
        }

        AlertNotification(
            "Login Berhasil",
            "",
            "success",
            1000
        );

        return true;

    } catch (err) {
        console.error('Login gagal dengan error:', err);
        AlertNotification("Login Gagal", "terdapat kesalahan server / koneksi internet", "error", 2000)
        return false;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        const response = await fetch(`/api-auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Logout gagal:", response.status);
            return false;
        }

        // Cookie sessionId dihapus oleh backend melalui Set-Cookie
        document.cookie = "user=; Path=/; Max-Age=0";
        document.cookie = "opd=; Path=/; Max-Age=0";
        document.cookie = "periode=; Path=/; Max-Age=0";
        document.cookie = "tahun=; Path=/; Max-Age=0";
        document.cookie = "sessionId=; Path=/; Max-Age=0";
        window.location.href = "/login";

        return true;
    } catch (error) {
        console.error("Logout gagal:", error);
        return false;
    }
};

export interface GetUserResult {
    user: UserInfo
}

export interface UserInfo {
    username: string;
    firstName: string;
    kode_opd: string;
    nip: string;
    roles: string[];
}

export const getUser = async (): Promise<GetUserResult | null> => {
    const response = await fetch(`/api-user/user-info`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        return null;
    }

    const user: UserInfo = await response.json();

    setCookie('user', JSON.stringify(user))

    return {
        user,
    };
};

export const getToken = () => {
    const get_Token = getCookie("token")
    if (get_Token) {
        return get_Token;
    }
    return null;
}

type SelectedValue = {
    value: any
    label?: string
}

type OpdTahunResult = {
    tahun: SelectedValue | null
    opd: SelectedValue | null
    roles: string[] | null
}

export const getOpdTahunNew = (): OpdTahunResult => {
    try {
        const tahunCookie = getCookie("tahun")
        const opdCookie = getCookie("opd")
        const userCookie = getCookie("user")

        const tahun = tahunCookie ? JSON.parse(tahunCookie) : null
        const user = userCookie ? JSON.parse(userCookie) : null
        const roles = user?.roles ?? null

        // DEFAULT
        let opd: SelectedValue | null = null

        if (roles.some((r: string) => ['super_admin'].includes(r))) {
            // super admin pilih dari dropdown → cookie opd
            opd = opdCookie ? JSON.parse(opdCookie) : null
        } else {
            // selain super admin → opd dari user
            opd = user?.kode_opd
                ? { value: user.kode_opd }
                : null
        }

        return { tahun, opd, roles }
    } catch (err) {
        console.error("getOpdTahun error:", err)
        return { tahun: null, opd: null, roles: null }
    }
}

export const getOpdTahun = () => {
    const get_tahun = getCookie("tahun");
    const get_opd = getCookie("opd");

    if (get_tahun && get_opd) {
        return {
            tahun: JSON.parse(get_tahun),
            opd: JSON.parse(get_opd)
        };
    }

    if (get_tahun) {
        return { tahun: JSON.parse(get_tahun), opd: null };
    }

    if (get_opd) {
        return { tahun: null, opd: JSON.parse(get_opd) };
    }

    return { tahun: null, opd: null };
};

export const getPeriode = () => {
    const get_periode = getCookie("periode");

    if (get_periode) {
        return {
            periode: JSON.parse(get_periode)
        };
    } else {
        return { periode: null };
    }

};
