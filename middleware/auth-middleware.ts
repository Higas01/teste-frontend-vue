import { navigateTo, useCookie } from "#app";
import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();
    const token = useCookie("token").value;

    try {
        await $fetch('https://dummyjson.com/auth', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
        store.login();
        if (to.path !== "/users") {
            return navigateTo("/users")
        }
        return;

    } catch (err: any) {
        if (to.path !== "/") {
            return navigateTo("/");
        }
    }
})