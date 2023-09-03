<template>
  <section class="telebot-view">
    <h1 class="text-h4 mb-10">Message Forwarder</h1>
    <div class="telebot-view__list">
      <MessageForward
          v-for="(forward, index) in forwards"
          :key="'message-forward-' + index"
          :index="index + 1"
          :forward-id="forward.id"
          :from-chat="forward.from_chat"
          :to-chats="forward.to_chats"
          @delete="deleteForwardRow(index)"
          @upsert="(item) => updateForwardRow(index, item)"
      />
      <v-btn
          color="#2e86c1"
          icon="mdi-plus"
          position="fixed"
          size="large"
          variant="elevated"
          @click="addForwardItem"
      />
    </div>
  </section>
</template>

<script setup>
import { useGetMessageForwardsQuery} from '@/queries/message-forwarder.query'
import MessageForward from '@/components/MessageForward.vue'
import { onBeforeMount, ref } from "vue"

const forwardCount = ref(1)
const forwards = ref([''])

const { data: messageForwards, suspense: suspenseMessageForwards } = useGetMessageForwardsQuery()

const addForwardItem = () => {
  forwardCount.value++
  forwards.value.push({})
}

onBeforeMount(async () => {
  await suspenseMessageForwards()
  if (messageForwards.value?.results?.length) {
    forwards.value = [...messageForwards.value.results]
  }
})

const deleteForwardRow = async (index) => {
  forwards.value.splice(index, 1)
}

const updateForwardRow = async (index, item) => {
  forwards.value.splice(index, 1, item)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/default";
</style>
