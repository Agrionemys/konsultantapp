<template>
  <div class="m-2 flex flex-col h-[calc(100vh-90px)] items-center justify-center gap-2">
    <div v-if="error" class="p-2 text-white bg-red-800 rounded-md">
      <p>Произошла ошибка при создании тикета, проверьте правильность данных!</p>
    </div>
    <p class="text-3xl font-bold">Создание тикета</p>
    <form class="flex flex-col w-1/2 gap-2" @submit.prevent="create">
      <input v-model="ticket.problem.title" class="p-2 rounded-md bg-emerald-100" name="text" type="text" required placeholder="Название проблемы"/>
      <textarea v-model="ticket.problem.message" class="p-2 rounded-md bg-emerald-100" name="text" type="text" minlength="50" required placeholder="Описание проблемы. Минимум 50 слов." />
      <div class="flex flex-row items-center gap-2">
        <button type="submit" class="btn btn-primary">Создать тикет</button>
        <nuxt-link class="btn" to="/panel">Отмена</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

let error = null;

const router = useRouter()
const user = useSupabaseUser()
const client = useSupabaseClient()

const ticket = {
  author: user.value.id, problem: {
    title: null,
    message: null,
  },
}

const create = async () => {
  error = null;

  const result = await client.from('tickets').insert([ticket]);
  if (result.error) return error = err;

  router.push('/panel/tickets/' + result.data[0].id)
}
</script>
