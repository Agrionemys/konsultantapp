<template>
<div>
  <h1 class="flex flex-col items-center justify-center p-6 text-3xl font-bold">Просмотр данных об исполнительном листе №{{route.params.id}}</h1>
  <div v-if="document.error">Ошибка при получении данных о документе!</div>
  <div v-if="data.role != 1 && (data.phone !== document.phone)">Нельзя просматривать чужие исполнительные листы!</div>
  <div v-else class="grid items-start grid-cols-6 grid-rows-2 gap-4 p-6">
    <div class="col-span-2 p-4 rounded-md bg-slate-200">
      <p class="text-lg font-bold text-slate-700">Дата принятия: {{ format(parseISO(document.date), 'dd.MM.yyyy') }}</p>
      <p class="text-lg font-bold text-slate-700">Лицо: {{ target.data ? target.data.fio : 'Нет в системе' }} (тел. {{ document.phone }})</p>
      <p class="text-lg font-bold text-slate-700">Наименование суда: {{ document.address.name }}</p>
      <p class="text-lg font-bold text-slate-700">Адрес суда: {{ `${document.address.index}, ${document.address.region}, г. ${document.address.city}, ул ${document.address.street}` }}</p>
    </div>
    <div class="col-span-4 p-4 rounded-md bg-slate-200">
      <p class="text-xl font-bold text-emerald-700">Постановление</p>
      <p class="text-lg font-bold text-slate-700">{{ document.result }}</p>
      <p class="text-xl font-bold text-emerald-700">Сумма долга: {{ document.price }} руб.</p>
      <p class="text-xl font-bold text-emerald-700">Текущий статус: {{ document.expired ? 'Исполнен' : 'Не исполнен' }}</p>
    </div>
    <template v-if="data.role == 1">
    <button @click.prevent="toggle" v-if="!document.expired" class="col-span-6 btn btn-primary">Отметить как исполненный</button>
    <button @click.prevent="toggle" v-else class="col-span-6 btn">Отметить как не исполненный</button>
    </template>
  </div>
</div>
</template>

<script setup>
import { format, parseISO } from 'date-fns'

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const client = useSupabaseClient()
const route = useRoute()
const router = useRouter()

const { data } = await client.from('profile').select().eq('id', user.value.id).single()

if (!route.params.id) router.push('/')

const { data: document } = await client.from('documents').select().eq('id', route.params.id).single();

let target;
if (!document.error) target = await client.from('profile').select().eq('phone', document.phone).single();

const toggle = async () => {
  const result = await client.from('documents').update({
    expired: !document.expired,
  }).match({ id: route.params.id });

  if (result.error) return error = result.error;

  router.go(0);
};
</script>

<style lang="scss">
.staff {
  @apply text-emerald-50 bg-emerald-600 px-2 py-0.5 rounded-md;
}
</style>
