<template>
  <div class="m-2 flex flex-col h-[calc(100vh-90px)] items-center justify-center gap-2">
    <div v-if="error" class="p-2 text-white bg-red-800 rounded-md">
      <p>Произошла ошибка при выходе из профиля, попробуйте еще раз!</p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="logout">
      <p>Вы собираетесь выйти из аккаунта!</p>
      <div class="flex flex-row items-center gap-2">
        <button type="submit" class="w-full btn btn-primary">Выйти</button>
        <nuxt-link class="w-full btn" to="/">Отменить</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

let error = null;

const router = useRouter()
const client = useSupabaseClient()
const userdata = { email: null, password: null }

const logout = async () => {
  error = null;

  const { err } = await client.auth.signOut().then(() => router.push('/auth/login'))

  if (error) return error = err;
}
</script>
