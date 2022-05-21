<template>
  <div class="grid grid-cols-2 grid-rows-1 gap-4 p-6">
    <div class="flex flex-col gap-2 p-4 rounded-md bg-slate-200">
      <div class="flex flex-row items-center gap-2">
        <p class="text-xl font-bold text-emerald-700">Обращения к консультанту</p>
        <nuxt-link class="ml-auto btn btn-primary" to="/panel/tickets/create">Создать обращение</nuxt-link>
      </div>
      <template v-if="tickets.data && tickets.data.length > 0">
        <nuxt-link :to="`/panel/tickets/${ticket.id}`" :key="ticket.id" v-for="ticket in tickets.data"
          class="flex items-center gap-2 text-base font-semibold">
          <span class="px-2 py-1 text-white rounded-md bg-emerald-500">{{ ticket.problem.title }} (№{{ ticket.id }})</span>
          <span class="px-2 py-1 text-xs text-white rounded-md bg-emerald-900">{{ ticket.closed ? 'Закрыт' : 'Открыт' }}</span>
        </nuxt-link>
      </template>
      <p class="text-lg font-bold text-slate-700" v-else>Отсутствуют</p>
    </div>
    <div class="p-4 rounded-md bg-slate-200">
      <div class="flex flex-row items-center gap-2">
        <p class="text-xl font-bold text-emerald-700">Ваши задолженности</p>
      </div>
      <div v-if="documents.data && documents.data.length > 0" class="flex flex-col gap-2">
      <p class="text-lg font-bold text-slate-700">Задолженностей {{ documents.data.length }}, общая сумма долга: {{ loan }} руб.</p>
        <nuxt-link :to="`/panel/documents/${document.id}`" :key="document.id" v-for="document in documents.data"
          class="flex items-center gap-2 text-base font-semibold">
          <span class="px-2 py-1 text-white rounded-md bg-emerald-500">Исполнительный лист №{{ document.id }} (от {{ format(parseISO(document.date), 'dd.MM.yyyy') }})</span>
        </nuxt-link>
      </div>
      <p class="text-lg font-bold text-slate-700" v-else>Отсутствуют</p>
    </div>
  </div>
</template>

<script setup>
import { format, parseISO } from 'date-fns'

const user = useSupabaseUser();
const client = useSupabaseClient();

const { data: profile } = await client.from('profile').select().eq('id', user.value.id).single()
const documents = await client.from('documents').select().eq('phone', profile.phone).eq('expired', false)

let loan = 0;
if (documents.data) {
  for (const document of documents.data) {
    loan = Number(loan) + Number(document.price);
  }
}
const tickets = await client.from('tickets').select().eq('author', user.value.id)
</script>
