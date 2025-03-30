import { useState } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_URL;

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/api/users/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            console.log("Login Response:", data); // Debugging

            if (!res.ok) throw new Error(data.message || "Login failed");

            toast.success("Login successful");
            window.location.reload(); // Refresh to trigger `useAuth`

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};