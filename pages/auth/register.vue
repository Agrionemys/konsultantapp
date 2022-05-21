<template>
  <div class="m-2 flex flex-col h-[calc(100vh-90px)] items-center justify-center gap-2">
    <div v-if="err" class="p-2 text-white bg-red-800 rounded-md">
      <p>Произошла ошибка при регистрации, проверьте правильность введенных данных!</p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="register">
      <input v-model="userdata.phone" pattern="[0-9]{1} [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}" class="p-2 rounded-md bg-emerald-100" name="phone" type="tel" placeholder="8 903 193-25-55"/>
      <input v-model="userdata.fio" class="p-2 rounded-md bg-emerald-100" name="text" type="text" placeholder="Иванов Иван Иванович"/>
      <input v-model="userdata.email" class="p-2 rounded-md bg-emerald-100" name="email" type="email" placeholder="user@mail.ru"/>
      <input v-model="userdata.password" class="p-2 rounded-md bg-emerald-100" name="password" type="password" placeholder="*********"/>
      <div class="flex flex-row items-center gap-2">
        <button type="submit" class="btn btn-primary">Создать аккаунт</button>
        <nuxt-link class="btn" to="/auth/login">Войти в аккаунт</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { promiseTimeout } from '@vueuse/core'

definePageMeta({
  middleware: 'guest'
})

let err = null;

const router = useRouter()
const client = useSupabaseClient()
const userdata = { fio: null, email: null, password: null, phone: null }

const register = async () => {
  err = null;

  const result = await client.auth.signUp({
    email: userdata.email,
    password: userdata.password,
  })

  if (result.error) err = result.error;

  if (!err) {
    const profile = await client.from('profile').insert({
      id: result.user.id,
      fio: userdata.fio,
      email: userdata.email,
      phone: userdata.phone,
      role: 0,
    })

    await promiseTimeout(300)
    router.push('/panel')
  }
}
</script>
