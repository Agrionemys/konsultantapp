<template>
  <div class="flex flex-col gap-2 p-4 mx-4 font-semibold rounded-md bg-slate-900 text-slate-50">
    <div class="flex flex-row items-center cursor-pointer" @click="toggle">
     <p class="text-3xl text-white">{{question}}</p>
     <div class="text-white ml-auto w-[24px]">
       <PlusIcon v-if="!visible" />
       <MinusIcon v-else />
     </div>
    </div>
    <Transition name="slide-fade">
      <div v-if="visible" class="flex flex-col p-2 -mx-2 -mb-2 rounded-md bg-slate-600">
        <p class="text-2xl">{{answer}}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { PlusIcon, MinusIcon } from '@heroicons/vue/outline'

defineProps({
  question: String,
  answer: String
})

const visible = ref(false);

const toggle = () => {
  console.log('sex')
  visible.value = !visible.value;
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
