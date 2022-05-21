<template>
  <div class="grid grid-cols-2 grid-rows-2 gap-4 p-6">
    <div class="flex flex-col gap-2 p-4 rounded-md bg-slate-200">
      <div class="flex flex-row items-center gap-2">
        <p class="text-xl font-bold text-emerald-700">Открытые обращения</p>
      </div>
      <template v-if="openTickets.data && openTickets.data.length > 0">
        <nuxt-link :to="`/panel/tickets/${ticket.id}`" :key="ticket.id" v-for="ticket in openTickets.data"
          class="flex items-center gap-2 text-base font-semibold">
          <span class="px-2 py-1 text-white rounded-md bg-emerald-500">{{ ticket.problem.title }} (№{{ ticket.id }})</span>
        </nuxt-link>
      </template>
      <p class="text-lg font-bold text-slate-700" v-else>Отсутствуют</p>
    </div>
    <div class="flex flex-col gap-2 p-4 rounded-md bg-slate-200">
      <div class="flex flex-row items-center gap-2">
        <p class="text-xl font-bold text-emerald-700">Завершенные обращения</p>
      </div>
      <template v-if="closedTickets.data && closedTickets.data.length > 0">
        <nuxt-link :to="`/panel/tickets/${ticket.id}`" :key="ticket.id" v-for="ticket in closedTickets.data"
          class="flex items-center gap-2 text-base font-semibold">
          <span class="px-2 py-1 text-white rounded-md bg-slate-600">{{ ticket.problem.title }} (№{{ ticket.id }})</span>
        </nuxt-link>
      </template>
      <p class="text-lg font-bold text-slate-700" v-else>Отсутствуют</p>
    </div>
    <div class="flex flex-col col-span-2 gap-2 p-4 rounded-md bg-slate-200">
      <div class="flex flex-row items-center gap-2">
        <p class="text-xl font-bold text-emerald-700">Исполнительные листы</p>
        <nuxt-link class="ml-auto btn btn-primary" to="/panel/documents/create">Внести данные</nuxt-link>
      </div>
      <template v-if="documents.data && documents.data.length > 0">
        <nuxt-link :to="`/panel/documents/${document.id}`" :key="document.id" v-for="document in documents.data"
          class="flex items-center gap-2 text-base font-semibold">
          <span class="px-2 py-1 text-white rounded-md bg-emerald-500">Исполнительный лист №{{ document.id }} (от {{ format(parseISO(document.date), 'dd.MM.yyyy') }})</span>
        </nuxt-link>
      </template>
      <p class="text-lg font-bold text-slate-700" v-else>Отсутствуют</p>
    </div>
  </div>
</template>

<script setup>
import { format, parseISO } from 'date-fns'

const user = useSupabaseUser();
const client = useSupabaseClient();

const openTickets = await client.from('tickets').select().eq('closed', false).order('created_at', { ascending: true })
const closedTickets = await client.from('tickets').select().eq('closed', true).order('created_at', { ascending: true })
const documents = await client.from('documents').select().order('date', { ascending: true })
</script>
