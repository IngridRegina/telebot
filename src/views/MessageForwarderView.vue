<template>
  <section class="message-forwarder">
    <h1 class="text-h4 mb-10">Message Forwarder</h1>
    <div class="message-forwarder__list">
      <MessageForward
          v-for="(forward, index) in forwards"
          :key="index"
          :forward-id="forward.id"
          :from-chat="forward.from_chat"
          :to-chats="forward.to_chats"
          @delete="deleteForwardRow(index)"
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
  forwards.value.push(forwardCount.value)
}

onBeforeMount(async () => {
  await suspenseMessageForwards()
  if (messageForwards.value?.results?.length) {
    forwards.value = [...messageForwards.value.results]
  }
})

const deleteForwardRow = (index) => {
  forwards.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.message-forwarder {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 100px;

    @media (max-width: 768px) {
      gap: 40px;
    }
  }

  .v-btn {
    bottom: 24px;
    right: 24px;
  }
}
</style>
