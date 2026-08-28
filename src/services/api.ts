// GENERAL FETCH / POST FUNCTION
// add method in second parameter in options

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let message = `Request failed: ${response.status}`;

        try {
            const error = await response.json();

            if (error?.message) {
                message = error.message;
            }
        } catch {
            // response bukan JSON
        }

        throw new Error(message);
    }

    return response.json();
}
