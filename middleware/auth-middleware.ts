import { navigateTo, useCookie } from "#app";
import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();
    const token = useCookie("token").value;

    try {
        await $fetch('https://dummyjson.com/auth/RESOURCE', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
    } catch (err: any) {
        const notFound = 404
        if (err.status === notFound) {
            store.login();
            if (to.path !== "/users") {
                return navigateTo("/users")
            }
            return;
        }

        if (to.path !== "/") {
            return navigateTo("/");
        }
    }
})