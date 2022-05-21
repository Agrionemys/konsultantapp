<template>
<div>
  <h1 class="flex flex-col items-center justify-center p-6 text-3xl font-bold">Просмотр обращения №{{route.params.id}}</h1>
  <div v-if="ticket.error">Ошибка при получении данных обращения!</div>
  <div v-if="data.role != 1 && (ticket.data.author !== user.id)">Нельзя просматривать чужие обращения!</div>
  <div v-else class="grid grid-cols-4 grid-rows-1 gap-4 p-6">
    <div class="p-4 rounded-md bg-slate-200">
      <p class="text-xl font-bold text-emerald-700">Информация об обращении</p>
      <p class="text-lg font-bold text-slate-700">Статус: {{ (ticket.data.closed) ? 'Закрыто' : 'Открыто' }}</p>
      <p class="text-lg font-bold text-slate-700">Автор: {{ author.data.fio }}</p>
      <p class="text-lg font-bold text-slate-700">Почта: {{ author.data.email }}</p>
    </div>
    <div class="col-span-3 p-4 rounded-md bg-slate-200">
      <p class="text-xl font-bold text-emerald-700">Причина обращения</p>
      <p class="text-lg font-bold text-slate-700">{{ ticket.data.problem.title }}</p>
      <p class="text-xl font-bold text-emerald-700">Описание проблемы</p>
      <p class="text-lg font-bold text-slate-700">{{ ticket.data.problem.message }}</p>
    </div>
    <div class="col-span-4 p-4 mb-4 rounded-md bg-slate-200">
      <p class="my-2 text-xl font-bold text-emerald-700">Чат</p>
      <div class="flex flex-col gap-2" v-if="answers.data && answers.data.length > 0">
        <div v-for="answer in answers.data" :key="answer.id" class="flex flex-col gap-1 px-2 py-4 rounded-md bg-slate-50">
          <div class="flex flex-row gap-2">
            <p v-if="answer.author" class="font-bold text-emerald-700" :class="{ staff: answer.author.role == 1 }">{{ answer.author.fio }} ({{ answer.author.role ? 'Консультант' : answer.author.email }})</p>
            <p class="ml-auto text-sm font-semibold">Отправлено в {{ format(parseISO(answer.created_at), 'HH:mm, dd.MM.yyyy') }}</p>
          </div>
          <p>{{ answer.message }}</p>
        </div>
      </div>
      <p v-else>Ответов на обращение еще нет</p>
      <form v-if="!ticket.data.closed" id="write-answer" class="flex flex-col gap-2 p-4 mt-0 -m-4 rounded-md bg-emerald-100" @submit.prevent="send">
        <textarea v-model="message" class="w-full p-2 rounded-md bg-slate-50" required minlength="5" placeholder="Ваше сообщение..." />
        <button type="submit" class="btn btn-primary">Отправить</button>
        <button @click.prevent="close" v-if="data.role == 1" class="btn">Завершить</button>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { format, parseISO } from 'date-fns'

definePageMeta({
  middleware: 'auth'
})

const message = ref('')
const user = useSupabaseUser()
const client = useSupabaseClient()
const route = useRoute()
const router = useRouter()

const { data } = await client.from('profile').select().eq('id', user.value.id).single()

if (!route.params.id) router.push('/')

const ticket = await client.from('tickets').select().eq('id', route.params.id).single();

let author;
if (!ticket.error) author = await client.from('profile').select().eq('id', ticket.data.author).single();

const answers = reactive(await client.from('answers').select().eq('ticket', route.params.id).order('created_at', { ascending: true }));
for (const answer of answers.data) {
  const author = await client.from('profile').select().eq('id', answer.author)
  if (!author.error) answer.author = author.data[0];
}

const send = async () => {
  const result = await client.from('answers').insert({
    ticket: ticket.data.id,
    author: user.value.id,
    message: message.value,
  });

  if (result.error) return error = err;

  router.go(0);
};

const close = async () => {
  const result = await client.from('tickets').update({
    closed: true,
  }).match({ id: route.params.id });

  if (result.error) return error = err;

  router.go(0);
};
</script>

<style lang="scss">
.staff {
  @apply text-emerald-50 bg-emerald-600 px-2 py-0.5 rounded-md;
}
</style>
