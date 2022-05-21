<template>
  <div class="m-2 flex flex-col h-[calc(100vh-90px)] items-center justify-center gap-2">
    <div v-if="error" class="p-2 text-white bg-red-800 rounded-md">
      <p>Произошла ошибка при авторизации, проверьте правильность введенных данных!</p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="login">
      <input v-model="userdata.email" class="p-2 bg-emerald-100 rounded-md" name="email" type="email" placeholder="user@mail.ru"/>
      <input v-model="userdata.password" class="p-2 bg-emerald-100 rounded-md" name="password" type="password" placeholder="*********"/>
      <div class="flex flex-row items-center gap-2">
        <button type="submit" class="btn btn-primary">Войти</button>
        <nuxt-link class="btn" to="/auth/register">Создать аккаунт</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { promiseTimeout } from '@vueuse/core'

definePageMeta({
  middleware: 'guest'
})

let error = null;

const router = useRouter()
const client = useSupabaseClient()
const userdata = { email: null, password: null }

const login = async () => {
  error = null;

  const { err } = await client.auth.signIn({
    email: userdata.email,
    password: userdata.password,
  })

  if (error) error = err;

  await promiseTimeout(300)
  router.push('/panel')
}
</script>
