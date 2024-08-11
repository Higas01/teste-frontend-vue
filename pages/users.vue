<script setup>
    const users = ref([]);
    const perPage = ref(6);
    const total = ref();
    const usersChecked = ref([]);
    
    const {getVirtualPages} = usePagination();

    definePageMeta({
        middleware: "auth-middleware",
    })

    watchEffect(() => {
        const route = useRoute();
        const page = Number(route.query.page);
        let virtualPage = getVirtualPages(page, perPage.value);
        if (!page) {
           virtualPage = 0;
        }
        $fetch(`https://dummyjson.com/users?limit=${perPage.value}&skip=${virtualPage}`)
        .then(response => {
            users.value = response.users;
            total.value = response.total;
        })
        .catch(() => alert("Ocorreu algum erro, tente novamente mais tarde"))
    })
    const totalPages = computed(() => {
        const route = useRoute();
        const page = Number(route.query.page) || 1;
        const totalUsers = total.value ?? 0;
        const usersPerPage = perPage.value ?? 1;

        if (totalUsers === 0 || usersPerPage <= 0) return 1;

        const totalPages = Math.ceil(totalUsers / usersPerPage);
        const arr = Array.from({ length: totalPages }, (_, index) => index);
         if (page === 1) {
            return arr.slice(page, page + 4); 
         }

        return arr.slice(page - 1, page + 4);
})

    const deleteUser  = async (id) => {
        try {
        const response = await fetch(`https://dummyjson.com/users/${id}`, {
          method: "DELETE",
        });
        return await response.json();
      } catch {
        return alert("ocorreu algum erro");
      }
}
    const handleRemove = () => {
        const deletePromises = usersChecked.value.map(id => deleteUser(id))
 
        Promise.all(deletePromises)
        .then(() => {
            users.value = users.value.filter(user => !usersChecked.value.includes(user.id));
            })
        .catch(() => {
            alert("Ocorreu algum erro")
            });
    } 

    const conditionalDisabled = computed(() => usersChecked.value.length < 1)

</script>
<template>
    <div class="d-flex justify-content-center align-items-center flex-column">
        <button
        data-mdb-button-init data-mdb-ripple-init
        class="btn btn-danger btn-lg px-4 mt-4"
        type="submit"
        @click="handleRemove"
        :disabled="conditionalDisabled"
        >
        Deletar
        </button>
        <div class="container mx-auto mt-4 d-flex justify-content-center align-items-center flex-wrap">
            <div v-for="user in users" :key="user.id" class="row m-5">
                <div class="col-md-4">
                    <div class="card" style="width: 18rem;">
                        <img v-bind:src="user.image" class="card-img-top" alt="imagens dos usuarios">
                            <div class="card-body">
                                <h5 class="card-title">{{ user.firstName }}  {{ user.lastName }}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">idade: {{ user.age }} anos</h6>
                                <h6 class="card-subtitle mb-2 text-muted">role: {{ user.role }}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">tel: {{ user.phone }}</h6>
                                <div class="form-check form-switch">
                                    <input
                                     class="form-check-input"
                                      type="checkbox"
                                      :value="user.id"
                                      v-model="usersChecked"
                                      id="flexSwitchCheckDefault">
                                    <label class="form-check-label"
                                     for="flexSwitchCheckDefault">
                                     Selecionar para Remover
                                     </label>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"
                 v-for="pageNumber in totalPages"
                :key="pageNumber">
                    <NuxtLink
                    class="page-link" 
                    :to="{query: {page: pageNumber}}"
                    >
                        {{ pageNumber }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>