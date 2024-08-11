<script setup>
import {useCookie} from '#app';
import { reactive, ref } from 'vue';

definePageMeta({
  middleware: "auth-middleware"
})

const user = reactive({
  username: "",
  password: "",
})
const loading = ref(false);
const store = useAuthStore();

const validate = () => {
  if (!user.username || !user.password) {
    alert("Campo username e senha precisam ser preenchidos");
    return false;
  }
  return true;
}

const handleSubmit = async () => {
  loading.value = true;
  if (!validate()) {
    return;
  }
  $fetch("https://dummyjson.com/auth/login", {
  method: "POST",
  body: {
    username: user.username,
    password: user.password
  }
}).then(async (response) => {
  store.login();
  useCookie("token", {
    maxAge: 3600,
  }).value = response.token
  await navigateTo("/users");
})
  .catch(() => alert("Credenciais inválidas"));
  
  loading.value = false;
}

</script>
<template>
<section class="vh-100 gradient-custom">
  <form class="container py-5 h-100" @submit.prevent="handleSubmit">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Acesse nosso sistema com Username e Senha</p>
              <Input type="text" label="username" v-model="user.username" />
              <Input type="password" label="password" v-model="user.password" />
              <button
                data-mdb-button-init data-mdb-ripple-init
                class="btn btn-outline-light btn-lg px-5"
                :disabled="loading"
                type="submit">
                Entrar
              </button>
              <div class="d-flex justify-content-center text-center mt-4 pt-1">
                <p>Use estas credenciais para se autenticar<br/> username: emilys <br/> password: emilyspass</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</section>
</template>