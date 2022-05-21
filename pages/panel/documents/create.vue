<template>
  <div class="m-2 flex flex-col h-[calc(100vh-90px)] items-center justify-center gap-2">
    <div v-if="error" class="p-2 text-white bg-red-800 rounded-md">
      <p>Произошла ошибка при внесении данных, проверьте правильность данных!</p>
    </div>
    <p class="text-3xl font-bold">Внесение информации о долге</p>
    <form class="flex flex-col w-1/2 gap-2" @submit.prevent="create">
      <p class="text-xs font-semibold">Телефон должника</p>
      <input v-model="document.phone" pattern="[0-9]{1} [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}" class="p-2 rounded-md bg-emerald-100" name="phone" type="tel" placeholder="8 903 193-25-55"/>
      <p class="text-xs font-semibold">Размер взыскания</p>
      <input v-model="document.price" class="p-2 rounded-md bg-emerald-100" name="price" type="number" placeholder="40000"/>
      <p class="text-xs font-semibold">Вынесенное решение</p>
      <textarea v-model="document.result" class="p-2 rounded-md bg-emerald-100" name="result" type="text" />
      <p class="text-xs font-semibold">Дата документа</p>
      <input v-model="document.date" class="p-2 rounded-md bg-emerald-100" name="date" type="date" required/>
      <div class="grid grid-cols-3 grid-rows-2 gap-2">
        <div class="flex flex-col col-span-1">
          <p class="text-xs font-semibold">Индекс</p>
          <input v-model="document.address.index" class="p-2 rounded-md bg-emerald-100" name="index" type="number" required/>
        </div>
        <div class="flex flex-col col-span-1">
          <p class="text-xs font-semibold">Регион</p>
          <input v-model="document.address.region" class="p-2 rounded-md bg-emerald-100" name="region" type="text" required/>
        </div>
        <div class="flex flex-col col-span-1">
          <p class="text-xs font-semibold">Город</p>
          <input v-model="document.address.city" class="p-2 rounded-md bg-emerald-100" name="city" type="text" required/>
        </div>
        <div class="flex flex-col col-span-2">
          <p class="text-xs font-semibold">Улица</p>
          <input v-model="document.address.street" class="p-2 rounded-md bg-emerald-100" name="street" type="text" required/>
        </div>
        <div class="flex flex-col col-span-1">
          <p class="text-xs font-semibold">Наименование учреждения</p>
          <input v-model="document.address.name" class="p-2 rounded-md bg-emerald-100" name="name" type="text" required/>
        </div>
      </div>
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
  role: 1,
})

let error = null;

const router = useRouter()
const client = useSupabaseClient()

const document = {
  date: null,
  address: {
    index: null,
    region: null,
    city: null,
    street: null,
    name: null,
  },
  price: null,
  result: null,
  phone: null,
  expired: false,
}

const create = async () => {
  error = null;

  const result = await client.from('documents').insert([document]);
  if (result.error) return error = result.error;

  router.push('/panel/documents/' + result.data[0].id)
}
</script>
