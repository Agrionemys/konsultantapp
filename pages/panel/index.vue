<template>
  <PanelSupport v-if="data.role == 1" />
  <PanelUser v-else />
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const user = useSupabaseUser();
const client = useSupabaseClient();
const { data } = await client.from('profile').select().eq('id', user.value.id).single()
</script>
