<script setup>
</script>
<template>
<section class="vh-100 gradient-custom">
  <form class="container py-5 h-100" @submit.prevent="handleSubmit">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Acesse nosso sistema com Email e Senha</p>
              <Input type="email" label="email" v-model="teste" />
              <Input type="password" label="password" v-model="teste2" />
              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
              <div class="d-flex justify-content-center text-center mt-4 pt-1">
                {{ teste }}
              </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</section>
</template>