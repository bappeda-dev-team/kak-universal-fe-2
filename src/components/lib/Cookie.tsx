import * as jwtDecoded from "jwt-decode";
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

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const API_URL = process.env.NEXT_PUBLIC_AUTH_URL;
        const response = await fetch(`${API_URL}/auth/login`, {
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
            console.error("Session ID tidak ditemukan:", data)

            AlertNotification(
                "Login Gagal",
                "Session ID tidak ditemukan",
                "error",
                2000
            );

            return false;
        }

        // document.cookie = `session_id=${sessionId}; path=/;`;
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
        const API_URL = process.env.NEXT_PUBLIC_AUTH_URL;

        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Logout gagal:", response.status);
            return false;
        }

        const data = await response.json();
        console.log(data); // { message: "logged out" }

        // Cookie sessionId dihapus oleh backend melalui Set-Cookie
        window.location.href = "/login";

        return true;
    } catch (error) {
        console.error("Logout gagal:", error);
        return false;
    }
};

export interface UserInfo {
  username: string;
  firstName: string;
  kode_opd: string;
  nip: string;
  roles: string[];
}

export const getUser = async (): Promise<UserInfo | null> => {
    const API_URL = process.env.NEXT_PUBLIC_AUTH_URL;
    const response = await fetch(`${API_URL}/user-info-alt`, {
        method: 'GET',
        credentials: "include"
    });

    if (!response.ok) {
        return null;
    }

  return response.json();
}

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
