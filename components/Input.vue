<script setup>
const modelInput = defineModel();
defineProps({
    label: String,
    type: {
        type: String,
        validator: value => ["password", "text"].includes(value), 
    },
    
})
</script>
<template>
    <div class="form-floating mb-5">
        <input :type="type" class="form-control" :name="label" v-model="modelInput" placeholder="name@example.com">
        <label :for="label" class="text-secondary">{{ label }}</label>
    </div>
</template>