<template>
<div class="flex flex-col min-h-[calc(100vh-76px)] gap-4">
  <div class="flex flex-col h-[50vh] items-center justify-center bg-emerald-600 m-4 rounded-md gap-2 shadow-2xl shadow-emerald-200/70">
    <h1 class="text-4xl font-bold text-white">Правовая поддержка нового уровня</h1>
    <p class="text-3xl font-semibold text-white/80">Благодаря использованию Консультант+ вы сможете получить по башке!</p>
  </div>
  <div class="flex flex-col gap-2">
    <h1 class="w-full my-2 text-4xl font-bold text-center text-slate-900">Ответы на частые вопросы</h1>
    <div class="flex flex-col gap-2">
      <Question v-for="(faq, index) in faqList" :key="index" :question="faq.question" :answer="faq.answer" />
    </div>
  </div>
  <div class="flex flex-row justify-center gap-12 px-4 py-8 mt-auto font-semibold bg-slate-900 text-slate-200/80">
    <div class="flex flex-col gap-2">
      <p class="text-xl font-bold text-white">Телефон доверия</p>
      <p>+7 (495) 870-69-96</p>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-xl font-bold text-white">Адреса</p>
      <p>107996, г. Москва, ул. Кузнецкий Мост, д. 16/5, стр. 1</p>
      <p>107996, г. Москва, Газетный пер., д. 7, стр. 1</p>
    </div>
  </div>
</div>
</template>

<script setup>
const faqList = [
  {
    question: 'Как закрыть долг?',
    answer: 'Ну ты дурачок конечно, в кабинет к себе зайди емае'
  },
  {
    question: 'Где найти деда Игоря?',
    answer: 'Спойлер, он умер...'
  },
]
</script>
